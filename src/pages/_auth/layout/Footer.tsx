import Container from "@/components/ui/Container";

const Footer = () => {
  return (
    <Container
      className="w-full dark-light flex flex-row
       justify-center items-center gap-4 p-3 px-10 default-border"
      as={`footer`}>
      {" "}
      <p className="font-poppins text-md ">AP Soft for IT And Development</p>
    </Container>
  );
};

export default Footer;
