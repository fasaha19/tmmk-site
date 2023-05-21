import { AppConfig } from "@/app.config";
import { Layout } from "@/components/layout.component";
import RequestServices from "@/services/requests.services";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaFacebook, FaFacebookF, FaPhone, FaTwitter } from "react-icons/fa";
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
              <div className="card shadow-md py-16 px-8 rounded-md" key={idx}>
                <div className="flex items-center justify-around">
                  <img
                    src={AppConfig.host + profile?.image?.data?.attributes?.url}
                    className=" object-cover w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                  />
                  <div className="w-1/2">
                    <h1 className="font-extrabold">{profile?.name}</h1>
                    <h2 className="flex">
                      <FaPhone
                        className="p-1 pl-0 "
                        size={30}
                        color="#707070"
                      />{" "}
                      {profile?.phoneNo}
                    </h2>
                    <h2 className="flex">
                      <FaRegEnvelope
                        className="p-1 pl-0"
                        size={30}
                        color="#707070"
                      />{" "}
                      {profile?.email}
                    </h2>
                  </div>
                  <div className="flex flex-col items-center justify-evenly">
                    <Link href={profile?.links?.twitter} target="_blank">
                      <FaTwitter
                        className="p-1 pl-0 m-2 hover:scale-110"
                        size={30}
                        color="skyblue"
                      />
                    </Link>{" "}
                    <Link href={profile?.links?.facebook} target="_blank">
                      <FaFacebookF
                        className="p-1 pl-0 m-2 hover:scale-110"
                        size={30}
                        color="navy"
                      />{" "}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
