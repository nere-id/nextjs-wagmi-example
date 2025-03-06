import { 
  createConfig, 
  http,   
} from "wagmi";
import { injected } from "wagmi/connectors";
import { blast } from "wagmi/chains";

export function getInjectedConnector() {
  if (typeof window !== "undefined" && window.ethereum) {
    return injected({
      target: () => ({
        id: "windowProvider",
        name: "Window Provider",
        provider: window.ethereum,
      }),
    });
  }
  return null;
}

export function getConfig() {
  const connectors = [];
  const injectedConnector = getInjectedConnector();

  if (injectedConnector) {
    connectors.push(injectedConnector);
  }

  return createConfig({
    chains: [blast],
    ssr: true,    
    connectors,
    transports: {
      [blast.id]: http(),
    },
  });
}