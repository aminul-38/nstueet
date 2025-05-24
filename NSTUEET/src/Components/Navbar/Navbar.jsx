import classNames from "classnames";
import styles from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Navbar() {
  const localhost = "http://40.0.5.126";

  //const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user);
  const basePath = "/src/Images/Other/";
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchContent, setSearchContent] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchButtonClick = () => {
    if (searchContent.length === 0) {
      return;
    }
    setShowSearchResult(true);
    console.log(searchContent);
    const searchRequest = async () => {
      try {
        const response = await axios.post(`${localhost}:3000/search`, {
          searchContent,
        });
        console.log(response.data.searchData);
        setSearchResult(response.data.searchData);
      } catch (error) {
        console.log(error.response?.data?.message || "An error occurred.");
      }
    };
    searchRequest();
  };
  const handleCloseButtonClick = () => {
    setShowSearchResult(false);
  };

  return (
    <>
      <div className={styles.Navbar}>
        <div className={classNames(styles.searchBarDiv)}>
          <div className={classNames(styles.logo)}>
            <img src="src\Images\Logo\nstueet logo.png" alt="Logo" />
          </div>
          <div className={classNames(styles.searchBar)}>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setSearchContent(e.target.value);
                }}
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={handleSearchButtonClick}
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className={classNames(styles.navIconsDiv)}>
          <div className={classNames(styles.navIconDiv)}>
            <div title="Feed" className={classNames(styles.navLink)}>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navIcon
                }
              >
                <i className={classNames("fa-solid", "fa-house", "fa-2x")}></i>
              </NavLink>
            </div>
            <div title="People" className={classNames(styles.navLink)}>
              <NavLink
                to="/people"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navIcon
                }
              >
                <i
                  className={classNames("fa-solid", "fa-user-group", "fa-2x")}
                ></i>
              </NavLink>
            </div>
            <div title="Create Post" className={classNames(styles.navLink)}>
              <NavLink
                to="/create-post"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navIcon
                }
              >
                <i
                  className={classNames("fa-solid", "fa-square-plus", "fa-2x")}
                ></i>
              </NavLink>
            </div>
            <div title="Profile" className={classNames(styles.navLink)}>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navIcon
                }
              >
                <i className={classNames("fa-solid", "fa-user", "fa-2x")}></i>
              </NavLink>
            </div>
          </div>
          <div className={classNames(styles.profileIconDiv)}>
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-bars fa-2x"></i>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                </li>
                <li>
                  {/* here is logout button */}
                  <Link
                    onClick={() => {
                      localStorage.removeItem("user");
                    }}
                    to="/"
                    className="dropdown-item"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* For showing search result */}
      {/* This component is not responsive */}
      {showSearchResult && (
        <div
          className={classNames(styles.searchResultContainer)}
          id="collapseExample"
        >
          <div className={classNames(styles.searchResultBox)}>
            <div className={classNames(styles.closeButton)}>
              <i
                className="fa-regular fa-circle-xmark"
                onClick={handleCloseButtonClick}
              ></i>
            </div>
            <hr />

            {searchResult.length === 0 ? (
              <div className={classNames(styles.noResult)}>Nothing found</div>
            ) : (
              searchResult.map((person) => (
                <div
                  key={person.student_id}
                  className={classNames(styles.peopleCard)}
                >
                  <div className={classNames(styles.personInfo)}>
                    <div className={classNames(styles.profileImageIcon)}>
                      <img
                        src={`${basePath}${person.profile_picture}`}
                        alt={`${person.name}'s profile`}
                      />
                    </div>
                    <div className={classNames(styles.personName)}>
                      <Link to="#">{person.name}</Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default Navbar;
