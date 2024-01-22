import { AppConfig } from "@config/config";
import Link from "next/link";
import { FaFacebookF, FaPhone, FaTwitter, FaUser } from "react-icons/fa";

const Profile = ({ profile }: any) => {
  return (
    <div className="card shadow-md py-16 px-8 rounded-md">
      <div className="flex items-center justify-around">
        <img
          src={AppConfig.host + profile?.image?.data?.attributes?.url}
          className=" object-cover w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
        />
        <div className="w-1/2">
          <span className="font-extrabold overflow-hidden line-clamp-3 text-md">
            {profile?.name}
          </span>
          {/* <h2 className="flex">
            <FaPhone className="p-1 pl-0 " size={30} color="#707070" />{" "}
            {profile?.phoneNo}
          </h2> */}
          {profile?.role ? (
            <h2 className="flex items-center">
              {/* <FaUser className="p-1 pl-0" size={30} color="#707070" /> */}
              {profile?.role}
            </h2>
          ) : null}
        </div>
        <div className="flex flex-col items-center justify-evenly">
          <Link href={profile?.links?.twitter} target="_blank">
            <FaTwitter
              className="p-1 pl-0 m-2 hover:scale-110"
              size={30}
              color="skyblue"
            />
          </Link>{" "}
          <Link href={profile?.links?.facebook} target="_blank">
            <FaFacebookF
              className="p-1 pl-0 m-2 hover:scale-110"
              size={30}
              color="navy"
            />{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Profile;
