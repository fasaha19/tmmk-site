import { Layout } from "@/components/layout.component";
import { useEffect, useState } from "react";
import RequestServices from "@/services/requests.services";
import { AppConfig } from "@/app.config";
import Link from "next/link";
import ListCard from "@/components/listCard.component";

const Administration = () => {
  let [administration, setAboutUs] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await fetchData();
      setAboutUs(result?.data.data);
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
              <ListCard data={item.attributes} />
            </Link>
          ))}
        </section>
      </Layout>
    </>
  );
};

export default Administration;
