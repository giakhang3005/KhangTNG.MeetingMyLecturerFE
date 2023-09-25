import { Typography } from "antd"
import {ClockCircleOutlined} from "@ant-design/icons"

export const LecturerRequest = () => {
    const {Text, Title} = Typography;
    return (
        <>
         <Title className="sectionTitle" level={3}>REQUESTS</Title>
            <ul>
                <li>
                    <Title level={5}>Tran Cong Lam (K17 HCM)</Title>
                    <Text><ClockCircleOutlined /> 13:00 - 14:00 24/09/2023 </Text>
                </li>
            </ul>
        </>
    )
}