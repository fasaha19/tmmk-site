"use client";
import { useGlobalContext } from "@context/context";
import { Layout } from "@/components/layout.component";
import { useEffect, useState } from "react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { AppConfig } from "@config/config";
import RequestServices from "@services/apis_service";
import { useRouter } from "next/navigation";
import FeaturedBlog from "@components/featured-blog.component";

function Home() {
  const router = useRouter();
  // const [featuredVideo, setFeaturedVideo] = useState([]);
  const [announcements, setAnnouncements] = useState<any>();
  const [sliders, setSlider] = useState<any>([]);
  const [profVideo, setProfVideo] = useState<any>("");
  const service = new RequestServices();
  const { fieldNames }: any = useGlobalContext();

  const fetchAnnouncements = async () => {
    return await service.getRequest(AppConfig.routes.announcements);
  };

  const featuredBlogs = async () => {
    return await service.getRequest(AppConfig.routes.featuredBlogs);
  };

  const fetchProfVideoLink = async () => {
    return await service.getRequest(AppConfig.routes.profVideo);
  };

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        // const featuredVideos = await fetchFeaturedVideo();
        // setFeaturedVideo(featuredVideos?.data.data);
        const response = await fetchAnnouncements();
        setAnnouncements(response?.data.data);

        const sliderData = await featuredBlogs();
        setSlider(sliderData?.data.data);

        const profVideoLink = await fetchProfVideoLink();
        setProfVideo(profVideoLink?.data?.data?.attributes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHomePageData();
    // return () => {
    //   fetchHomePageData();
    // };
  }, []);

  return (
    <>
      <Layout>
        <section className="grid grid-auto-fit-xs gap-4 md:h-[22rem]">
          <div className="w-full  bg-zinc-100">
            <Swiper
              spaceBetween={30}
              effect={"coverflow"}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[EffectFade, Navigation, Pagination]}
              className="mySwiper"
            >
              {sliders.map((slider: any) => (
                <SwiperSlide
                  onClick={() => {
                    console.log("cli");

                    router.push(`/blog/${slider?.id}`, { scroll: false });
                  }}
                  key={slider?.id}
                >
                  <div className="relative">
                    <img
                      className="object-cover h-[22rem]"
                      src={
                        AppConfig.host +
                        slider?.attributes?.image?.data?.attributes?.url
                      }
                    />
                    <div className="absolute bottom-0 bg-[#23232378] p-8 w-full">
                      <div className="flex align-middle justify-center">
                        <p className="text-white text-ellipsis line-clamp-2">
                          {slider?.attributes?.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full animate">
            {profVideo ? (
              profVideo.image.data != null ? (
                <img
                  className="w-full md:h-[22rem] object-cover"
                  src={AppConfig.host + profVideo.image?.data?.attributes.url}
                  alt="tmmk-media"
                />
              ) : (
                <iframe className="w-full h-full" src={profVideo.link}></iframe>
              )
            ) : (
              <></>
            )}
          </div>
        </section>

        {/* blogs */}
        <FeaturedBlog
          title={fieldNames?.["Featured blogs"]}
          viewAllTxt={fieldNames?.["View all"]}
          navLink="blog"
        />

        {/* Press Release */}
        <FeaturedBlog
          title={fieldNames?.["pressRelease"]}
          viewAllTxt={fieldNames?.["View all"]}
          navLink="pressRelease"
        />

        {/* News */}
        <FeaturedBlog
          title={fieldNames?.["news"]}
          viewAllTxt={fieldNames?.["View all"]}
          navLink="news"
        />

        {/* Makkal Urimai */}
        <FeaturedBlog
          title={fieldNames?.["makkalUrimai"]}
          viewAllTxt={fieldNames?.["View all"]}
          navLink="makkalUrimai"
        />

        {/* Arasial Kalam */}
        <FeaturedBlog
          title={fieldNames?.["arasiyalKalam"]}
          viewAllTxt={fieldNames?.["View all"]}
          navLink="arasiyalKalam"
        />

        {/* HQ Announcements */}
        <FeaturedBlog
          title={fieldNames?.["hqAnnouncement"]}
          viewAllTxt={fieldNames?.["View all"]}
          navLink="hqAnnouncement"
        />

        {/* video */}
        {/* <section className="mt-16">
          <h1>{fieldNames?.["Featured video"]}</h1>
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
        </section> */}
        {/* Announcement*/}
        {/* <section className="mt-16">
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
        </section> */}
      </Layout>
    </>
  );
}

export default Home;
