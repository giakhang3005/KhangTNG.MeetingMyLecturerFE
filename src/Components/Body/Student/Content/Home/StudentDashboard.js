import { Typography } from "antd"
import {StatisticNumber} from './StatisticNumbers'
import { RecentMeetingMonth } from "./RecentMeetingMonth"

export const StudentDashboard = () => {
    const {Title} = Typography;
    return (
        <>
            <Title className="sectionTitle" level={3}>DASHBOARD</Title>
            <StatisticNumber />
            <RecentMeetingMonth />
        </>
    )
}