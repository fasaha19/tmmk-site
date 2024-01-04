"use client";
import { useEffect, useRef, useState } from "react";
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
  let [page, setPage] = useState<any>(1);
  let [filteredData, setFilteredData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchMore, setFetchMore] = useState(true);

  const service = new RequestServices();

  blogType = params["blogId"];

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (fetchMore) {
            setPage(page++);
            setBlogs();
          }
          console.log("hi ");
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

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
      setBlogs();
    })();
  }, []);
  const setBlogs = async () => {
    const result = await fetchData();
    setBlogData((prevMsgs: any) => [...prevMsgs, ...result?.data?.data]);
    setFetchMore(
      !(result?.data.meta["pagination"]["total"] == blogData.length)
    );
    console.log(result?.data.meta["pagination"]["total"]);
    console.log(blogData.length);
  };
  const fetchData = async () => {
    if (blogType == "blog") {
      return await service.getRequest(
        `blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=3&sort=updatedAt:DESC`
      );
    } else {
      return await service.getRequest(
        `${AppConfig.routes?.[blogType]?.allBlogs}&pagination[page]=${page}&pagination[pageSize]=3&sort=updatedAt:DESC`
      );
    }
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
        <div ref={observerTarget}></div>
      </Layout>
    </>
  );
}
