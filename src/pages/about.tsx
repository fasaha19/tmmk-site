import { Layout } from "@/components/layout.component";
import { useEffect, useState } from "react";
import RequestServices from "@/services/requests.services";
import AppConfig from "@/app.config";

const About = () => {
  let [aboutUs, setAboutUs] = useState([]);
  const hostUrl = AppConfig.host;
  useEffect(() => {
    (async () => {
      const result = await fetchData();
      setAboutUs(result?.data.data);
      console.log(result?.data.data);
    })();
  }, []);
  const fetchData = async () => {
    const service = new RequestServices();
    return await service.getRequest(AppConfig.routes.aboutUs);
  };
  return (
    <>
      <Layout>
        {aboutUs.map((item: any, index: number) => (
          <section className="grid grid-auto-fit mt-8 gap-6" key={item?.id}>
            <img
              className={`object-cover shadow-md object-center rounded md:order-${
                index % 2 == 0 ? "2" : "0"
              }`}
              alt="hero"
              src={`${
                item.attributes?.image.data.attributes.url
                  ? hostUrl + item.attributes?.image.data.attributes.url
                  : "https://dummyimage.com/720x600"
              }`}
            />
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
