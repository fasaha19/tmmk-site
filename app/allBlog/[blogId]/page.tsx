"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@context/context";
import { AppConfig } from "@config/config";
import { Layout } from "@/components/layout.component";
import { Card } from "@/components/card.component";
import RequestServices from "@services/apis_service";
import { FaEraser, FaSearch } from "react-icons/fa";

export default function BlogType({ params }: any) {
  let blogType: any;

  const { fieldNames }: any = useGlobalContext();
  let [blogData, setBlogData] = useState<any>([]);
  let [filteredData, setFilteredData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const service = new RequestServices();

  blogType = params["blogId"];

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      var filtered = blogData.filter((item: any) => {
        const { attributes } = item;
        const { title, createdAt, author } = attributes;
        return (
          title?.toLowerCase().includes(searchTerm) ||
          createdAt?.toLowerCase().includes(searchTerm) ||
          author?.toLowerCase().includes(searchTerm)
        );
      });
      filtered ? setFilteredData(filtered) : setSearchTerm("");
    }
  };
  useEffect(() => {
    (async () => {
      // const comment = router.query.comment as string;
      const result = await fetchData();
      setBlogData(result?.data?.data);
    })();
  }, []);
  const fetchData = async () => {
    return await service.getRequest(
      `${AppConfig.routes?.[blogType]?.allBlogs}&pagination[page]=1&pagination[pageSize]=100&sort=updatedAt:DESC`
    );
  };
  return (
    <>
      <Layout>
        <section>
          <div className="flex justify-between items-start  md:flex-row flex-col ">
            <h1>{fieldNames[blogType] || ""}</h1>
            <div className="flex items-center md:w-auto w-full ">
              <div className="flex items-center p-2.5 border border-black rounded-md md:w-auto w-full">
                <input
                  className="border-0 outline-none md:w-[18rem] w-full"
                  type="text"
                  placeholder={`${fieldNames["search"] ?? ""} . . .`}
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                {searchTerm != "" ? (
                  <span onClick={() => setSearchTerm("")}>
                    <FaEraser className="cursor-pointer text-gray-900" />
                  </span>
                ) : (
                  <FaSearch className="cursor-pointer text-gray-900" />
                )}
              </div>
            </div>
          </div>
          <section className="grid grid-auto-fit-xs md:grid-cols-3 gap-4 mt-4 ">
            {searchTerm
              ? filteredData?.length > 0
                ? filteredData.map((item: any) => (
                    <Card
                      blogData={item.attributes}
                      blogId={item.id}
                      key={item.id}
                      blogType={item.attributes?.blogType}
                    />
                  ))
                : [1, 2, 3, 4].map((i) => (
                    <div className="animate h-[20rem]" key={i}></div>
                  ))
              : blogData?.length > 0
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
