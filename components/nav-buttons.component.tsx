import { AppConfig } from "@config/config";
import RequestServices from "@services/apis_service";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavButtons = ({ name = "click here", data, className = "" }: any) => {
  const [buttons, setButtons] = useState([]);
  const service = new RequestServices();
  useEffect(() => {
    (async () => {
      const result = await fetchData();
      setButtons(result?.data?.data);
    })();
  }, []);
  const fetchData = async () => {
    return await service.getRequest(AppConfig.routes.navButtons);
  };
  return (
    <div className="flex align-middle md:justify-center justify-around py-6 flex-wrap">
      {buttons?.map((item: any) => (
        <span className="md:mx-[2rem] md:my-[1rem] mx-1 " key={item?.id}>
          <Link
            target={"_blank"}
            href={"https://www.tmmk.info/donation/"}
            style={{ background: item?.attributes?.color }}
            className={`text-1xl   text-white stroke-black  animation-pulse font-bold py-2 px-4 rounded`}
          >
            <button>
              {item?.attributes?.icon ? (
                <img
                  src={`${AppConfig.host}${item?.attributes?.icon?.data?.attributes?.url}`}
                  alt="icon"
                  className="inline-flex h-[30px] w-[30px] mb-2"
                />
              ) : (
                <></>
              )}
              <span className="ml-2 hidden sm:inline-flex">
                {item?.attributes?.text}
              </span>
            </button>
          </Link>
        </span>
      ))}
    </div>
  );
};
export default NavButtons;
