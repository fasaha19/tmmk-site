import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "./button.component";
import { Card } from "./card.component";
import RequestServices from "@services/apis_service";
import { AppConfig } from "@config/config";

const FeaturedBlog = ({ title, viewAllTxt, navLink }: any) => {
  const service = new RequestServices();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchBlogData();
        setBlogs(response?.data.data);
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };
    //cleanup fucntion to avaoid re-fetch
    // return () => {
    getData();
    // };
  }, []);

  const fetchBlogData = async () =>
    await service.getRequest(AppConfig.routes[navLink].top4blog);
  return (
    <div className=" px-4 py-8 nm-flat-red-500 mt-12 rounded-md shadow-lg">
      <div className="flex items-end justify-between flex-wrap">
        <h1>{title}</h1>
        <Link href={`allBlog/${navLink}`}>
          <Button name={viewAllTxt} />
        </Link>
      </div>

      <section className="grid md:grid-cols-3 grid-auto-fit-xs gap-4 mt-4">
        {blogs?.length > 0
          ? blogs
              .slice(0, 3)
              .map((item: any) => (
                <Card
                  blogData={item.attributes}
                  blogId={item.id}
                  key={item.id}
                  blogType={item.attributes?.blogType}
                />
              ))
          : [1, 2, 3].map((i) => (
              <div className="animate h-[20rem]" key={i}></div>
            ))}
      </section>
    </div>
  );
};

export default FeaturedBlog;
