import { AppConfig } from "@/app.config";
import { Layout } from "@/components/layout.component";
import RequestServices from "@/services/requests.services";
import { Html } from "next/document";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaFacebook, FaFacebookF, FaPhone, FaTwitter } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Timeline } from "react-twitter-widgets";
import remarkGfm from "remark-gfm";

export default function WingPageType() {
  const router = useRouter();
  let wingPageId: any;

  let [blogData, setBlogData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      // const comment = router.query.comment as string;
      wingPageId = router.query.wingPageId as string;
      const result = await fetchData();
      setBlogData(result?.data?.data?.attributes);
      console.log(blogData);
    })();
  }, [wingPageId, !blogData ? blogData : null]);
  const fetchData = async () => {
    const service = new RequestServices();
    return await service.getRequest(
      `wings/${wingPageId}?populate[0]=profileDetail.image&populate[1]=profileDetail.links`
    );
  };

  return (
    <>
      <Layout>
        <h1 className="text-center">{blogData?.pageTitle}</h1>
        <hr />
        <section className="mt-5">
          <h1>Members</h1>
          <div className="grid grid-auto-fit gap-5">
            {blogData?.profileDetail?.map((profile: any, idx: any) => (
              <div className="card shadow-md py-16 px-8 rounded-md" key={idx}>
                <div className="flex items-center justify-around">
                  <img
                    src={AppConfig.host + profile?.image?.data?.attributes?.url}
                    className=" object-cover w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                  />
                  <div className="w-1/2">
                    <h1 className="font-extrabold">{profile?.name}</h1>
                    <h2 className="flex">
                      <FaPhone
                        className="p-1 pl-0 "
                        size={30}
                        color="#707070"
                      />{" "}
                      {profile?.phoneNo}
                    </h2>
                    <h2 className="flex">
                      <FaRegEnvelope
                        className="p-1 pl-0"
                        size={30}
                        color="#707070"
                      />{" "}
                      {profile?.email}
                    </h2>
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
            ))}
          </div>

          <div className="grid grid-auto-fit gap-5 mt-8">
            <div className="shadow-md p-6">
              <ReactMarkdown
                key={blogData?.length}
                transformImageUri={(src) => {
                  return AppConfig.host + src;
                }}
              >
                {blogData?.vision}
              </ReactMarkdown>
            </div>
            <div className="shadow-md p-6">
              <ReactMarkdown
                key={blogData?.length}
                transformImageUri={(src) => {
                  return AppConfig.host + src;
                }}
              >
                {blogData?.mission}
              </ReactMarkdown>
            </div>
          </div>

          <div className="grid grid-auto-fit-sm gap-5 mt-8">
            <div className="flex flex-col">
              <h1 className="font-bold">Youtube feeds</h1>

              <div
                className="h-[400px] w-[400px]"
                dangerouslySetInnerHTML={{ __html: blogData?.youtubeIframe }}
              ></div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold">Facebook feeds</h1>

              <div
                className="h-[400px] w-[400px]"
                dangerouslySetInnerHTML={{ __html: blogData?.facebookIframe }}
              ></div>
            </div>
          </div>
        </section>
        <div className="flex">
          <div className="h-[400px] w-[400px] mt-16">
            <h1 className="font-bold">Twitter feeds</h1>
            <Timeline
              dataSource={{
                sourceType: "profile",
                screenName: blogData?.twitterIframe,
              }}
              options={{
                height: "400",
                width: "400",
              }}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
