import { ChakraProvider } from "@chakra-ui/react";
import { ChakraUIProviderType } from "@/types";

const ChakraUIProvider = ({ children }: ChakraUIProviderType) => {
  return <ChakraProvider resetCSS={false}>{children}</ChakraProvider>;
};

export default ChakraUIProvider;
