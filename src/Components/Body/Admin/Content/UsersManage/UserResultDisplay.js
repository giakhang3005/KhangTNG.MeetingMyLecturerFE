import React from "react";
import { Tag } from "antd";

export function UserResultDisplay(props) {
  const recentSearch = props.recentSearch;

  const checkRole = (role) => {
    switch (role) {
      case 0:
        return <Tag color="red">Admin</Tag>;
      case 1:
        return <Tag color="cyan">Lecturer</Tag>;
      case 2:
        return <Tag color="pink">Student</Tag>;
      default:
        return <></>;
    }
  };

  const checkStatus = (status) => {
    switch (status) {
      case 0:
        return <Tag color="red">Disabled</Tag>;
      case 1:
        return <Tag color="green">Active</Tag>;
      default:
        return <></>;
    }
  };
  return (
    <div style={{ margin: "10px 0 0 0" }}>
      {recentSearch.name === null ? (
        ""
      ) : (
        <Tag color="orange">{recentSearch.name}</Tag>
      )}
      {recentSearch.role === null ? "" : checkRole(recentSearch.role)}
      {recentSearch.status === null ? "" : checkStatus(recentSearch.status)}
    </div>
  );
}
