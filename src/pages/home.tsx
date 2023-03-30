import AppConfig from "@/app.config";
import { Card } from "@/components/card.component";
import { Layout } from "@/components/layout.component";
import RequestServices from "@/services/requests.services";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

export const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [featuredVideo, setFeaturedVideo] = useState([]);
  const [pressRelease, setPressRelease] = useState([]);
  const [announcements, setAnnouncements] = useState<any>();

  const fetchData = async () => {
    const service = new RequestServices();
    return await service.getRequest(AppConfig.routes.blog.allBlogs);
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
      const result = await fetchData();
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
          <iframe
            className="w-full h-[28rem]"
            src="https://www.youtube.com/embed/QPKwJ-1YABc"
          ></iframe>
        </section>

        {/* blogs */}
        <section className="grid grid-auto-fit-xs gap-4 mt-16">
          {blogs.map((item: any) => (
            <Card
              blog={item.attributes}
              blogId={item.attributes?.blog?.id}
              key={item.id}
              blogType={"blog"}
            />
          ))}
        </section>

        {/* video */}
        <section className="mt-16">
          <h1>Featured videos</h1>
          <div className="grid grid-auto-fit-xs gap-4">
            {featuredVideo.map((item: any) => (
              <div key={item?.id}>
                <iframe
                  className="w-full"
                  src={item?.attributes?.featuredYoutubeLink}
                ></iframe>
              </div>
            ))}
          </div>
        </section>

        {/* press release */}
        <section className="mt-16">
          <div className="grid grid-auto-fit gap-6">
            <div className="flex flex-col">
              <h1>Press Release</h1>
              <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-4">
                {pressRelease?.map((item: any) => (
                  <Card
                    pressRelease={item.attributes}
                    blogId={item.id}
                    key={item.id}
                    blogType={"pressRelease"}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <h1>Announcements</h1>
              <div className="flex flex-col border border-1 p-6">
                {announcements?.map((item: any) => (
                  <ReactMarkdown key={item.id}>
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
