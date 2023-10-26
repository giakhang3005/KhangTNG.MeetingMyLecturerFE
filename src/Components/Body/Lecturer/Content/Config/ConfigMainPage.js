import React from 'react'
import { Typography, Table, Button } from 'antd'
import {RightOutlined} from '@ant-design/icons'

export function ConfigMainPage({setMenuOpt}) {
  const {Title} = Typography;

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "4",
      title: "",
      render: (config) => {
       return <Button type="primary" icon={<RightOutlined />} onClick={() => setMenuOpt(config.opt)}></Button>
      }
    },
  ]

  const configOpts = [
    {
      id: 1,
      name: "Locations",
      description: "Adding, Viewing and Editing your meeting locations",
      opt: "locations",
    },
    {
      id: 2,
      name: "Online meeting Informations",
      description: "Editing your online meeting informations (meeting link,...)",
      opt: "lecturerCfg",
    },
    // {
    //   id: 3,
    //   name: "Personal Informations",
    //   description: "Editing your personal informations",
    //   opt: "lecturerInformations",
    // },
  ]
  return (
    <>
      <Title className="sectionTitle" level={3}>
        CONFIGURATIONS
      </Title>

      <Table
        className="tableOfLocations"
        columns={columns}
        dataSource={configOpts}
        // loading={isLoading}
        rowKey="id"
      ></Table>
    </>
  )
}
