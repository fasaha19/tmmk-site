"use client";
import { Layout } from "@/components/layout.component";
import { useEffect, useState } from "react";
import Image from "next/image";
import RequestServices from "@services/apis_service";
import { AppConfig } from "@config/config";

const About = () => {
  let [aboutUs, setAboutUs] = useState([]);
  const hostUrl = AppConfig.host;
  const service = new RequestServices();

  useEffect(() => {
    (async () => {
      const result = await fetchData();
      setAboutUs(result?.data.data);
      console.log(result?.data.data);
    })();
  }, []);
  const fetchData = async () => {
    return await service.getRequest(AppConfig.routes.aboutUs);
  };
  return (
    <>
      <Layout>
        {aboutUs.map((item: any, index: number) => (
          <section className="grid grid-auto-fit mt-8 gap-6" key={item?.id}>
            <div className="col-span-6 md:col-span-2 lg:col-span-1 aspect-square w-full animate relative">
              <Image
                fill
                className="object-cover transition-all ease-in-out delay-1000"
                alt="about tmmk"
                src={`${
                  item.attributes?.image.data.attributes.url
                    ? hostUrl + item.attributes?.image.data.attributes.url
                    : "https://dummyimage.com/720x600"
                }`}
              />
            </div>
            <div className="flex flex-col justify-center ">
              <h1>{item.attributes?.title}</h1>
              <p>{item.attributes?.description}</p>
            </div>
          </section>
        ))}
      </Layout>
    </>
  );
};

export default About;
