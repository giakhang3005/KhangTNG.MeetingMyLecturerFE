import React from "react";
import { Tag } from "antd";
import {SyncOutlined, CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'

export const Accept = () => {
  return <Tag icon={<CheckCircleOutlined />} color="green"><b>ACCEPTED</b></Tag>;
};

export const Decline = () => {
  return <Tag icon={<CloseCircleOutlined />} color="red"><b>DECLINED</b></Tag>;
};

export const Pending = () => {
  return <Tag icon={<SyncOutlined spin />} color="yellow"><b>PENDING</b></Tag>;
};
