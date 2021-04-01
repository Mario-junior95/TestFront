import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRouteSuperAdmin = ({
  isSuperAdminAuth: isSuperAdminAuth,
  component: Component,
  ...rest
}) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (isSuperAdminAuth) {
            return <Component />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/superAdmin-Login",
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

export default ProtectedRouteSuperAdmin;
