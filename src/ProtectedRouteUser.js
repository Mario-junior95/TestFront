import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRouteUser = ({
  isUserAuth: isUserAuth,
  component: Component,
  ...rest
}) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (isUserAuth) {
            return <Component />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/SignIn",
                  state: { from: props.location },
                }}
              />
            );
          }
        }}
      />
    </div>
  );
};

export default ProtectedRouteUser;
