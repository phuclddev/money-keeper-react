import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getAccountsuccess, deleteAccountsuccess } from "../../modules/reducer";
import { getAccounts, deleteAccount } from '../../api';
import { Table, Button, Modal, Popconfirm, Input } from 'antd';
const { Search } = Input;

const AccountView = ({ currentUser, account_info }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAccounts().then(function(res) {
      if(res.status === 'successful') {
        dispatch(getAccountsuccess(res.payload))
      }
    });
  }, []);
  const [filteredInfo, setFilteredInfo] = useState(null);
  const [searchText, setSearchText] = useState('');

  const dataSource = filteredInfo || account_info;
  const handleSearch = (value) => {
    const text = value.trim().toLowerCase();
    if (text === '') {
      setFilteredInfo(null);
      setSearchText('');
    } else {
      const filteredData = account_info.filter(
        (record) =>
          record.id.toString().includes(text) ||
          record.balance_name.toLowerCase().includes(text)
      );
      setFilteredInfo(filteredData);
      setSearchText(text);
    }
  };

  const handleReset = () => {
    setFilteredInfo(null);
    setSearchText('');
  };

  const columns = [
    {
      title: 'Initial Balance',
      dataIndex: 'initial_balance',
      key: 'initial_balance',
    },
    {
      title: 'Balance Name',
      dataIndex: 'balance_name',
      key: 'balance_name',
    },
    {
      title: 'Balance Type',
      dataIndex: 'balance_type',
      key: 'balance_type',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleView(record)}>
            View
          </Button>
          <Popconfirm
            title="Are you sure delete this account?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger style={{ marginLeft: 10 }}>Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleView = (record) => {
    Modal.info({
      title: `View Account #${record.id}`,
      content: (
        <div>
          <p>Initial Balance: {record.initial_balance}</p>
          <p>Balance Name: {record.balance_name}</p>
          <p>Balance Type: {record.balance_type}</p>
          <p>Currency: {record.currency}</p>
          <p>Description: {record.description}</p>
        </div>
      ),
    });
  };

  const handleDelete = async (id) => {
    const success = await deleteAccount(id);
    if (success) {
      Modal.success({
        title: 'Account deleted successfully',
        content: `Account #${id} has been deleted.`,
      });
      // re-fetch the updated list of accounts
      getAccounts().then(function(res) {
        if(res.status == 'successful') {
          dispatch(getAccountsuccess(res.payload))
        }
      });
    }
  };

  return (
    <>
    <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Enter Account ID or Balance Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 300, marginRight: 16 }}
        />
        <Button onClick={handleReset}>Reset</Button>
        </div>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default AccountView;