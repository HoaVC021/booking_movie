import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, notification } from 'antd';
import { updateProfile } from '../../profileSlice';
import { useDispatch } from 'react-redux';
import { SmileOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';

function ProfileModal({
  record,
  onVisible,
  visible,
  onEditUser,
  mode,
  onCreateUser
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleCancel = () => {
    onVisible(false);
    setConfirmLoading(false);
  };
  const openNotification = (issuccess) => {
    if (issuccess) {
      notification.info({
        message: `Update Profile Success`,
        placement: 'botRight',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      });
    }
    else {
      notification.info({
        message: `Update Profile Fail`,
        description: `Update Fail, please try later`,
        placement: 'botRight',
        icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      });
    }
  };
  const handleEditUser = async (value) => {
    let isSuccess = false;
    const customdata = { ...value, maNhom: 'GP01', soDt: value.soDT };
    const editUser = await dispatch(
      updateProfile({ data: customdata })
    );
    const updateUserResult = unwrapResult(editUser);
    // await getUser();
    if (updateUserResult) {
      handleCancel();
      isSuccess = true;
    }
    //  setuserList(updateUserResult)
    openNotification(isSuccess);
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const getRecord = () => {
    if (Object.values(record).length === 0) {
      return;
    }
    form.setFieldsValue(record);
  };
  useEffect(() => {
    console.log(record);
    getRecord();
  }, [visible]);
  return (
    <div>
      <Modal
        title={'Update Profile'}
        visible={visible}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleEditUser(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        htmlType="submit"
      >
        <Form
          {...layout}
          initialValues={{
            remember: false,
          }}
          form={form}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['taiKhoan']}
            label="Tài Khoản"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={['hoTen']}
            label="Họ và tên"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['email']}
            label="Email"
            rules={[{ type: 'email', required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['soDT']}
            label="Số Điện Thoại"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['matKhau']}
            label="Mật Khẩu"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name={['maLoaiNguoiDung']}
            label="Chọn loại người dùng"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Chọn loại người dùng"
              value={record.maLoaiNguoiDung}
              allowClear={true}
            >
              <Select.Option value="KhachHang">Khách hàng</Select.Option>
              <Select.Option value="QuanTri">Quản trị</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProfileModal;
