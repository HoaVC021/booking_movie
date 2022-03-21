import { DatePicker, Form, Image, Input, InputNumber, message, Modal } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createShowTimeSync, getTheatersSync, getTheaterSystemSync, setRaps, showTheater } from '../../movieSlice';

import { Select } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';
import moment from 'moment';

const { Option } = Select;

const ModalTheater = () => {
    const dispatch = useDispatch()
    const isCreateTheater = useSelector(state => state.movie.isCreateTheater)
    const theatersSystem = useSelector(state => state.movie.theaterSystem)
    const theaters = useSelector(state => state.movie.theaters)
    const raps = useSelector(state => state.movie.raps)
    const movie = useSelector(state => state.movie.movie)
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields()
        try {
            const getTheaters = dispatch(getTheaterSystemSync())
            unwrapResult(getTheaters)

        } catch (error) {
            message.error('cannot get theaters')
        }
    }, [isCreateTheater])

    const handleCancel = () => {
        dispatch(showTheater(false))
    }
    const onSubmit = async (values) => {
        try {
            // console.log(moment(values.ngayChieuGioChieu.format("DD/MM/YYYY HH:mm:ss"))._i);
            const body = {
                maPhim: movie.maPhim,
                ngayChieuGioChieu: moment(values.ngayChieuGioChieu.format("DD/MM/YYYY HH:mm:ss"))._i,
                maRap: values.rap,
                giaVe: values.giaVe
            }
            const data = await dispatch(createShowTimeSync(body))
            if (data.payload.status === 'failed') {
                return message.error(data.payload.res)
            }
            dispatch(showTheater(false))
            return message.success("Create showtime success")
        } catch (error) {
            dispatch(showTheater(false))
            return message.error('create showtime failed')
        }
    }
    function onChangeTheater(value) {
        form.resetFields(["cumRap", "rap"])
        dispatch(getTheatersSync(value))
    }
    function onSearchTheater(val) {
        console.log('search:', val);
    }
    function onChange(value) {
        console.log(`selected ${value}`);
        form.resetFields(["rap"])
        const findTheater = theaters.find(item => item.maCumRap === value)
        dispatch(setRaps(findTheater.danhSachRap))
    }
    function onSearch(val) {
        console.log('search:', val);
    }
    function onChangeRap(value) {
        console.log(`selected ${value}`);
    }
    function onSearchRap(val) {
        console.log('search:', val);
    }

    return (
        <Modal title={`Create Theater - ${movie.tenPhim}`}
            visible={isCreateTheater}
            onOk={form.submit}
            onCancel={handleCancel}
        >
            <Image
                width={200}
                src={movie.hinhAnh}
            />
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                initialValues={{}}
                autoComplete="off"
                onFinish={onSubmit}
                form={form}
            >
                <Form.Item
                    name="heThongRap"
                    label="Theaters System"
                    rules={[{ required: true, message: 'Please choose Theater System' }]}
                >
                    <Select
                        showSearch
                        placeholder="Select a theater"
                        optionFilterProp="children"
                        onChange={onChangeTheater}
                        onSearch={onSearchTheater}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {theatersSystem.length > 0 &&
                            theatersSystem.map(item =>
                                <Option
                                    key={item.maHeThongRap}
                                    value={item.maHeThongRap}>
                                    {item.tenHeThongRap}
                                </Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="cumRap"
                    label="Theaters"
                    rules={[{ required: true, message: 'Please choose Theater' }]}
                >
                    <Select
                        showSearch
                        placeholder="Select a theater"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) => {
                            console.log(input, option);
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        }
                    >
                        {theaters.length > 0 &&
                            theaters.map(item =>
                                <Option
                                    key={item.maCumRap}
                                    value={item.maCumRap}>
                                    {item.tenCumRap}
                                </Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="rap"
                    label="Theater Item"
                    rules={[{ required: true, message: 'Please choose Theater Item' }]}
                >
                    <Select
                        showSearch
                        placeholder="Select a rap"
                        optionFilterProp="children"
                        onChange={onChangeRap}
                        onSearch={onSearchRap}
                        filterOption={(input, option) => {
                            console.log(input, option);
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        }
                    >
                        {raps.length > 0 &&
                            raps.map(item =>
                                <Option
                                    key={item.maRap}
                                    value={item.maRap}>
                                    {item.tenRap}
                                </Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="ngayChieuGioChieu"
                    label="Showtimes Date"
                    rules={[{ required: true, message: 'Please choose ShowTimes' }]}
                >
                    <DatePicker showTime format="YYYY/MM/DD HH:mm:ss" onChange={(value) => console.log(value)} />
                </Form.Item>
                <Form.Item name="giaVe" label="Ticket Fare" rules={[{ required: true, message: 'Please choose Ticket Fare' }]}>
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal >

    );
};

export default ModalTheater