import { AppConfig } from "@/app.config";
import { Layout } from "@/components/layout.component";
import RequestServices from "@/services/requests.services";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import Head from "next/head";

export default function BlogDetails() {
  const router = useRouter();
  let id: any;
  const hostUrl = AppConfig.host;
  const shareUrl = AppConfig.siteUrl + router.asPath;

  let [blogData, setBlogData] = useState<any>({});
  useEffect(() => {
    (async () => {
      // const comment = router.query.comment as string;
      id = router.query.id as string;
      const result = await fetchData();
      setBlogData(result?.data.data);
    })();
  }, [id]);
  const fetchData = async () => {
    const service = new RequestServices();
    return await service.getRequest(
      `${AppConfig.routes.blog.blogById}${id}?populate=*`
    );
  };
  return (
    <>
      <Layout>
        <Head>
          <title>
            {blogData?.attributes?.title
              ? "TMMK - " + blogData?.attributes?.title
              : "TMMK Blog"}
          </title>
          <meta
            name="description"
            content={
              blogData?.attributes?.description
                ? blogData?.attributes?.description
                : "TMMK"
            }
          />
        </Head>
        <section className="text-gray-600 body-font">
          <div className="container py-24">
            <div className="grid grid-cols-12 gap-4">
              <div className="lg:col-span-8 md:col-span-12">
                <h1> {blogData?.attributes?.title}</h1>
                <div className="rounded-lg h-64 object-fill overflow-hidden">
                  <img
                    alt="content"
                    className="object-cover object-center h-full w-full mt-5"
                    src={`${
                      blogData?.attributes?.image?.data?.attributes?.url
                        ? hostUrl +
                          blogData?.attributes?.image?.data?.attributes?.url
                        : "https://dummyimage.com/1200x500"
                    }
               `}
                  />
                </div>
                <div className="flex flex-col sm:flex-row mt-5">
                  <div className="sm:w-full sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                    <p className="leading-relaxed text-lg mb-4">
                      {blogData?.attributes?.description}
                    </p>
                    <ReactMarkdown
                      transformImageUri={(src) => {
                        return AppConfig.host + src;
                      }}
                    >
                      {blogData?.attributes?.body}
                    </ReactMarkdown>

                    <div className="h-[1.5px] bg-[#999999] mt-16"></div>

                    <span className="mt-4">Share</span>
                    <div className="flex justify-between">
                      <div>
                        <FacebookShareButton
                          url={shareUrl}
                          quote={"Dummy text!"}
                          hashtag="#muo"
                        >
                          <FaFacebookSquare
                            className="p-1 pl-0"
                            size={40}
                            color="navy"
                          />
                        </FacebookShareButton>
                        <WhatsappShareButton url={shareUrl}>
                          <FaWhatsappSquare
                            className="p-1"
                            size={40}
                            color="green"
                          />
                        </WhatsappShareButton>
                        <TwitterShareButton title="helo" url={shareUrl}>
                          <FaTwitterSquare
                            className="p-1"
                            size={40}
                            color="skyblue"
                          />
                        </TwitterShareButton>
                      </div>
                      <div className="flex items-center ">
                        <small>by</small>
                        <div className="ml-2 w-10 h-10 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <h2 className="font-medium title-font ml-2 text-gray-900 text-lg">
                          {blogData?.attributes?.author}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 md:col-span-12">
                <div className="h-full">
                  <div className="p-4 md:w-full">
                    <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                      <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-10 h-10"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                          The Catalyzer
                        </h2>
                        <p className="leading-relaxed text-base">
                          Blue bottle crucifix vinyl post-ironic four dollar
                          toast vegan taxidermy. Gastropub indxgo juice poutine.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
