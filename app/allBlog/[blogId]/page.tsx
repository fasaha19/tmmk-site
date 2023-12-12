"use client";
import { Layout } from "@/components/layout.component";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/card.component";
import RequestServices from "@services/apis_service";
import { AppConfig } from "@config/config";

export default function BlogType({ params }: any) {
  let blogType: any;

  let [blogData, setBlogData] = useState<any>([]);
  const service = new RequestServices();

  blogType = params["blogId"];

  useEffect(() => {
    (async () => {
      // const comment = router.query.comment as string;
      const result = await fetchData();
      setBlogData(result?.data?.data);
    })();
  }, []);
  const fetchData = async () => {
    return await service.getRequest(
      `${AppConfig.routes?.[blogType]?.allBlogs}&pagination[page]=1&pagination[pageSize]=100`
    );
  };
  return (
    <>
      <Layout>
        <section>
          <h1>{blogType}</h1>
          <section className="grid grid-auto-fit-xs md:grid-cols-4 gap-4 mt-4 ">
            {blogData?.length > 0
              ? blogData.map((item: any) => (
                  <Card
                    blogData={item.attributes}
                    blogId={item.id}
                    key={item.id}
                    blogType={item.attributes?.blogType}
                  />
                ))
              : [1, 2, 3, 4].map((i) => (
                  <div className="animate h-[20rem]" key={i}></div>
                ))}
          </section>
        </section>
      </Layout>
    </>
  );
}
