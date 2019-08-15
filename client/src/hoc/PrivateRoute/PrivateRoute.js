import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, props, ...rest }) => {
  const isAuth = useSelector(({ auth }) => auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={otherProps =>
        isAuth ? (
          <Component {...props} {...otherProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
