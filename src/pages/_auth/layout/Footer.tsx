import Container from "@/components/ui/Container";
import Image from "@/components/ui/Image";
import React from "react";

const Footer = () => {
  return (
    <Container
      className="w-full bg-gray-500 text-white flex flex-row justify-end items-center gap-4 p-3 px-10"
      as={`footer`}>
      {" "}
      <p className="font-poppins text-md text-white">
        Bester Group for IT and Development - 0770 199 3085 or 0772 164 0404
      </p>
      <div className="relative">
        <Image
          width={25}
          height={25}
          loading="lazy"
          image="/images/bester-footer-icon.svg"
          alt="bester"
        />
      </div>
    </Container>
  );
};

export default Footer;
