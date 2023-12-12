import { AppConfig } from "@config/config";
import { useGlobalContext } from "@context/context";
import RequestServices from "@services/apis_service";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [socialMediaLinks, setSocialMediaLinks] = useState<any>();
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
      const result = await fetchBlogData();
      setSocialMediaLinks(result?.data?.data?.attributes);
      const adminDataRes = await fetchAdminData();
      setAdminData(adminDataRes?.data.data);
      const wingDataRes = await fetchWingData();
      setWingData(wingDataRes?.data.data);
    })();
  }, []);

  const fetchBlogData = async () => {
    return await service.getRequest(AppConfig.routes.socialMediaLink);
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
      <footer className="text-gray-600 body-font bg-black mt-12">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/2 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                Links
              </h2>
              <nav className="list-none flex gap-3 bg-black flex-col flex-wrap max-h-60 mb-10">
                {menus.map((item) => (
                  <li
                    className="bg-black"
                    key={item?.id}
                    onClick={() => redirect(item?.route)}
                  >
                    <a className="text-gray-600 hover:text-gray-800 px-0">
                      {item?.name ?? ""}
                    </a>
                  </li>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-neutral-900">
          <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col ">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
              <img
                src="https://members.tmmk.info/assets/images/flag_tmmk.jpg"
                height={25}
                width={25}
                alt=""
              />
              <span className="ml-3 text-xl">Tmmk</span>
            </a>
            <p className="text-sm text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
              © TMMK —
              <a
                href="https://twitter.com/TmmkHq_official"
                className="text-gray-400 ml-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                @TmmkHq_official
              </a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
              <Link
                className="text-white"
                target="_blank"
                href={
                  socialMediaLinks?.facebook ? socialMediaLinks?.facebook : ""
                }
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </Link>
              <Link
                className="ml-3 text-white"
                target="_blank"
                href={
                  socialMediaLinks?.twitter ? socialMediaLinks?.twitter : ""
                }
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </Link>
              <Link
                className="ml-3 text-white"
                target="_blank"
                href={
                  socialMediaLinks?.instagram ? socialMediaLinks?.instagram : ""
                }
              >
                {" "}
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </Link>
              <Link
                className="ml-3 text-white"
                target="_blank"
                href={
                  socialMediaLinks?.youtube ? socialMediaLinks?.youtube : ""
                }
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />{" "}
                </svg>
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};
