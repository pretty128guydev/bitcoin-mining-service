import React from "react";
import { Card, Input, Button } from "antd";
import InvitationComponent from "./InvitationComponent";
import GoldCoinPromo from "./GoldCoinPromo/GoldCoinPromo";

const ReferralSection: React.FC = () => {

  return <div style={{
    height: "100%",
    overflowY: "auto",
    padding: "20px"
  }}> <InvitationComponent />
    <GoldCoinPromo />
  </div >;
};

export default ReferralSection;
