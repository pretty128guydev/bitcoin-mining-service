import React from 'react';
import { Card, Input, Button } from 'antd';

const ReferralSection: React.FC = () => {
  const referralLink = 'https://bitcoin-mining.com/ref/12345';

  return (
    <Card title="Invite Friends & Earn More!" bordered={false}>
      <p>Share this referral link with your friends:</p>
      <Input value={referralLink} readOnly />
      <Button type="primary" style={{ marginTop: '10px' }}>
        Copy Link
      </Button>
    </Card>
  );
};

export default ReferralSection;
