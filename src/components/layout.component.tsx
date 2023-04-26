import { Footer } from "@/components/footer.component";
import { Header } from "@/components/header.component";
import Head from "next/head";

export const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <Head>
        <title>TMMK</title>
        <meta name="description" content="Tamil nadu muslim munnetra kalagam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://members.tmmk.info/assets/images/flag_tmmk.jpg"
        />
      </Head>
      <div className="container mx-auto p-4">{children}</div>
      <Footer />
    </>
  );
};
