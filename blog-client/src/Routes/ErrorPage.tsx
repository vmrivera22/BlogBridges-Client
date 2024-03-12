import Template from "./Template";
import "../css/Error.css";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

// Error handler page.
const ErrorPage = () => {
  let error = useRouteError() as {
    // Get the error.
    message: string;
    status: number;
    statusText: string;
  };
  return (
    <>
      <Template />
      <div className="error--container">
        <h1 className="white">
          {isRouteErrorResponse(error) ? (
            <>
              {error.status} {error.message} {error.statusText}
            </>
          ) : (
            <>
              <p>An unexpected error occured: </p>
              {error.message}
            </>
          )}
        </h1>
      </div>
    </>
  );
};

export default ErrorPage;
