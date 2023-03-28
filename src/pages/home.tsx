import AppConfig from "@/app.config";
import { Card } from "@/components/card.component";
import { Layout } from "@/components/layout.component";
import RequestServices from "@/services/requests.services";
import { useEffect, useState } from "react";

export const Home = () => {
  let [blogs, setBlogs] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await fetchData();
      setBlogs(result?.data.data);
    })();
  }, []);
  const fetchData = async () => {
    const service = new RequestServices();
    return await service.getRequest(AppConfig.routes.blogs.allBlogs);
  };
  return (
    <>
      <Layout>
        <section>
          <video height="240" controls className="mx-auto w-full h-[35rem]">
            <source src="movie.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>

        {/* blogs */}
        <section className="grid grid-auto-fit-xs gap-4 mt-16">
          {blogs.map((item: any) => (
            <Card
              blogData={item.attributes}
              blogId={item.attributes?.blog?.id}
              key={item.id}
            />
          ))}
        </section>

        {/* video */}
        <section className="mt-16">
          <h1>Featured videos</h1>
          <div className="grid grid-auto-fit-xs gap-16">
            <Card />
            <Card />
            <Card />
          </div>
        </section>

        {/* press release */}
        <section className="mt-16">
          <div className="grid grid-auto-fit gap-6">
            <div className="flex flex-col">
              <h1>Press Release</h1>
              <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-4">
                <Card />
                <Card />
                <Card />
                <Card />
              </div>
            </div>
            <div className="flex flex-col">
              <h1>Announcements</h1>
              <div className="flex flex-col border border-1 p-6">
                <ul>
                  <li className="py-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus, neque?
                  </li>
                  <li className="py-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus, neque?
                  </li>
                  <li className="py-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus, neque?
                  </li>
                  <li className="py-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus, neque?
                  </li>
                  <li className="py-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus, neque?
                  </li>
                  <li className="py-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus, neque?
                  </li>
                  <li className="py-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus, neque?
                  </li>
                  <li className="py-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus, neque?
                  </li>
                  <li className="py-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus, neque?
                  </li>
                  <li className="py-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus, neque?
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
