// src/components/Register.tsx
import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    axios.post('http://localhost:5000/api/register', values)
      .then(response => {
        message.success('Registration successful');
        navigate('/login');
      })
      .catch(error => {
        message.error('Registration failed');
        setLoading(false);
      });
  };

  return (
    <Card title="Register" style={{ maxWidth: 400, margin: 'auto' }}>
      <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form.Item>
        <Button type="link" onClick={() => navigate('/login')}>
          Already have an account? Log in here
        </Button>
      </Form>
    </Card>
  );
};

export default Register;
