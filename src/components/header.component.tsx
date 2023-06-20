import { AppConfig } from "@/app.config";
import NavButtons from "@/components/nav-buttons.component";
import RequestServices from "@/services/requests.services";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCaretDown, FaRegMinusSquare } from "react-icons/fa";

export const Header = () => {
  const fieldNameUrl = AppConfig.fieldName;
  const [fieldName, setFieldName] = useState<any>([]);
  const [headerImg, setHeaderImg] = useState<any>("");
  const [marquee, setMarquee] = useState<any>([]);
  const [adminData, setAdminData] = useState([]);
  const [wingData, setWingData] = useState([]);

  const menus = [
    { id: "1", route: "/", name: fieldName?.home },
    { id: "2", route: "/about", name: fieldName?.about },
    { id: "3", route: "/pressrelease", name: fieldName?.pressRelease },
    {
      id: "4",
      route: "/administration",
      name: fieldName?.administration,
      children: adminData,
    },
    {
      id: "5",
      route: "/wing",
      name: fieldName?.wing,
      children: wingData,
    },
    { id: "6", route: "/allBlog/acheivements", name: fieldName?.acheivements },
    { id: "7", route: "/allBlog/services", name: fieldName?.services },
  ];
  useEffect(() => {
    (async () => {
      const result = await fetchData();
      setFieldName(result?.data.data[0]["attributes"]["home"]);
      const headImg = await fetchImage();
      setHeaderImg(
        headImg?.data?.data?.attributes?.headerImage?.data?.attributes?.url
      );
      const marqueeData = await fetchMarquee();
      setMarquee(marqueeData?.data?.data[0]?.attributes?.marqueeText);
      const adminDataRes = await fetchAdminData();
      setAdminData(adminDataRes?.data.data);
      const wingDataRes = await fetchWingData();
      setWingData(wingDataRes?.data.data);
    })();
  }, []);
  const fetchData = async () => {
    const service = new RequestServices();
    return await service.getRequest(fieldNameUrl);
  };
  const fetchImage = async () => {
    const service = new RequestServices();
    return await service.getRequest(AppConfig.routes.headersImage);
  };
  const fetchMarquee = async () => {
    const service = new RequestServices();
    return await service.getRequest(AppConfig.routes.marquees);
  };

  const fetchAdminData = async () => {
    const service = new RequestServices();
    return await service.getRequest(AppConfig.routes.administration);
  };

  const fetchWingData = async () => {
    const service = new RequestServices();
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
          className="h-[8rem] w-full mx-auto object-cover"
        />
      </nav>
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
      {marquee ? (
        <div className="position-relative marquee-container mb-2">
          <div className="marquee d-flex justify-content-around">
            {marquee?.map((item: any) => (
              <span key={item?.marqueeText}>{item?.marqueeText}</span>
            ))}
          </div>
        </div>
      ) : null}
      <NavButtons data={fieldName} />
    </>
  );
};
