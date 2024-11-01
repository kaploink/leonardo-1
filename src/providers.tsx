// app/providers.tsx
"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { rickAndMortyApiClient } from "@/lib/apollo-clients";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ApolloProvider client={rickAndMortyApiClient}>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </ApolloProvider>
  );
};

export default Providers;
