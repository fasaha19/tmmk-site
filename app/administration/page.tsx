"use client";
import { Layout } from "@/components/layout.component";
import { useEffect, useState } from "react";
import Link from "next/link";
import ListCard from "@/components/listCard.component";
import RequestServices from "@services/apis_service";
import { AppConfig } from "@config/config";

const Administration = () => {
  let [administration, setAboutUs] = useState([]);
  const service = new RequestServices();
  useEffect(() => {
    (async () => {
      const result = await fetchData();
      setAboutUs(result?.data.data);
    })();
  }, []);
  const fetchData = async () => {
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
