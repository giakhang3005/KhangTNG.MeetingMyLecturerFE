import { AddingLocation } from "./AddingLocation";
import { ViewingLocation } from "./ViewingLocation";
import { EditingLocation } from "./EditingLocation";
import { useState, useEffect, useContext } from "react";
import { Typography, Tabs, Button } from "antd";
import { LeftOutlined, RedoOutlined } from "@ant-design/icons";
import { AddLocationBtn } from "./AddLocationBtn";
import { RecoverLocation } from "./RecoverLocation";
import axios from "axios";
import { Data } from "../../../../Body";

export const LecturerLocation = ({ setMenuOpt }) => {
 const { Title } = Typography;

 const { user } = useContext(Data);

  //state checking action of user in LecturerLocation
 const [locationSectionView, setLocationSectionView] = useState("view");
 const [editLocation, setEditLocation] = useState({});
 const [finalIdOfTheList, setFinalIdOfTheList] = useState("");

  //! fetching data -> LocationsList
 const [isLoading, setIsLoading] = useState(false);
 const [LocationsList, setLocationsList] = useState([]);
 const getLocations = () => {
    setIsLoading(true);
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/location/personal?Lecturer-id=${user.id}`
      )
      .then(
        (response) => (
          setLocationsList(response.data.data), setIsLoading(false)
        )
      );
  };

 const [deletedLocLoading, SeteletedLocLoading] = useState(false);
 const [deletedLoc, setDeletedLoc] = useState([]);
 const getDeletedLocations = () => {
    SeteletedLocLoading(true);
    axios
      .get(
        `https://meet-production-52c7.up.railway.app/api/location/recovery?Lecturer-id=${user.id}`
      )
      .then(
        (response) => (
          setDeletedLoc(response.data.data), SeteletedLocLoading(false)
        )
      );
  };

 const refresh = () => {
    getLocations();
    getDeletedLocations();
  };

  useEffect(() => {
    getLocations();
    getDeletedLocations();
  }, []);

 const items = [
    {
      key: 1,
      label: "Active Locations",
      children: [
        <ViewingLocation
          setLocationSectionView={setLocationSectionView}
          setEditLocation={setEditLocation}
          setFinalIdOfTheList={setFinalIdOfTheList}
          setMenuOpt={setMenuOpt}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          LocationsList={LocationsList}
          refresh={refresh}
        />,
      ],
    },
    {
      key: 2,
      label: "Deleted Locations",
      children: [
        <RecoverLocation
          deletedLoc={deletedLoc}
          deletedLocLoading={deletedLocLoading}
          refresh={refresh}
        />,
      ],
    },
  ];
  return (
    <>
      {/* Adding location */}
      {locationSectionView === "add" ? (
        <AddingLocation
          setLocationSectionView={setLocationSectionView}
          finalIdOfTheList={finalIdOfTheList}
          getLocations={getLocations}
        />
      ) : // Edit location
      locationSectionView === "edit" ? (
        <EditingLocation
          setLocationSectionView={setLocationSectionView}
          editLocation={editLocation}
          getLocations={getLocations}
        />
      ) : (
        // View location -> default
        <>
          <Button
            icon={<LeftOutlined />}
            type="text"
            onClick={() => setMenuOpt("lecturerCfg")}
          >
            Back
          </Button>
          <Title className="sectionTitle" level={3}>
            MY LOCATIONS
            <span>
              <Button
                onClick={refresh}
                icon={<RedoOutlined />}
                style={{ margin: "0 7px 0 0" }}
                loading={isLoading || deletedLocLoading}
              >
                {isLoading ? "Checking for updates" : "Refresh"}
              </Button>
              <AddLocationBtn
                setLocationSectionView={setLocationSectionView}
                LocationsList={LocationsList}
                setFinalIdOfTheList={setFinalIdOfTheList}
                isLoading={isLoading}
              />
            </span>
          </Title>
          <Tabs defaultActiveKey="1" items={items} />
        </>
      )}
    </>
  );
};
