import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getAccountsuccess } from "../../modules/reducer";
import { getAccounts } from '../../api';
import axios from 'axios';
import { Form, Input, Button, message, Modal } from 'antd';

const AccountAddView = ({
  currentUser,
  account_info
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const accountForm = {
    balanceName: '',
    balanceType: '',
    currency: '',
    description: '',
    initialBalance: undefined, // set initialBalance to undefined to allow empty input
  };

  const onFinish = async (values) => {
    const { balanceName, balanceType, currency, description, initialBalance } = values;
    const payload = {
      balance_name: balanceName,
      balance_type: balanceType,
      currency,
      description,
      initial_balance: parseFloat(initialBalance),
    };
    try {
      const response = await axios.post('http://localhost:8000/api/account/', payload, { withCredentials: true });
      console.log(response.data);
      setResponseMessage(response.data.payload);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);

    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setResponseMessage('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setResponseMessage('');
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  console.log(responseMessage)
  return (
    <>
      <Form name="create-account-form" onFinish={onFinish}>
        <Form.Item name="initialBalance" label="Initial Balance" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="balanceName" label="Balance Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="balanceType" label="Balance Type" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="currency" label="Currency" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create Account</Button>
        </Form.Item>
      </Form>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{responseMessage}</p>
      </Modal>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
    </>
  );
};

export default AccountAddView