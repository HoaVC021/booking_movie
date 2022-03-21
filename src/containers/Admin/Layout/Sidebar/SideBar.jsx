import {
  LineStyle, Movie, PermIdentity
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <NavLink to="/admin/dashboard" className={"link sidebarListItem"} activeClassName="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              DashBoard
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <NavLink to="/admin/users" className="link sidebarListItem" activeClassName="sidebarListItem active">
              <PermIdentity className="sidebarIcon" />
              Users
            </NavLink>
            <NavLink to="/admin/movies" className="link sidebarListItem" activeClassName="sidebarListItem active">
              <Movie className="sidebarIcon" />
              Movies
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}
