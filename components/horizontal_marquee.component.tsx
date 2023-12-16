import { useRouter } from "next/navigation";

const HorizontalTextMarquee = ({ newsItems }: any) => {
  const router = useRouter();

  return (
    <>
      {newsItems ? (
        <div className="relative marquee-container">
          <div className="marquee">
            {newsItems?.map((item: any, idx: any) => (
              <div
                className=""
                key={item?.id}
                onClick={() => {
                  router.push(`/blog/${item?.id}`, { scroll: false });
                }}
              >
                {idx + 1 + ". " + item?.attributes?.title || ""}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HorizontalTextMarquee;
