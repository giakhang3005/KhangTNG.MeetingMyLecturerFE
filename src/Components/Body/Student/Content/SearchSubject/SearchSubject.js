import { SearchBar } from "./SearchBar";
import { ResultDisplay } from "./ResultDisplay";
import { PopupInputPassword } from "./PopupInputPassword";
import { useState } from "react";
import { Typography } from "antd";

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
          <SearchBar setIsSearchingSubject={setIsSearchingSubject} />
          <ResultDisplay setIsSelectedSlot={setIsSelectedSlot} />
        </>
      ) : (
        <PopupInputPassword setIsSelectedSlot={setIsSelectedSlot} isSelectedSlot={isSelectedSlot} />
      )}
    </div>
  );
};
