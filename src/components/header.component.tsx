import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export const Header = () => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleNavBar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const menus = [
    { id: "1", route: "/", name: "home" },
    { id: "2", route: "/about", name: "about" },
    { id: "3", route: "/event", name: "event" },
    { id: "4", route: "/pressrelease", name: "press release" },
    { id: "5", route: "/others", name: "others" },
  ];
  return (
    <>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <Link href={"/"} className="text-3xl font-bold leading-none">
          <img
            src="https://members.tmmk.info/assets/images/flag_tmmk.jpg"
            alt=""
            className="h-12 w-[4rem]"
          />
        </Link>

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
        <ul className="hidden absolute top-1/2 right-0 transform -translate-y-1/2  lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
          {menus.map((item) => (
            <li
              key={item.id}
              className={router.pathname == item.route ? "font-extrabold" : ""}
            >
              <Link href={item.route} className="text-sm capitalize">
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
              Become a member
            </Link>
          </li>
          <li>
            <Link
              target={"_blank"}
              href={"https://www.tmmk.info/donation/"}
              className="text-sm  text-black border hover:bg-black hover:text-white font-bold py-2 px-4 rounded"
            >
              Donate
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
                  className={
                    router.pathname == item.route ? "font-extrabold" : ""
                  }
                >
                  <Link href={item.route} className="text-sm capitalize">
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
                  Become a member
                </Link>
              </li>
              <li>
                <Link
                  target={"_blank"}
                  href={"https://www.tmmk.info/donation/"}
                  className="text-sm  block p-4  text-black border hover:bg-black hover:text-white font-bold py-2 px-4 rounded"
                >
                  Donate
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
    </>
  );
};
