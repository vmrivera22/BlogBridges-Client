import { useAuth0 } from "@auth0/auth0-react";

// Component to create a logout button for Auth0.
const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  return isAuthenticated && <button onClick={() => logout()}>Sign Out</button>;
};

export default LogoutButton;
