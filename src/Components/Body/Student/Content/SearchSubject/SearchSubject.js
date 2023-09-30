import { SearchBar } from "./SearchBar";
import { ResultDisplay } from "./ResultDisplay";
import { PopupInputPassword } from "./PopupInputBookingInfo";
import { useState } from "react";
import { Typography, Space } from "antd";

export const SearchSubject = () => {
  const { Title } = Typography;
  const [isSearchingSubject, setIsSearchingSubject] = useState("");
  const [isSelectedSlot, setIsSelectedSlot] = useState([]);

  return (
    <div className="searchSubject">
      {isSelectedSlot.length === 0 ? (
        <>
          <Title className="sectionTitle" level={3}>
            SUBJECTS SEARCH
          </Title>
          <Space direction="vertical" style={{ width: "100%" }}>
            <SearchBar setIsSearchingSubject={setIsSearchingSubject} />
            <ResultDisplay
              setIsSelectedSlot={setIsSelectedSlot}
              isSearchingSubject={isSearchingSubject}
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
