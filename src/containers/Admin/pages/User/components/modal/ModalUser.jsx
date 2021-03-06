import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ModalUser({
  record,
  onVisible,
  visible,
  onEditUser,
  mode,
  onCreateUser,
}) {
  const [form] = Form.useForm();
  const { isLoading } = useSelector((state) => state.user);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onEdit = async (values) => {
    setConfirmLoading(isLoading);
    await onEditUser(values);
    onVisible(false);
    setConfirmLoading(isLoading);
  };
  const onCreate = (values) => {
    setConfirmLoading(isLoading);
    onCreateUser(values);
    onVisible(false);
    setConfirmLoading(isLoading);
  };
  const getRecord = () => {
    if (Object.values(record).length === 0) {
      return;
    }
    form.setFieldsValue(record);
  };
  const handleCancel = () => {
    onVisible(false);
    setConfirmLoading(false);
  };
  useEffect(() => {
    if (mode === 'edit') {
      getRecord();
    } else form.resetFields();
  }, [visible]);

  //message validate
  /* eslint-disable no-template-curly-in-string */
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
  /* eslint-enable no-template-curly-in-string */
  return (
    <Modal
      title={mode === 'edit' ? 'Update Profile' : 'Create User'}
      visible={visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            if (mode === 'edit') {
              onEdit(values);
            } else {
              console.log(values);
              onCreate(values);
            }
            // form.resetFields();
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
          label="T??i Kho???n"
          rules={[{ required: true }]}
        >
          <Input disabled={mode === 'edit' ? true : false} />
        </Form.Item>
        <Form.Item
          name={['hoTen']}
          label="H??? v?? t??n"
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
          name={['soDt']}
          label="S??? ??i???n Tho???i"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['matKhau']}
          label="M???t Kh???u"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name={['maLoaiNguoiDung']}
          label="Ch???n lo???i ng?????i d??ng"
          rules={[{ required: true }]}
        >
          <Select placeholder="Ch???n lo???i ng?????i d??ng" allowClear={true}>
            <Select.Option value="KhachHang">Kh??ch h??ng</Select.Option>
            <Select.Option value="QuanTri">Qu???n tr???</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalUser;
