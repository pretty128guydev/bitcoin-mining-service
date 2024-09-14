import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  contactInfo: string;
  role: string;
  // Add other fields as needed
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  const columns: ColumnsType<User> = [
    { title: 'First Name', dataIndex: 'firstname', key: 'firstname' },
    { title: 'Last Name', dataIndex: 'lastname', key: 'lastname' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    // Add other columns as needed
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h1>Users List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Table dataSource={users} columns={columns} rowKey="id" />
      )}
    </div>
  );
};

export default AdminUsersPage;
