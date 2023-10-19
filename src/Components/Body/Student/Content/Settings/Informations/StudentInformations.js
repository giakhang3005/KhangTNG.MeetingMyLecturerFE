import { React, useState, useEffect } from "react";
import {
  Col,
  Row,
  Typography,
  Button,
  Select,
  Input,
  message,
  Tag,
  Spin,
  Popover,
} from "antd";
import { FormOutlined, LeftOutlined } from "@ant-design/icons";
import axios from "axios";

export function StudentInformations() {
    const { Title } = Typography;
    const [loading, setLoading] = useState(false);
    const [student, setStudent] = useState({});
    const fptEmail = "@fpt.edu.vn";
    return (
<>
      <Title className="sectionTitle" level={3}>
        PERSONAL INFORMATIONS
      </Title>
      <Spin spinning={false} tip="Prepairing your Data...">

      </Spin>
    </>
  );
}
