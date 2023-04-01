import { AppConfig } from "@/app.config";
import { Layout } from "@/components/layout.component";
import RequestServices from "@/services/requests.services";
import Link from "next/link";
import { useEffect, useState } from "react";

const PressRelease = () => {
  const [release, setRelease] = useState<any>();
  const [banner, setBanner] = useState<any>();
  const [pdf, setPdf] = useState<any>();
  const hostUrl = AppConfig.host;

  const fetchEvent = async () => {
    const service = new RequestServices();
    return await service.getRequest(AppConfig.routes.pressRelease.allBlogs);
  };

  const fetchEventMedia = async () => {
    const service = new RequestServices();
    return await service.getRequest(AppConfig.routes.pressMedia);
  };

  useEffect(() => {
    (async () => {
      const result = await fetchEvent();
      setRelease(result?.data.data);
      const media = await fetchEventMedia();
      setBanner(
        media?.data.data.attributes.bannerImage.data.attributes.formats.medium
          .url
      );
      setPdf(media?.data.data.attributes.pdf.data.attributes.url);
      console.log(pdf);
    })();
  }, []);

  return (
    <Layout>
      <section className="mt-16">
        <img
          className="object-cover shadow-lg object-center rounded w-full h-[25rem]"
          alt="hero"
          src={banner ? hostUrl + banner : "https://dummyimage.com/720x600"}
        />
      </section>
      <section className="mt-16 ">
        <h1 className="text-center">Press release</h1>
        <div className="grid grid-auto-fit gap-6 mt-8">
          <section className="text-grey-50 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="-my-8 divide-y-2 divide-gray-200">
                {release?.map((item: any) => (
                  <div
                    className="py-8 flex flex-wrap md:flex-nowrap"
                    key={item.id}
                  >
                    <div className="md:w-32 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <span className="mt-1 text-gray-500 text-sm">
                        12 Jun 2019
                      </span>
                    </div>
                    <div className="md:flex-grow">
                      <h2 className="text-2xl font-medium text-black title-font mb-2">
                        {item.attributes.pressRelease.title}
                      </h2>
                      <p className="leading-relaxed">
                        {item.attributes.pressRelease.description}
                      </p>
                      <Link
                        href={`blog/pressRelease/${item.id}`}
                        className="text-indigo-400 inline-flex items-center mt-4"
                      >
                        see more
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="bg-gray-200 h-full">
            {pdf ? (
              <iframe
                src={hostUrl + pdf}
                className="grid place-content-center h-full w-full"
              ></iframe>
            ) : (
              "No Release yet"
            )}
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default PressRelease;
