import { createBrowserRouter } from "react-router-dom";
import Template from "./Routes/Template";
import Home from "./Routes/Home";
import ErrorPage from "./Routes/ErrorPage";
import Profile from "./Routes/Profile";
import { Auth0Provider } from "@auth0/auth0-react";
import SideBars from "./Routes/SideBars";
import IndividualPost from "./Routes/IndividualPost";
import Room from "./Routes/Room";
import { useEffect, useState } from "react";
import { TokenProvider } from "./TokenContext";

// Fetch the settings for Auth0 from the backend and create a component using the settings.
const AuthSettings = () => {
  const [auth, setAuth] = useState({ domain: "", clientId: "", audience: "" });

  // Fetch Auth0 settings - domain, clientId, and audience.
  useEffect(() => {
    fetch("https://blogbridges.azurewebsites.net/api/PublicAuth/auth")
      .then((data) => data.json())
      .then((response) => setAuth(response));
  }, []);
  if (auth.domain == "") {
    // Wait for the settings to be fetched.
    return <div>Loading ...</div>;
  }
  return (
    <Auth0Provider
      domain={auth.domain}
      clientId={auth.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: auth.audience,
      }}
    >
      <TokenProvider>
        <Template />
      </TokenProvider>
    </Auth0Provider>
  );
};

// Routes used by react-router-dom.
const App = createBrowserRouter([
  {
    path: "/",
    element: <AuthSettings />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <SideBars />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/post/:room/:id",
            element: <IndividualPost />,
          },
          {
            path: "/room/:roomId",
            element: <Room />,
          },
        ],
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default App;
