import React from 'react';
import { Card, Button } from 'antd';

const NewsSection: React.FC = () => {
  return (
    <Card title="Bitcoin Mining Task" bordered={false}>
      <p>Current News: Bitcoin price is fluctuating!</p>
      <p>Total Earned: 0.000012 BTC</p>
      <Button type="primary">Click to Earn More Bitcoins</Button>
    </Card>
  );
};

export default NewsSection;
