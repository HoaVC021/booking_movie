import { unwrapResult } from '@reduxjs/toolkit';
import {
  Button,
  Input,
  message, Popconfirm, Space, Spin, Table,
  Tag
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalUser from './components/modal/ModalUser';
import './user.css';
import {
  createUser, deleteUser,
  filterUser, getAllusers,
  updateProfile
} from './userSlice';

function User() {
  const { Search } = Input;
  const { isLoading, users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const [userList, setuserList] = useState([]);
  const [inforUser, setInforUser] = useState({});
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('');

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const data = await dispatch(getAllusers());
    const dataResult = unwrapResult(data);
    console.log('getUser', dataResult);
    // setuserList(dataResult);
  };
  const showModalEdit = (text, record) => {
    setInforUser(record);
    setMode('edit');
    setVisible(true);
  };
  const showModalCreate = () => {
    setMode('create');
    setVisible(true);
  };

  const handleVisible = (value) => {
    setVisible(value);
  };
  const handlePopConfirm = async (value) => {
    try {
      const onDelete = await dispatch(deleteUser(value.taiKhoan));
      const result = unwrapResult(onDelete);
      // await getUser();
      if (result) {
        message.success('User is deleted');
      }
    } catch (error) {
      message.error('Deleted fail');
    }
  };

  const handleCreateUser = async (value) => {
    try {
      const handleValue = { ...value, maNhom: 'GP01' };
      const createNewUser = await dispatch(createUser(handleValue));
      const createUserResult = unwrapResult(createNewUser);
      // await getUser();
      if (createUserResult) {
        message.success({
          content: 'Create user success',
          className: 'custom-class',
          style: {
            marginTop: '2vh',
          },
        });
      }
      //  setuserList(updateUserResult)
    } catch (error) {
      message.error({
        content: 'fail to create user',
        className: 'custom-class',
        style: {
          marginTop: '2vh',
        },
      });
    }
  };

  const handleEditUser = async (value) => {
    try {
      const handleValue = { ...value, maNhom: 'GP01' };
      const editUser = await dispatch(updateProfile(handleValue));
      const updateUserResult = unwrapResult(editUser);
      // await getUser();
      if (updateUserResult) {
        message.success({
          content: 'Edit user success',
          className: 'custom-class',
          style: {
            marginTop: '2vh',
          },
        });
      }
      //  setuserList(updateUserResult)
    } catch (error) {
      message.error({
        content: 'fail to edit user',
        className: 'custom-class',
        style: {
          marginTop: '2vh',
        },
      });
    }
  };
  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Họ và Tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDt',
      key: 'soDt',
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'matKhau',
      key: 'soDt',
    },
    {
      title: 'Loại người dùng',
      dataIndex: 'maLoaiNguoiDung',
      key: 'maLoaiNguoiDung',
      render: (text) => (
        <>
          {text === 'KhachHang' ? (
            <Tag color={'green'} key={text}>
              {text?.toUpperCase()}
            </Tag>
          ) : (
            <Tag color={'volcano'} key={text}>
              {text?.toUpperCase()}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModalEdit(text, record)}>
            {' '}
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handlePopConfirm(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onSearch = async (value) => {
    console.log('search', value);
    // await dispatch(search(value));
    if (value === '') {
      await getUser();
    } else {
      try {
        const filter = await dispatch(filterUser(value));
        const result = unwrapResult(filter);
        // setuserList(result);
      } catch (error) {
        console.log(error);
        message.error({
          content: 'User not found',
          className: 'custom-class',
          style: {
            marginTop: '2vh',
          },
        });
      }
    }
  };
  return (
    <div className="user__container">
      <div className="title">Quản lý Người dùng</div>
      <div className="button__create">
        <Button onClick={showModalCreate}>Thêm người dùng</Button>
      </div>
      <Search
        placeholder="Nhập tên người dùng"
        onSearch={onSearch}
        style={{ width: '40%' }}
      />
      <div style={{ marginTop: '20px' }}>
        <Spin tip="Loading..." spinning={isLoading}>
          <Table columns={columns} dataSource={users} />
        </Spin>
        ,
        <ModalUser
          record={inforUser}
          onVisible={handleVisible}
          visible={visible}
          onEditUser={handleEditUser}
          mode={mode}
          onCreateUser={handleCreateUser}
        />
      </div>
    </div>
  );
}

export default User;
