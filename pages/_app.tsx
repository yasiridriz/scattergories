import Layout from '../components/layout';
import "../styles/globals.css";
import SocketsProvider from "../context/socket.context";

function Scattergories({ Component, pageProps }) {
  return (

    <SocketsProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SocketsProvider>
  );
}

export default Scattergories;
