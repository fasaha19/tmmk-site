"use client";
import { Layout } from "@/components/layout.component";
import { useEffect, useState } from "react";
import Link from "next/link";
import ListCard from "@/components/listCard.component";
import { AppConfig } from "@config/config";
import RequestServices from "@services/apis_service";

const Wing = () => {
  let [wingData, setWingData] = useState([]);
  const service = new RequestServices();
  useEffect(() => {
    (async () => {
      const result = await fetchData();
      setWingData(result?.data.data);
    })();
  }, []);
  const fetchData = async () => {
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
