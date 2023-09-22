import {Menu, Button} from 'antd'
import {DropboxOutlined, BellFilled, HomeFilled, LogoutOutlined} from '@ant-design/icons'

export const LecturerMenu = () => {
 const menuItems =[
    {label: 'Các slot đã tạo', icon: <DropboxOutlined />, key: 'createdSlot'},
    {label: 'Yêu cầu', icon: <BellFilled />, key: 'request'},
    {label: 'Quản lý địa điểm', icon: <HomeFilled />, key: 'location'},
 ]
 return (
    <>
        <Menu 
          items={menuItems}
        />
        <Button danger type="text" icon={<LogoutOutlined />} >Log out</Button>
    </>
 )
}