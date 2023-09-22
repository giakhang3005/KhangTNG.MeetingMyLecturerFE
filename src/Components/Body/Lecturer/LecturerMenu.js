import {useContext} from 'react'
import {Data} from '../Body'
import {Menu, Button} from 'antd'
import {DropboxOutlined, BellFilled, HomeFilled, LogoutOutlined} from '@ant-design/icons'

export const LecturerMenu = () => {
    const {setMenuOpt} = useContext(Data);
 const menuItems =[
    {label: 'Các slot đã tạo', icon: <DropboxOutlined />, key: 'createdSlot'},
    {label: 'Yêu cầu', icon: <BellFilled />, key: 'request'},
    {label: 'Quản lý địa điểm', icon: <HomeFilled />, key: 'location'},
 ]
 return (
    <>
        <Menu 
          items={menuItems}
          defaultSelectedKeys='createdSlot'
          onClick={(selectedOpt) => {
            setMenuOpt(selectedOpt.key);
          }}
        />
        <Button className='logOutBtn' danger type="text" icon={<LogoutOutlined /> } >Log out</Button>
    </>
 )
}