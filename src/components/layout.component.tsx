import { Header } from "@/components/header.component";

export const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <div className="container mx-auto p-4">{children}</div>
    </>
  );
};
