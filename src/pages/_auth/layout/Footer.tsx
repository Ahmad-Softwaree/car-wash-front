import Container from "@/components/ui/Container";

const Footer = () => {
  return (
    <Container
      className="w-full bg-white dark:bg-primary-800 text-primary-800 dark:text-white flex flex-row
       justify-center items-center gap-4 p-3 px-10 border-t-2 border-solid border-primary-300 border-opacity-40"
      as={`footer`}>
      {" "}
      <p className="font-poppins text-md text-primary-800 dark:text-white">
        AP Soft for IT And Development
      </p>
    </Container>
  );
};

export default Footer;
