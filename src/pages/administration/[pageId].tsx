import { AppConfig } from "@/app.config";
import { Layout } from "@/components/layout.component";
import Profile from "@/components/profile.component";
import RequestServices from "@/services/requests.services";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaFacebookF,
  FaPhone,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";

export default function PageType() {
  const router = useRouter();
  let pageId: any;

  let [blogData, setBlogData] = useState<any>([]);

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
    const service = new RequestServices();
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
