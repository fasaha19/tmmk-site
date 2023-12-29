import { AppConfig } from "@config/config";
import { useGlobalContext } from "@context/context";
import Image from "next/image";
import Link from "next/link";
import { FaArrowAltCircleRight, FaArrowRight } from "react-icons/fa";

export const Card = (props: any) => {
  const hostUrl = AppConfig.host;
  const id = props.blogId;
  const blogData = props.blogData;
  const { fieldNames }: any = useGlobalContext();

  return (
    <Link href={`/blog/${id}`}>
      <div
        className={`  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 shadow-md  overflow-hidden ${id} h-[30rem] relative hover:scale-105 transition-all duration-100 ease-out `}
      >
        <Image
          width={100}
          height={144}
          className="lg:h-48 md:h-36 w-full object-cover object-center shadow-lg h-[10rem]"
          src={
            blogData?.image
              ? hostUrl + blogData.image.data.attributes.url
              : "https://dummyimage.com/720x400"
          }
          alt="blog"
        />
        <div className="bg-black line-clamp-2">
          {/* <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">CATEGORY</h2> */}
          <div className="my-auto px-6 py-1">
            <p className="title-font text-lg font-bold text-white align-middle">
              {blogData?.["title"]}
            </p>
          </div>
        </div>
        <div className="p-6">
          <p className="leading-relaxed mb-3 line-clamp-4">{blogData?.body}</p>
        </div>

        <svg
          viewBox="100 20 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-5 absolute right-0 top-1/2 "
        >
          <path
            fill="#212121"
            d="M52.3,-40C66.9,-23.5,77.2,-1.8,70.1,10.8C63.1,23.4,38.9,26.8,19.8,32.8C0.8,38.8,-13.1,47.3,-26.7,44.8C-40.4,42.3,-53.8,28.8,-58.7,12.1C-63.7,-4.7,-60,-24.8,-48.8,-40.6C-37.6,-56.3,-18.8,-67.6,0,-67.6C18.9,-67.7,37.8,-56.4,52.3,-40Z"
            transform="translate(50 80)"
          />
        </svg>

        <svg
          viewBox="90 0 90 100"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-5 absolute right-0 top-1/2 "
        >
          <path
            fill="#212121"
            d="M52.3,-40C66.9,-23.5,77.2,-1.8,70.1,10.8C63.1,23.4,38.9,26.8,19.8,32.8C0.8,38.8,-13.1,47.3,-26.7,44.8C-40.4,42.3,-53.8,28.8,-58.7,12.1C-63.7,-4.7,-60,-24.8,-48.8,-40.6C-37.6,-56.3,-18.8,-67.6,0,-67.6C18.9,-67.7,37.8,-56.4,52.3,-40Z"
            transform="translate(50 80)"
          />
        </svg>

        <div className="absolute bottom-0 right-0 p-4  w-full ">
          <div className="flex items-center justify-between ">
            <span className="text-gray-500 font-bold">
              {new Date(blogData?.["publishedAt"]).toLocaleDateString()}
            </span>

            <div className="flex items-center">
              <p>{fieldNames["Read more"]}</p>
              <FaArrowRight className="p2 ml-2" size={18} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
