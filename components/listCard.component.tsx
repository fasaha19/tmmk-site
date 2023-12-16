import { AppConfig } from "@config/config";

const ListCard = ({ data }: any) => {
  let imgUrl = data?.icon?.data?.attributes?.url;

  const fallBackUrl = "https://img.icons8.com/ios-filled/50/external-link.png";

  return (
    <div className="card shadow-lg bg-zinc-100  rounded-md hover:shadow-lg gap-12  flex items-center py-8 px-8 w-full  h-[18rem] justify-center">
      <img
        width="50"
        height="50"
        src={imgUrl != undefined ? AppConfig.host + imgUrl : fallBackUrl}
        alt="external-link"
      />{" "}
      <h1 className="line-clamp-2">{data?.pageTitle}</h1>
    </div>
  );
};
export default ListCard;
