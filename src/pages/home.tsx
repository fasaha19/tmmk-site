import { AppConfig } from "@/app.config";
import { Card } from "@/components/card.component";
import { Layout } from "@/components/layout.component";
import RequestServices from "@/services/requests.services";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [featuredVideo, setFeaturedVideo] = useState([]);
  const [pressRelease, setPressRelease] = useState([]);
  const [announcements, setAnnouncements] = useState<any>();

  const fetchBlogData = async () => {
    const service = new RequestServices();
    return await service.getRequest(AppConfig.routes.blog.top4blog);
  };
  const fetchFeaturedVideo = async () => {
    const service = new RequestServices();
    return await service.getRequest(AppConfig.routes.featuredVideo);
  };
  const fetchPressRelease = async () => {
    const service = new RequestServices();
    return await service.getRequest(AppConfig.routes.pressRelease.allBlogs);
  };
  const fetchAnnouncements = async () => {
    const service = new RequestServices();
    return await service.getRequest(AppConfig.routes.announcements);
  };

  useEffect(() => {
    (async () => {
      const result = await fetchBlogData();
      setBlogs(result?.data.data);

      const featuredVideos = await fetchFeaturedVideo();
      setFeaturedVideo(featuredVideos?.data.data);

      const pressReleaseData = await fetchPressRelease();
      setPressRelease(pressReleaseData?.data.data);

      const announcementsData = await fetchAnnouncements();
      setAnnouncements(announcementsData?.data.data);
    })();
  }, []);

  return (
    <>
      <Layout>
        <section>
          <div className="w-full h-[28rem] animate">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/QPKwJ-1YABc"
            ></iframe>
          </div>
        </section>

        {/* blogs */}
        <div className="flex  mt-16 items-end justify-between">
          <h1>Featured blogs</h1>
          <Link href={`allBlog/blog`}>
            <h6 className="underline">View all</h6>
          </Link>{" "}
        </div>

        <section className="grid grid-auto-fit-xs gap-4 mt-4">
          {blogs.length > 0
            ? blogs.map((item: any) => (
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

        {/* video */}
        <section className="mt-16">
          <h1>Featured videos</h1>
          <div className="grid grid-auto-fit-xs gap-4 mt-4">
            {featuredVideo.length > 0
              ? featuredVideo.map((item: any) => (
                  <div key={item?.id}>
                    <iframe
                      className="w-full"
                      src={item?.attributes?.featuredYoutubeLink}
                    ></iframe>
                  </div>
                ))
              : [1, 2, 3].map((i) => (
                  <div className="animate h-[10rem]" key={i}></div>
                ))}
          </div>
        </section>

        {/* press release */}
        <section className="mt-16">
          <div className="grid grid-auto-fit gap-8">
            <div className="flex flex-col">
              <div className="flex items-end justify-between">
                <h1>Press Release</h1>
                <Link href={`allBlog/pressRelease`}>
                  <h6 className="underline">View all</h6>
                </Link>
              </div>{" "}
              <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-4 mt-4">
                {pressRelease.length > 0
                  ? pressRelease?.map((item: any) => (
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
              </div>
            </div>
            <div className="flex flex-col">
              <h1>Announcements</h1>
              <div className="flex flex-col border border-1 p-6 shadow-md">
                {announcements?.map((item: any) => (
                  <ReactMarkdown
                    key={item.id}
                    transformImageUri={(src) => {
                      return AppConfig.host + src;
                    }}
                  >
                    {item.attributes.announcementMsg}
                  </ReactMarkdown>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
