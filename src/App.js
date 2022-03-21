import React, { useEffect } from 'react';

import './App.css';
import Admin from './containers/Admin/Admin';
import Footer from './containers/Client/Footer/Footer';
import Header from './containers/Client/Header/Header';
import Homepage from './containers/Client/HomePage/Homepage';
import MainRoute from './router/MainRouter';
import { NOHEADER } from './router/NoheaderRouter';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from './containers/Auth/authSlice';
import deCode from './utils/decode';

export const history = createBrowserHistory();

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    try {
      var token = JSON.parse(
        JSON.parse(localStorage.getItem('persist:root')).auth
      ).token;
      dispatch(setRole(deCode(token)));
    } catch (error) {
      dispatch(setRole('KhachVangLai'));
    }
  }, []);
  const _path = window.location.pathname;

  return (
    <div>
      {!NOHEADER.includes(location.pathname) && <Header />}
      <MainRoute />
      {!NOHEADER.includes(location.pathname) && <Footer />}

      {/* <Admin/> */}
    </div>
  );
}

export default App;
