import React from 'react';
import { Card, List, Button } from 'antd';

const packages = [
  { name: 'Basic', price: '$50', dailyEarnings: '1.5 USD/day' },
  { name: 'Standard', price: '$130', dailyEarnings: '2.5 USD/day' },
  { name: 'Premium', price: '$280', dailyEarnings: '4 USD/day' },
  { name: 'Gold', price: '$340', dailyEarnings: '6 USD/day' },
  { name: 'Platinum', price: '$500', dailyEarnings: '8 USD/day' },
];

const PackagesSection: React.FC = () => {
  return (
    <Card title="Available Mining Packages" bordered={false}>
      <List
        dataSource={packages}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.name} description={`Price: ${item.price}`} />
            <div>{item.dailyEarnings}</div>
            <Button type="primary">Buy Now</Button>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default PackagesSection;
