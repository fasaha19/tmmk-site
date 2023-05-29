import { AppConfig } from "@/app.config";
import RequestServices from "@/services/requests.services";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Header = () => {
  const fieldNameUrl = AppConfig.fieldName;
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [fieldName, setFieldName] = useState<any>([]);
  const [headerImg, setHeaderImg] = useState<any>("");
  const toggleNavBar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const menus = [
    { id: "1", route: "/", name: fieldName?.home },
    { id: "2", route: "/about", name: fieldName?.about },
    { id: "3", route: "/administration", name: fieldName?.administration },
    { id: "4", route: "/pressrelease", name: fieldName?.pressRelease },
    { id: "5", route: "/allBlog/acheivements", name: fieldName?.acheivements },
    { id: "6", route: "/allBlog/services", name: fieldName?.services },
    { id: "7", route: "/others", name: fieldName?.others },
    { id: "8", route: "/wing", name: fieldName?.wing },
  ];
  useEffect(() => {
    (async () => {
      const result = await fetchData();
      setFieldName(result?.data.data[0]["attributes"]["home"]);
      const headImg = await fetchImage();
      setHeaderImg(
        headImg?.data?.data?.attributes?.headerImage?.data?.attributes?.url
      );
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
  return (
    <>
      <nav className="w-100">
        <img
          src={`${AppConfig.host + headerImg}`}
          alt=""
          className="h-[8rem] w-full mx-auto object-cover"
        />
      </nav>
      <nav className="relative px-4 py-8 flex justify-between items-center bg-white">
        {/* <Link href={"/"} className="text-3xl font-bold leading-none">
          <img
            src="https://members.tmmk.info/assets/images/flag_tmmk.jpg"
            alt=""
            className="h-12 w-[4rem]"
          />
        </Link> */}

        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-black p-3"
            onClick={toggleNavBar}
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
          {menus.map((item) => (
            <li
              key={item.id}
              className={router.pathname == item.route ? "active-menu" : ""}
            >
              <Link href={item.route} className="text-base m-2 capitalize">
                {item.name}
              </Link>
            </li>
          ))}

          {/* <li className={router.pathname == "/" ? "bg-red-100" : ""}>
            <Link href={"/"} className="text-sm ">
              Home
            </Link>
          </li>

          <li>
            <Link href={"/about"} className="text-sm ">
              About Us
            </Link>
          </li>
          <li>
            <Link href={"/event"} className="text-sm ">
              Events
            </Link>
          </li>
          <li>
            <Link href={"/pressrelease"} className="text-sm ">
              Press Release
            </Link>
          </li>
          <li>
            <Link href={"/others"} className="text-sm ">
              Others
            </Link>
          </li> */}
          <li>
            <Link
              target={"_blank"}
              href={"https://members.tmmk.info/"}
              className="text-sm bg-black hover:bg-[#383838] text-white font-bold py-2 px-4 rounded"
            >
              {fieldName?.becomeAmember}
            </Link>
          </li>
          <li>
            <Link
              target={"_blank"}
              href={"https://www.tmmk.info/donation/"}
              className="text-sm  text-black bg-gradient-to-r from-amber-200 to-amber-300  animation-pulse font-bold py-2 px-4 rounded"
            >
              {fieldName?.donate}
            </Link>
          </li>
          <li></li>
        </ul>
      </nav>
      <div className={`navbar-menu relative z-50 ${!isCollapsed && "hidden"}`}>
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
          onClick={toggleNavBar}
        ></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-3xl font-bold leading-none" href="#">
              <img
                src="https://members.tmmk.info/assets/images/flag_tmmk.jpg"
                alt=""
                className="h-12 w-[4rem]"
              />
            </a>
            <button className="navbar-close" onClick={toggleNavBar}>
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              {menus.map((item) => (
                <li
                  key={item.id}
                  className={router.pathname == item.route ? "active-menu" : ""}
                >
                  <Link href={item.route} className="text-base m-2 capitalize">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="mb-1">
                <Link
                  target={"_blank"}
                  href={"https://members.tmmk.info/"}
                  className="block p-4  text-sm bg-black hover:bg-[#383838] text-white font-bold py-2 px-4 rounded"
                >
                  {fieldName?.becomeAmember}
                </Link>
              </li>
              <li>
                <Link
                  target={"_blank"}
                  href={"https://www.tmmk.info/donation/"}
                  className="text-sm  block p-4  text-black border hover:bg-black hover:text-white font-bold py-2 px-4 rounded"
                >
                  {fieldName?.donate}
                </Link>
              </li>
            </ul>
          </div>
          {/* <div className="mt-auto">
            <div className="pt-6">
              <a
                className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl"
                href="#"
              >
                Sign in
              </a>
              <a
                className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-black hover:bg-blue-700  rounded-xl"
                href="#"
              >
                Sign Up
              </a>
            </div>
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2021</span>
            </p>
          </div> */}
        </nav>
      </div>

      <div className="position-relative marquee-container mb-8">
        <div className="marquee d-flex justify-content-around">
          <span>
            BTC<b>3,588.39</b>
          </span>
          <span>
            XRP<b>0.32</b>
          </span>
          <span>
            ETH<b>116.36</b>
          </span>
          <span>
            EOS<b>2.44</b>
          </span>
          <span>
            USDT<b>1.01</b>
          </span>
          <span>
            LTC<b>32.61</b>
          </span>
          <span>
            XLM<b>0.10</b>
          </span>
          <span>
            TRX<b>0.03</b>
          </span>
          <span>
            BSV<b>74.29</b>
          </span>
          <span>
            ADA<b>0.04</b>
          </span>
        </div>
        <div className="marquee marquee2 d-flex justify-content-around">
          <span>
            BTC<b>3,588.39</b>
          </span>
          <span>
            XRP<b>0.32</b>
          </span>
          <span>
            ETH<b>116.36</b>
          </span>
          <span>
            EOS<b>2.44</b>
          </span>
          <span>
            USDT<b>1.01</b>
          </span>
          <span>
            LTC<b>32.61</b>
          </span>
          <span>
            XLM<b>0.10</b>
          </span>
          <span>
            TRX<b>0.03</b>
          </span>
          <span>
            BSV<b>74.29</b>
          </span>
          <span>
            ADA<b>0.04</b>
          </span>
        </div>
      </div>
    </>
  );
};
