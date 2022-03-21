import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignInOutContainer from '../containers/Auth/Auth';
import NotFound from '../containers/Client/NotFound/NotFound';
import configRoute from '../utils/configRoute';
import deCode from '../utils/decode';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../containers/Auth/authSlice';
const MainRoute = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  if (token) {
    dispatch(setRole(deCode(token)));
  }
  return (
    <Routes>
      {configRoute.map((route) => {
        return (
          <Route
            key={route.path}
            path={`${route.path}/*`}
            element={
              route.role.some((item) => item === role) ? (
                <route.element />
              ) : (
                <NotFound />
              )
            }
          ></Route>
        );
      })}
      <Route path="/auth" element={<SignInOutContainer />} />
      <Route path={`*`} element={<NotFound />}></Route>
    </Routes>
  );
};

export default MainRoute;
