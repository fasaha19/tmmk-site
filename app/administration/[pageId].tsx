import { Layout } from "@/components/layout.component";
import Profile from "@/components/profile.component";
import RequestServices from "@services/apis_service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PageType() {
  const router = useRouter();
  let pageId: any;

  let [blogData, setBlogData] = useState<any>([]);
  const service = new RequestServices();

  useEffect(() => {
    (async () => {
      // const comment = router.query.comment as string;
      pageId = router.query.pageId as string;
      const result = await fetchData();
      setBlogData(result?.data?.data?.attributes);
      console.log(blogData);
    })();
  }, [pageId, !blogData ? blogData : null]);
  const fetchData = async () => {
    return await service.getRequest(
      `administrations/${pageId}?populate[0]=profileDetail.image&populate[1]=profileDetail.links`
    );
  };
  return (
    <>
      <Layout>
        <h1 className="text-center">{blogData?.pageTitle}</h1>
        <hr />
        <section className="mt-5">
          <h1>Members</h1>
          <div className="grid grid-auto-fit gap-5">
            {blogData?.profileDetail?.map((profile: any, idx: any) => (
              <div key={idx}>
                <Profile profile={profile} idx={idx} />
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
