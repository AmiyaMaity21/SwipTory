import React, { useState } from "react";
import "./Navbar.css";
import avatar from "../../assets/man.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../actions/userAction";
import { FaBookmark } from "react-icons/fa";

const Navbar = ({ showRegisterForm, showLoginForm, showStoryForm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLogout = () => {
    localStorage.clear();
    dispatch(loadUser());
    navigate("/");
  };
  return (
    <div className="navbarContainer">
      <h2 className="navLogo">SwipTory</h2>
      {/* DesktopView */}
      <div className="navBtn">
        {!isAuthenticated ? (
          <>
            <button className="registerBtn" onClick={showRegisterForm}>
              Register Now
            </button>
            <button className="signinBtn" onClick={showLoginForm}>
              Sign In
            </button>
          </>
        ) : (
          <>
            <button
              className="bookmarkBtn"
              onClick={() => navigate("/bookmarks")}
            >
              <FaBookmark /> Bookmarks
            </button>
            <button className="addstoryBtn" onClick={showStoryForm}>
              Add story
            </button>
            <div>
              <img
                className="profileImage"
                src={avatar}
                alt="avatar"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="hamburger" onClick={handleMenuClick}>
              <i>
                <GiHamburgerMenu />
              </i>
              {menuOpen && (
                <div className="hamburgerContent">
                  <h4 className="userName">{user.username}</h4>
                  <button onClick={handleLogout} className="logoutBtn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* MobileView */}
      <div className="navBtnMobile">
        {!isAuthenticated ? (
          <>
            <div className="hamburger" onClick={handleMenuClick}>
              <i>
                <GiHamburgerMenu />
              </i>
              {menuOpen && (
                <div className="hamburgerContentMobile">
                  <button onClick={showRegisterForm} className="registerBtn">
                    Register Now
                  </button>
                  <button onClick={showLoginForm} className="mobileSigninBtn">
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="hamburger" onClick={handleMenuClick}>
              <i>
                <GiHamburgerMenu />
              </i>
              {menuOpen && (
                <div className="hamburgerContentMobile">
                  <div className="userSection">
                    <img
                      className="profileImage"
                      src={avatar}
                      alt="avatar"
                      width="40rem"
                      onClick={() => navigate("/")}
                    />
                    <h4 className="userName">{user.username}</h4>
                  </div>
                  <button
                    className="YourstoryBtn"
                    onClick={() => navigate("/my/stories")}
                  >
                    Your story
                  </button>
                  <button className="addstoryBtn" onClick={showStoryForm}>
                    Add story
                  </button>
                  <button
                    className="bookmarkBtn"
                    onClick={() => navigate("/bookmarks")}
                  >
                    <FaBookmark />
                    Bookmarks
                  </button>
                  <button onClick={handleLogout} className="logoutBtn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {menuOpen && (
          <div className="close" onClick={handleMenuClick}>
            X
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
