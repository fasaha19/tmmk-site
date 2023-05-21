import { Layout } from "@/components/layout.component";
import { useEffect, useState } from "react";
import RequestServices from "@/services/requests.services";
import { AppConfig } from "@/app.config";
import Image from "next/image";
import Link from "next/link";

const Administration = () => {
  let [administration, setAboutUs] = useState([]);
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
    return await service.getRequest(AppConfig.routes.administration);
  };
  return (
    <>
      <Layout>
        <section className="grid grid-auto-fit mt-8 gap-6">
          {administration.map((item: any, index: number) => (
            <Link href={`/administration/${item.id}`} key={item?.id}>
              <div className="card shadow  rounded-md hover:shadow-lg  flex items-center py-16 px-8 justify-center ">
                <h1>{item.attributes?.pageTitle}</h1>
              </div>
            </Link>
          ))}
        </section>
      </Layout>
    </>
  );
};

export default Administration;
