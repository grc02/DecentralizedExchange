import "../styles/globals.css";
import { Navbar } from "../components/index";
import { SwapTokenContextProvider } from "../context/swapContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <SwapTokenContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </SwapTokenContextProvider>
    </div>
  );
};

export default MyApp;
