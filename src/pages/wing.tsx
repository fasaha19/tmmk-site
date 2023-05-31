import { Layout } from "@/components/layout.component";
import { useEffect, useState } from "react";
import RequestServices from "@/services/requests.services";
import { AppConfig } from "@/app.config";
import Link from "next/link";
import ListCard from "@/components/listCard.component";

const Wing = () => {
  let [wingData, setWingData] = useState([]);
  const hostUrl = AppConfig.host;
  useEffect(() => {
    (async () => {
      const result = await fetchData();
      setWingData(result?.data.data);
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
              <ListCard data={item.attributes} />
            </Link>
          ))}
        </section>
      </Layout>
    </>
  );
};

export default Wing;
