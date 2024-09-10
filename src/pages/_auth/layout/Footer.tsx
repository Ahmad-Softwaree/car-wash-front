import Container from "@/components/ui/Container";

const Footer = () => {
  return (
    <Container
      className="w-full bg-gray-500 text-white flex flex-row
       justify-center items-center gap-4 p-3 px-10"
      as={`footer`}>
      {" "}
      <p className="font-poppins text-md text-white">
        AP Soft for IT And Development
      </p>
    </Container>
  );
};

export default Footer;
