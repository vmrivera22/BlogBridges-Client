import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  text?: string;
}

// Component to create a login button for Auth0.
const LoginButton = ({ text }: Props) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <button onClick={() => loginWithRedirect()}>
        {text ? text : "Sign In"}
      </button>
    )
  );
};

export default LoginButton;
