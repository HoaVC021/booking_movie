import { DatePicker, Form, Input, message, Modal, Space, Switch, Upload } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieSync, editMovieSync, getFilmsSync, setRefresh, setVisible } from '../../movieSlice';

const dateFormat = 'DD/MM/YYYY';

const ModalMovie = ({ url }) => {
    const dispatch = useDispatch()
    const isShowModal = useSelector(state => state.movie.modalVisible)
    const refresh = useSelector(state => state.movie.isRefresh)
    const movie = useSelector(state => state.movie.movie)
    const mode = useSelector(state => state.movie.mode)
    // const inputSearch = useSelector(state => state.movie.inputText)
    const [form] = Form.useForm();
    const [file, setFile] = useState(null)
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: url,
        },
    ]);
    let check = [
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: url,
        },
    ]
    useEffect(() => {
        loadData()
    }, [isShowModal])

    const loadData = async () => {
        if (mode === "edit") {
            form.setFieldsValue({
                ...movie,
                ngayKhoiChieu: moment(movie.ngayKhoiChieu),
                sapChieu: true,
                dangChieu: false,
                hot: false
            });
            let loadImage = { ...fileList[0], url: movie.hinhAnh }
            setFileList([loadImage])
        } else {
            form.resetFields();
            form.setFieldsValue({
                maPhim: 0, sapChieu: true,
                dangChieu: false,
                hot: false
            })
            setFileList([{ ...check[0], url: "" }])
        }
    };
    const handleCancel = () => {
        form.resetFields();
        setFileList([])
        dispatch(setVisible(false))
    }
    const onSubmit = async (values) => {
        // console.log(values);
        try {
            console.log(values);
            values.ngayKhoiChieu = moment(values.ngayKhoiChieu.format("DD/MM/YYYY"))._i
            const newData = { ...values, maNhom: 'GP01', danhGia: '0' };
            let formData = new FormData()
            if (file) {
                formData.append('File', file, file.name)
            }
            for (let key in newData) {
                if (key === 'hinhAnh') continue;
                formData.append(key, [newData[key]])
            }
            if (mode === "edit") {
                await dispatch(editMovieSync(formData))
            }
            else {
                await dispatch(addMovieSync(formData))
                console.log('1');
            }
            await dispatch(getFilmsSync())
            setFileList([{ ...check[0], url: "" }])
            form.resetFields();
            dispatch(setRefresh(!refresh))
            dispatch(setVisible(false))
            message.success(`${mode} movie success`)
        } catch (error) {
            message.error(`${mode} movie failed`)
        }
    }
    const onChange = ({ fileList: newFileList }) => {
        if (fileList.length === 0) {
            message.error('Upload Image Failed')
            setFileList(check)
            return;
        }
        if (newFileList.length !== 0 && (newFileList[0].type !== 'image/jpeg' && newFileList[0].type !== 'image/png')) {
            return message.error('Incorrect file format')
        }
        setFileList(newFileList);
        setFile(fileList[0].originFileObj)
    };
    return (
        <Modal title="Edit Movie"
            visible={isShowModal}
            onOk={form.submit}
            onCancel={handleCancel}
        >
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                initialValues={{}}
                autoComplete="off"
                onFinish={onSubmit}
                form={form}
            >
                <Form.Item label="ID" name="maPhim" >
                    <Input disabled={true} />
                </Form.Item>
                <Form.Item label="Name" name="tenPhim" rules={[{ required: true, message: 'Name is not valid' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Trailer" name="trailer" rules={[{ required: true, message: 'Please enter trailer' }]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="moTa" >
                    <Input />
                </Form.Item>
                <Form.Item label="Release Date" name="ngayKhoiChieu" rules={[{ required: true, message: 'Please choose release date' }]} >
                    <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item label="Soon" name="sapChieu" valuePropName='checked'>
                    <Switch />
                </Form.Item>
                <Form.Item label="Showtiming" name="dangChieu" valuePropName='checked'>
                    <Switch />
                </Form.Item>
                <Form.Item label="Hot" name="hot" valuePropName='checked' >
                    <Switch />
                </Form.Item>
                <Form.Item name="hinhAnh" label="Image" rules={[{ required: true, message: 'Please choose image' }]}>
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            maxCount={1}
                        >
                            Upload
                        </Upload>
                    </Space>
                </Form.Item>
            </Form>
        </Modal >

    );
};

export default ModalMovie