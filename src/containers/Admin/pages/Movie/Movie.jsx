import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TheatersIcon from '@mui/icons-material/Theaters';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Input, message, Popconfirm, Space, Table, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalMovie from './components/ModalMovie/ModalMovie';
import ModalTheater from './components/ModalMovie/ModalTheater';
import './movie.css';
import { delMovieSync, getFilmsSync, setMode, setMovie, setVisible, setInputSearch, showTheater } from './movieSlice';

const { Title } = Typography;
const { Search } = Input;
const { Column } = Table;

export default function Movie() {
    const [checkDelete, setCheckDelete] = useState({})
    const data = useSelector(state => state.movie.allFilm)
    const inputSearch = useSelector(state => state.movie.inputText)

    const dispatch = useDispatch()
    useEffect(() => {
        const getFilms = async () => {
            try {
                const actionGetAllFilm = await dispatch(getFilmsSync());
                unwrapResult(actionGetAllFilm);
            } catch (error) {
                return alert(error.message)
            }
        }
        getFilms()
        return () => { };
    }, []);

    const showPopconfirm = (record) => {
        setCheckDelete((prevVisible) => ({
            ...prevVisible,
            [record.maPhim]: true
        }))
    };
    const handleCancel = (record) => {
        setCheckDelete((prevVisible) => ({
            ...prevVisible,
            [record.maPhim]: false
        }))
    };
    const handleAddMovie = () => {
        dispatch(setMode("add"))
        dispatch(setVisible(true))
    }
    const handleEditMovie = (record) => {
        dispatch(setMode("edit"))
        dispatch(setVisible(true))
        dispatch(setMovie(record))
    }
    const handleDelete = async (idMovie) => {
        try {
            const data = await dispatch(delMovieSync(idMovie))
            const result = unwrapResult(data)
            console.log(result);
            if (data.payload === 'Xóa thành công !') {
                message.success('Delete success')
            }
            else {
                message.error(data.payload.res)
            }
        } catch (error) {
            message.info("Guess")
        }
        dispatch(getFilmsSync())
        setCheckDelete((prevVisible) => ({
            ...prevVisible,
            [idMovie]: false
        }))
    }
    const createTheater = async (record) => {
        dispatch(showTheater(true))
        dispatch(setMovie(record))
    }
    const onSearch = async value => {
        dispatch(getFilmsSync(value))
        dispatch(setInputSearch(value))
    };
    return (
        <div className='movie-container'>
            <Title level={2}>Quản lý phim</Title>
            <Button style={{ borderColor: "#b0e3ef", marginBottom: '1rem' }} onClick={handleAddMovie}>Thêm phim</Button>
            <Search
                placeholder="Tim kiếm phim"
                style={{ marginBottom: '1rem' }}
                onSearch={onSearch} enterButton />
            <Table dataSource={data} >
                <Column title="ID" dataIndex="maPhim" key="maPhim" />
                <Column title="Picture" dataIndex="hinhAnh" key="hinhAnh"
                    render={(link, colunm) =>
                        <img style={{ width: '40px', height: '50px', objectFit: 'cover' }} src={link} alt={colunm.tenPhim} />}
                />
                <Column title="Movie" dataIndex="tenPhim" key="tenPhim" />
                <Column title="Description" dataIndex="moTa" key="moTa" />
                <Column title='Action'
                    key='action'
                    dataIndex='action'
                    render={(text, record) => (
                        <Space size="middle">
                            <EditIcon onClick={() => handleEditMovie(record)} />
                            <Popconfirm
                                title={`You want delete ${record.tenPhim}`}
                                visible={checkDelete[record.maPhim]}
                                onConfirm={() => { handleDelete(record.maPhim) }}
                                onCancel={() => { handleCancel(record) }}
                            >
                                <DeleteIcon onClick={() => showPopconfirm(record)} />
                            </Popconfirm>
                            <TheatersIcon onClick={() => createTheater(record)} />
                        </Space>)}
                />
            </Table>
            <ModalMovie />
            <ModalTheater />
        </div >
    );
}
