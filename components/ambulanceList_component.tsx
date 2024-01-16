import { AppConfig } from "@config/config";
import RequestServices from "@services/apis_service";
import React, { useEffect, useState } from "react";
import { FaEraser, FaMapMarkerAlt, FaPhoneAlt, FaSearch } from "react-icons/fa";

const SearchBar = ({ value, onChange, onClear }: any) => (
  <div className="flex items-center p-2.5 border border-black rounded-md md:w-auto w-full">
    <input
      className="border-0 outline-none md:w-[18rem] w-full"
      type="text"
      placeholder="Search..."
      value={value}
      onChange={onChange}
    />
    {value !== "" ? (
      <span onClick={onClear}>
        <FaEraser className="cursor-pointer text-gray-900" />
      </span>
    ) : (
      <FaSearch className="cursor-pointer text-gray-900" />
    )}
  </div>
);

const AreaCard = ({ area }: any) => (
  <div className="bg-white h-[10rem] w-[16rem] flex flex-col items-center justify-evenly shadow-md rounded-md m-2 relative">
    <div>
      <div className="flex items-center justify-center">
        <FaMapMarkerAlt />
        <div className="h-1 w-1"></div>
        <span>{area["name"]}</span>
      </div>
      <div className="flex items-center justify-center">
        <FaPhoneAlt />
        <div className="h-1 w-1"></div>
        <span>{area["phone"]}</span>
      </div>
    </div>
    <div>
      <a
        href={`tel:${area["phone"]}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <div className="flex items-center ">
          <FaPhoneAlt />
          <span className="ml-1">Call Now</span>
        </div>
      </a>
    </div>
  </div>
);

const ZoneCard = ({ zone }: any) => (
  <div className="flex flex-col rounded-md bg-gray-50 p-2 justify-center">
    <span className="text-lg font-semibold flex p-2">
      <svg
        className="h-8 w-8  mr-2"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        {" "}
        <path stroke="none" d="M0 0h24v24H0z" />{" "}
        <line x1="18" y1="6" x2="18" y2="6.01" />{" "}
        <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5" />{" "}
        <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15" />{" "}
        <line x1="9" y1="4" x2="9" y2="17" />{" "}
        <line x1="15" y1="15" x2="15" y2="20" />
      </svg>
      {zone.name}
    </span>
    <div className="p-2 flex items-center justify-center md:justify-start flex-wrap">
      {zone.areas.map((area: any, idx3: any) => (
        <AreaCard key={idx3} area={area} />
      ))}
    </div>
  </div>
);

const DistrictCard = ({ district }: any) => (
  <div className="flex flex-col bg-gray-200 w-full p-3 rounded-md">
    <span className="text-xl flex font-bold p-2">
      <svg
        className="h-8 w-8 mr-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        {" "}
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />{" "}
        <line x1="8" y1="2" x2="8" y2="18" />{" "}
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
      {district["district"]}
    </span>
    {district["zones"].map((zone: any, idx2: any) => (
      <ZoneCard key={idx2} zone={zone} />
    ))}
  </div>
);

const AmbulanceListComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<any>([]);
  const [ambulanceList, setAmbulanceList] = useState<any>([]);

  const service = new RequestServices();

  useEffect(() => {
    (async () => {
      let response: any = await fetchData();
      setAmbulanceList(response.data.data.attributes.ambulanceList);
    })();
  }, []);

  const fetchData = async () => {
    return await service.getRequest(AppConfig.routes.ambulanceList);
  };

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);

    if (inputValue) {
      const filtered = ambulanceList.filter((item: any) => {
        return item.zones.some((zone: any) => {
          return zone.areas.some((area: any) =>
            area.name.toLowerCase().includes(inputValue.toLowerCase())
          );
        });
      });
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <div>
      <div className="flex items-center md:w-auto w-full ">
        <SearchBar
          value={searchTerm}
          onChange={handleInputChange}
          onClear={() => setSearchTerm("")}
        />
      </div>

      {searchTerm ? (
        filteredData?.length > 0 ? (
          filteredData?.map((district: any, idx1: any) => (
            <DistrictCard key={idx1} district={district} />
          ))
        ) : (
          <span className="p-2">no data found</span>
        )
      ) : (
        ambulanceList.map((district: any, idx1: any) => (
          <DistrictCard key={idx1} district={district} />
        ))
      )}
    </div>
  );
};

export default AmbulanceListComponent;
