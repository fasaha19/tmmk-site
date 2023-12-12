"use client";
import { useGlobalContext } from "@context/context";

import Button from "@/components/button.component";
import { Card } from "@/components/card.component";
import { Layout } from "@/components/layout.component";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { AppConfig } from "@config/config";
import RequestServices from "@services/apis_service";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [featuredVideo, setFeaturedVideo] = useState([]);
  const [pressRelease, setPressRelease] = useState([]);
  const [announcements, setAnnouncements] = useState<any>();
  const [sliders, setSlider] = useState<any>([]);
  const [profVideo, setProfVideo] = useState<any>("");
  const service = new RequestServices();
  const { fieldNames }: any = useGlobalContext();
  const fetchBlogData = async () => {
    return await service.getRequest(AppConfig.routes.blog.top4blog);
  };
  const fetchFeaturedVideo = async () => {
    return await service.getRequest(AppConfig.routes.featuredVideo);
  };
  const fetchPressRelease = async () => {
    return await service.getRequest(AppConfig.routes.pressRelease.allBlogs);
  };
  const fetchAnnouncements = async () => {
    return await service.getRequest(AppConfig.routes.announcements);
  };

  const fetchSliders = async () => {
    return await service.getRequest(AppConfig.routes.sliders);
  };

  const fetchProfVideoLink = async () => {
    return await service.getRequest(AppConfig.routes.profVideo);
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

      const sliderData = await fetchSliders();
      setSlider(sliderData?.data?.data);

      const profVideoLink = await fetchProfVideoLink();
      setProfVideo(profVideoLink?.data?.data?.attributes);
    })();
  }, []);

  return (
    <>
      <Layout>
        <section className="grid grid-auto-fit-xs gap-4 mt-4">
          <div className="w-full h-[28rem] bg-zinc-100">
            <Swiper
              spaceBetween={30}
              effect={"fade"}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[EffectFade, Navigation, Pagination]}
              className="mySwiper"
            >
              {sliders.map((slider: any) => (
                <SwiperSlide key={slider?.id}>
                  <img
                    className="object-cover h-full"
                    src={
                      AppConfig.host +
                      slider?.attributes?.sliderMedia?.data?.attributes?.url
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full h-[28rem] animate">
            {profVideo ? (
              <iframe className="w-full h-full" src={profVideo.link}></iframe>
            ) : (
              <></>
            )}
          </div>
        </section>

        {/* blogs */}
        <div className="flex  mt-16 items-end justify-between flex-wrap">
          <h1>{fieldNames?.["Featured blogs"]}</h1>
          <Link href={`allBlog/blog`}>
            <Button name={fieldNames?.["View all"]} />
            {/* <h6 className="viewall-btn">{fieldNames?.["View all"]}</h6> */}
          </Link>{" "}
        </div>

        <section className="grid grid-auto-fit-xs gap-4 mt-4">
          {blogs?.length > 0
            ? blogs
                .map((item: any) => (
                  <Card
                    blogData={item.attributes}
                    blogId={item.id}
                    key={item.id}
                    blogType={item.attributes?.blogType}
                  />
                ))
                .reverse()
            : [1, 2, 3].map((i) => (
                <div className="animate h-[20rem]" key={i}></div>
              ))}
        </section>

        {/* video */}
        <section className="mt-16">
          <h1>{fieldNames?.["Featured blogs"]}</h1>
          <div className="grid grid-auto-fit-xs gap-4 mt-4">
            {featuredVideo?.length > 0
              ? featuredVideo.map((item: any) => (
                  <div key={item?.id}>
                    <iframe
                      className="w-full"
                      src={item?.attributes?.featuredYoutubeLink && ""}
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
              <div className="flex items-end justify-between flex-wrap">
                <h1>{fieldNames?.["pressRelease"]}</h1>
                <Link href={`allBlog/pressRelease`}>
                  <Button name={fieldNames?.["View all"]} />
                </Link>
              </div>{" "}
              <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-4 mt-4">
                {pressRelease?.length > 0
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
              <h1>{fieldNames?.["Announcements"]}</h1>
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
}

export default Home;
