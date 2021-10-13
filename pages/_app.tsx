import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { SpeedProvider } from "../context/SpeedContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SpeedProvider>
      <Component {...pageProps} />
    </SpeedProvider>
  );
}

export default MyApp;
