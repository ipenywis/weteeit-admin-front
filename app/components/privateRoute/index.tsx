import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

export interface IPrivateRouteProps extends RouteProps {
  allowAccess: boolean;
  redirectTo: string;
}

export function PrivateRoute(props: IPrivateRouteProps) {
  if (props.allowAccess) return <Route {...props} />;
  else return <Redirect to={props.redirectTo} />;
}
