import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SideBar from './Layout/Sidebar/SideBar';
import Topbar from './Layout/Topbar/Topbar';
import DashBoard from './pages/DashBoard/DashBoard';
import User from './pages/User/User';
import Movie from './pages/Movie/Movie';
import './admin.css';
// import Movie from '../Client/HomePage/components/Movie';
// import { useSelector } from 'react-redux';
function Admin() {
  // const user = useSelector((state) => state.auth.currentUser);
 
  let navigate = useNavigate();
 
// if(user?.maLoaiNguoiDung !== "QuanTri") {
//   // alert("Dont have permission!");
//   navigate("/");
// }




  return (
    <>
      <Topbar />
      <div className="container_admin">
        <SideBar />
        <Routes>
          {/* <div> */}
          <Route path="" element={<Navigate to="/admin/dashboard" />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<DashBoard />}>
          </Route>
          <Route path="users" element={<User />}></Route>
          <Route path="movies" element={<Movie />}></Route>
        </Routes>
      </div>
    </>

  );
}

export default Admin;
