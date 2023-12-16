import { useRouter } from "next/navigation";

const HorizontalTextMarquee = ({ newsItems }: any) => {
  const router = useRouter();

  return (
    <>
      {newsItems ? (
        <div className="position-relative marquee-container">
          <div className="marquee ">
            {newsItems?.map((item: any, idx: any) => (
              <span
                key={item?.marqueeText}
                onClick={() => {
                  router.push(`/blog/${item?.id}`, { scroll: false });
                }}
              >
                {idx + 1 + ". " + item?.attributes?.title || ""}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HorizontalTextMarquee;
