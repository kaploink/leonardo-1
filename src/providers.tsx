"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
};

export default Providers;
