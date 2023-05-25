import { Layout } from "@/components/layout.component";
import { useEffect, useState } from "react";
import RequestServices from "@/services/requests.services";
import { AppConfig } from "@/app.config";
import Link from "next/link";

const Wing = () => {
  let [wingData, setWingData] = useState([]);
  const hostUrl = AppConfig.host;
  useEffect(() => {
    (async () => {
      const result = await fetchData();
      setWingData(result?.data.data);
      console.log(result?.data.data);
    })();
  }, []);
  const fetchData = async () => {
    const service = new RequestServices();
    return await service.getRequest(AppConfig.routes.wing);
  };
  return (
    <>
      <Layout>
        <section className="grid grid-auto-fit mt-8 gap-6">
          {wingData.map((item: any, index: number) => (
            <Link href={`/wing/${item.id}`} key={item?.id}>
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

export default Wing;
