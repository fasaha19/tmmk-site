import { AppConfig } from "@/app.config";
import RequestServices from "@/services/requests.services";
import { useRouter } from "next/router";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Layout } from "@/components/layout.component";

export default function BlogDetail(props: any) {
  const pageData = props.pageData;
  const router = useRouter();
  let { blogType }: any = props.params;
  const hostUrl = AppConfig.host;
  const shareUrl = AppConfig.siteUrl + router.asPath;

  // let [blogData, setBlogData] = useState<any>({});
  // useEffect(() => {
  //   (async () => {
  //     id = router.query.id as string;
  //     blogType = router.query.blogType as string;
  //     const result = await fetchData();
  //     setBlogData(result?.data.data);
  //   })();
  // }, [router, blogData]);
  // const fetchData = async () => {
  //   const service = new RequestServices();
  //   return await service.getRequest(
  //     `${AppConfig.routes?.blog?.blogById}${id}?populate=*&populate=${blogType}.image`
  //   );
  // };
  return (
    <>
      <Layout>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-col">
            <div className="lg:w-4/6 mx-auto">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src={`${
                    pageData?.attributes?.image?.data?.attributes?.url
                      ? hostUrl +
                        pageData?.attributes?.image?.data?.attributes?.url
                      : "https://dummyimage.com/1200x500"
                  }
               `}
                />
              </div>
              <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-10 h-10"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="flex flex-col items-center text-center justify-center">
                    <h3 className="font-medium title-font mt-4 text-gray-900 text-lg">
                      {pageData?.attributes?.author}
                    </h3>
                    <div className="w-12 h-1 bg-black-500 rounded mt-2 mb-4"></div>
                    
                  </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <h1> {pageData?.attributes?.title}</h1>
                  <p className="leading-relaxed text-lg mb-4">
                    {pageData?.attributes?.description}
                  </p>
                  <ReactMarkdown
                    transformImageUri={(src) => {
                      return AppConfig.host + src;
                    }}
                  >
                    {pageData?.attributes?.body}
                  </ReactMarkdown>
                  <div className="h-[1.5px] bg-[#999999]"></div>
                  <span className="mt-4">Share</span>
                  <div className="flex justify-start">
                    <FacebookShareButton
                      url={shareUrl}
                      quote={"Dummy text!"}
                      hashtag="#muo"
                    >
                      <FaFacebookSquare
                        className="p-1 pl-0"
                        size={40}
                        color="navy"
                      />
                    </FacebookShareButton>
                    <WhatsappShareButton url={shareUrl}>
                      <FaWhatsappSquare
                        className="p-1"
                        size={40}
                        color="green"
                      />
                    </WhatsappShareButton>
                    <TwitterShareButton title="helo" url={shareUrl}>
                      <FaTwitterSquare
                        className="p-1"
                        size={40}
                        color="skyblue"
                      />
                    </TwitterShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const service = new RequestServices();
  const resp = await service.getRequest(AppConfig.ssgFetchBlogUrl);

  const routes: any[] = resp?.data.data;

  const result = routes.map((item) => {
    return {
      params: {
        id: item.id.toString(),
        blogType: item?.attributes?.blogType,
      },
    };
  });

  return {
    paths: result,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { params } = context;

  const service = new RequestServices();
  const response = await service.getRequest(
    `${AppConfig.routes.blog?.blogById}${params.id}?populate=*`
  );

  return {
    props: {
      pageData: response?.data.data,
      params: params,
    },
  };
}
