import NavButtons from "@/components/nav-buttons.component";
import { AppConfig } from "@config/config";
import { useGlobalContext } from "@context/context";
import RequestServices from "@services/apis_service";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCaretDown, FaRegMinusSquare } from "react-icons/fa";
import HorizontalTextMarquee from "./horizontal_marquee.component";

export const Header = () => {
  const [headerImg, setHeaderImg] = useState<any>("");
  const [marquee, setMarquee] = useState<any>([]);
  const [adminData, setAdminData] = useState([]);
  const [wingData, setWingData] = useState([]);
  const { fieldNames }: any = useGlobalContext();

  const menus = [
    { id: "1", route: "/", name: fieldNames?.home },
    { id: "2", route: "/about", name: fieldNames?.about },
    { id: "3", route: "/pressrelease", name: fieldNames?.pressRelease },
    {
      id: "4",
      route: "/administration",
      name: fieldNames?.administration,
      children: adminData,
    },
    {
      id: "5",
      route: "/wing",
      name: fieldNames?.wing,
      children: wingData,
    },
    { id: "6", route: "/allBlog/acheivements", name: fieldNames?.acheivements },
    { id: "7", route: "/allBlog/services", name: fieldNames?.services },
  ];
  const service = new RequestServices();
  useEffect(() => {
    (async () => {
      const headImg = await fetchImage();
      setHeaderImg(
        headImg?.data?.data?.attributes?.headerImage?.data?.attributes?.url
      );
      const marqueeData = await fetchMarquee();
      setMarquee(marqueeData?.data?.data);
      const adminDataRes = await fetchAdminData();
      setAdminData(adminDataRes?.data.data);
      const wingDataRes = await fetchWingData();
      setWingData(wingDataRes?.data.data);
    })();
  }, []);

  const fetchImage = async () => {
    return await service.getRequest(AppConfig.routes.headersImage);
  };
  const fetchMarquee = async () => {
    return await service.getRequest(AppConfig.routes.blog.featuredBlog);
  };

  const fetchAdminData = async () => {
    return await service.getRequest(AppConfig.routes.administration);
  };

  const fetchWingData = async () => {
    return await service.getRequest(AppConfig.routes.wing);
  };

  const redirect = (url: any) => {
    window.open(url, "_blank", "noreferrer");
  };
  return (
    <>
      <nav className="w-100">
        <img
          src={`${AppConfig.host + headerImg}`}
          alt=""
          className="h-[8rem] w-full mx-autor"
        />
      </nav>

      <HorizontalTextMarquee newsItems={marquee} />

      <nav>
        <label htmlFor="drop" className="toggle">
          <FaRegMinusSquare />
        </label>
        <input type="checkbox" id="drop" />
        <ul className="menu">
          {menus.map((item) => (
            <li key={item.id}>
              <label
                htmlFor={`drop-${item.id}`}
                className="toggle text-2xl capitalize"
              >
                {item.name}
                {item?.children ? <FaCaretDown className="inline-block" /> : ""}
              </label>
              <Link href={item.route}>
                {" "}
                {item.name}{" "}
                {item?.children ? <FaCaretDown className="inline-block" /> : ""}
              </Link>

              {item?.children ? (
                <>
                  <input type="checkbox" id={`drop-${item.id}`} />
                  <ul>
                    {item?.children?.map((item: any) => (
                      <li
                        key={item?.["id"]}
                        onClick={() => redirect(`/administration`)}
                      >
                        <a href="#">{item?.["attributes"]?.["pageTitle"]}</a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <></>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <NavButtons data={fieldNames} />
    </>
  );
};
