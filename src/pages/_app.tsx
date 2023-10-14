import { useRouter } from "next/router";
import "../styles/globals.css";

function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  const { locale } = useRouter();

  return <Component {...pageProps} />;
}

export default App;
