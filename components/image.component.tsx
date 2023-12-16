import Image from "next/image";

export const CommonImage = () => {
  return (
    <Image
      className="lg:h-48 md:h-36 w-full object-cover object-center"
      src="https://dummyimage.com/720x400"
      alt="blog"
      fill
    />
  );
};
