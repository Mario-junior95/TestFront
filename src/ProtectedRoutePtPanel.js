import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoutePtPanel = ({
  isPtAuth: isPtAuth,
  component: Component,
  ...rest
}) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (isPtAuth) {
            return <Component />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/pt-login",
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

export default ProtectedRoutePtPanel;
