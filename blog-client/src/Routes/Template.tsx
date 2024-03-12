import Header from "../Components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import TokenContext from "@/TokenContext";
import { useEffect, useContext } from "react";
import AnimatedOutlet from "@/AnimatedOutlet";

// Component that adds a header to the website - all pages use the header - are child routes.
const Template = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { addToken } = useContext(TokenContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoading) {
          // Wait for authetication to load.
          return <div> Loading...</div>;
        }
        if (isAuthenticated) {
          const accessToken = (await getAccessTokenSilently()) as string; // Get access token to send to the backend to be able to make orders.
          addToken(accessToken);
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [getAccessTokenSilently, isAuthenticated, isLoading]);

  return (
    <>
      <div>
        <Header />
        <AnimatedOutlet />
      </div>
    </>
  );
};

export default Template;
