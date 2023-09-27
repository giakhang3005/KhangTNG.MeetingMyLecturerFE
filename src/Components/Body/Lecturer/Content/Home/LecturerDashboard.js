import { Typography } from "antd"
import {StatisticNumber} from './StatisticNumbers'
import { RecentSlotsMonth } from "./RecentSlotsMonth"

export const LecturerDashboard = () => {
    const {Title} = Typography;
    return (
        <>
            <Title className="sectionTitle" level={3}>DASHBOARD</Title>
            <StatisticNumber />
            <RecentSlotsMonth />
        </>
    )
}