import { SearchBar } from "./SearchBar";
import { ResultDisplay } from "./ResultDisplay";
import { PopupInputPassword } from "./PopupInputBookingInfo";
import { useState } from "react";
import { Typography, Space } from "antd";

export const SearchSubject = () => {
  const { Title } = Typography;

  //check if user search for the first time
  const [checkSearch, setCheckSearch] = useState(false)

  //handle subject search
  const [isSearchingSubject, setIsSearchingSubject] = useState(null);
  const [isSelectedSlot, setIsSelectedSlot] = useState([]);

  //handle date search
  const [startDate, setStartDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  //handle lecturerCodeSearch
  const [lecturerCodeSearch, setLecturerCodeSearch] = useState(null);

  const [recentSearch, setRecentSearch] = useState({
    lecturerCode: null,
    subject: null,
    start: null,
    to: null,
  });

  const [BookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="searchSubject">
      {isSelectedSlot.length === 0 ? (
        <>
          <Title className="sectionTitle" level={3}>
            BOOKING
          </Title>

          {/* Display Search Bar & result */}
          <Space direction="vertical" style={{ width: "100%" }}>
            <SearchBar
              setLecturerCodeSearch={setLecturerCodeSearch}
              lecturerCodeSearch={lecturerCodeSearch}
              setIsSearchingSubject={setIsSearchingSubject}
              startDate={startDate}
              setStartDate={setStartDate}
              toDate={toDate}
              setToDate={setToDate}
              setRecentSearch={setRecentSearch}
              isSearchingSubject={isSearchingSubject}
              setBookingList={setBookingList}
              setLoading={setLoading}
              setCheckSearch={setCheckSearch}
            />
            <ResultDisplay
              setIsSelectedSlot={setIsSelectedSlot}
              isSearchingSubject={isSearchingSubject}
              startDate={startDate}
              toDate={toDate}
              recentSearch={recentSearch}
              BookingList={BookingList}
              loading={loading}
              checkSearch={checkSearch}
            />
          </Space>
        </>
      ) : (
        <PopupInputPassword
          setIsSelectedSlot={setIsSelectedSlot}
          isSelectedSlot={isSelectedSlot}
        />
      )}
    </div>
  );
};
