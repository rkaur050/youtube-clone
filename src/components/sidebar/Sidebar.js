import React from "react";
import "./_sidebar.scss";

import {
  MdSubscriptions,
  MdExitToApp,
  MdHistory,
  MdHome,
  MdThumbUp,
  MdOutlinePlaylistPlay,
  MdOutlineWatchLater,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { GoVideo } from "react-icons/go";
import { BsPersonVideo } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/actions/auth.action";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebar, handleToggleSidebar }) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <nav
      className={sidebar ? "sidebar open" : "sidebar"}
      onClick={() => handleToggleSidebar(false)}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <li>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </Link>
      <li>
        <SiYoutubeshorts size={23} />
        <span>Shorts</span>
      </li>
      <li>
        <MdSubscriptions size={23} />
        <span>Subscriptions</span>
      </li>
      <hr />
      <li>
        <BsPersonVideo size={20} />
        <span>Your Channel</span>
      </li>
      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>
      <li>
        <MdOutlinePlaylistPlay size={23} />
        <span>Playlists</span>
      </li>
      <li>
        <GoVideo size={20} />
        <span>Your Videos</span>
      </li>
      <li>
        <MdOutlineWatchLater size={20} />
        <span>Watch Later</span>
      </li>
      <li>
        <MdThumbUp size={20} />
        <span>Liked Videos</span>
      </li>

      <hr />
      <li onClick={handleLogOut}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>
      <hr />
    </nav>
  );
};

export default Sidebar;
