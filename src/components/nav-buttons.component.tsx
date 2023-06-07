import { AppConfig } from "@/app.config";
import RequestServices from "@/services/requests.services";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavButtons = ({ name = "click here", data, className = "" }: any) => {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetchData();
      setButtons(result?.data?.data);
    })();
  }, [buttons]);
  const fetchData = async () => {
    const service = new RequestServices();
    return await service.getRequest(AppConfig.routes.navButtons);
  };
  return (
    <div className="flex align-middle md:justify-center sm:justify-start py-2 flex-wrap">
      {buttons.map((item: any) => (
        <span className="mx-[4rem] my-[1rem]" key={item?.id}>
          <Link
            target={"_blank"}
            href={"https://www.tmmk.info/donation/"}
            style={{ background: item?.attributes?.color }}
            className={`text-1xl  text-white stroke-black  animation-pulse font-bold py-2 px-4 rounded`}
          >
            {item?.attributes?.text}
          </Link>
        </span>
      ))}
    </div>
  );
};
export default NavButtons;
