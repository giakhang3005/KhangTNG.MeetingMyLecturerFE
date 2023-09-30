import React from "react";
import { Typography } from "antd";

export function RequestsSent() {
  const { Title } = Typography;
  return (
    <>
      <Title className="sectionTitle" level={3}>
        REQUESTS SENT
      </Title>
    </>
  );
}
