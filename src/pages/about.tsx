import Head from "next/head";
import { Layout } from "@/components/layout.component";
import { useEffect } from "react";
import RequestServices from "@/services/requests.services";
import AppConfig from "@/app.config";

const About = () => {
  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = async () => {
    const service = new RequestServices();
    return await service.getRequest(AppConfig.routes.aboutUs)
  }
  return (
    <>
      <Layout>
        <section className="grid grid-auto-fit mt-16 gap-6">
          <img
            className="object-cover shadow-md object-center rounded md:order-0"
            alt="hero"
            src="https://dummyimage.com/720x600"
          />
          <div className="flex flex-col justify-center ">
            <h1>Organization</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              rerum dignissimos commodi perspiciatis sequi laboriosam enim hic
              illo, libero dolorum et pariatur ipsam id distinctio. Error
              corrupti nisi eligendi, tempora esse fugiat voluptatum beatae sed
              sint similique corporis explicabo nostrum soluta, quia sit ad
              voluptatem placeat sunt, ullam odio rerum!
            </p>
          </div>
        </section>

        <section className="grid grid-auto-fit mt-16 gap-6">
          <img
            className="object-cover shadow-md object-center rounded md:order-2"
            alt="hero"
            src="https://dummyimage.com/720x600"
          />
          <div className="flex flex-col justify-center ">
            <h1>vision</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              rerum dignissimos commodi perspiciatis sequi laboriosam enim hic
              illo, libero dolorum et pariatur ipsam id distinctio. Error
              corrupti nisi eligendi, tempora esse fugiat voluptatum beatae sed
              sint similique corporis explicabo nostrum soluta, quia sit ad
              voluptatem placeat sunt, ullam odio rerum!
            </p>
          </div>
        </section>

        <section className="grid grid-auto-fit mt-16 gap-6">
          <img
            className="object-cover shadow-md object-center rounded md:order-0"
            alt="hero"
            src="https://dummyimage.com/720x600"
          />
          <div className="flex flex-col justify-center ">
            <h1>Mission</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              rerum dignissimos commodi perspiciatis sequi laboriosam enim hic
              illo, libero dolorum et pariatur ipsam id distinctio. Error
              corrupti nisi eligendi, tempora esse fugiat voluptatum beatae sed
              sint similique corporis explicabo nostrum soluta, quia sit ad
              voluptatem placeat sunt, ullam odio rerum!
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
