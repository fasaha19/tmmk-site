"use client";
import { Layout } from "@/components/layout.component";
import Profile from "@/components/profile.component";
import { AppConfig } from "@config/config";
import RequestServices from "@services/apis_service";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Timeline } from "react-twitter-widgets";

export default function WingPageType({ params }: any) {
  const service = new RequestServices();

  let wingPageId: any = params["wingPageId"];

  let [blogData, setBlogData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      // const comment = router.query.comment as string;
      const result = await fetchData();
      setBlogData(result?.data?.data?.attributes);
    })();
  }, [wingPageId, !blogData ? blogData : null]);
  const fetchData = async () => {
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
              <div key={idx}>
                <Profile profile={profile} />
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
