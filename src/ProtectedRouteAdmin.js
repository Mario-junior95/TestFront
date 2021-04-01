import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRouteAdmin = ({
  isAdminAuth: isAdminAuth,
  component: Component,
  ...rest
}) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (isAdminAuth) {
            return <Component />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/admin-Login",
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

export default ProtectedRouteAdmin;
