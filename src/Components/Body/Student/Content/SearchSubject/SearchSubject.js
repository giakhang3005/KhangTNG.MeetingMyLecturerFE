import { SearchBar } from "./SearchBar";
import { ResultDisplay } from "./ResultDisplay";
import { PopupInputPassword } from "./PopupInputBookingInfo";
import { useState } from "react";
import { Typography, Space } from "antd";

export const SearchSubject = () => {
  const { Title } = Typography;

  //handle subject search
  const [isSearchingSubject, setIsSearchingSubject] = useState("");
  const [isSelectedSlot, setIsSelectedSlot] = useState([]);

  //handle date search
  const [startDate, setStartDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [recentSearch, setRecentSearch] = useState({
    subject: null,
    start: null,
    to: null,
  });

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
              setIsSearchingSubject={setIsSearchingSubject}
              startDate={startDate}
              setStartDate={setStartDate}
              toDate={toDate}
              setToDate={setToDate}
              setRecentSearch={setRecentSearch}
              isSearchingSubject={isSearchingSubject}
            />
            <ResultDisplay
              setIsSelectedSlot={setIsSelectedSlot}
              isSearchingSubject={isSearchingSubject}
              startDate={startDate}
              toDate={toDate}
              recentSearch={recentSearch}
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
