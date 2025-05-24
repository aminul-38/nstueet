import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  const localhost = "http://192.168.0.105";

  const [emailOrID, setEmailOrID] = useState("");
  const [password, setPassword] = useState("");
  const [serverStatus, setServerStatus] = useState("");
  const [user, setUser] = useState([]);

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    /*     console.log(emailOrID);
    console.log(password); */
    const sentData = async () => {
      try {
        const response = await axios.post(`${localhost}:3000/login`, {
          emailOrID,
          password,
        });
        setServerStatus(response.data.message);
        setUser(response.data.user);
      } catch (error) {
        setServerStatus(
          error.response ? error.response.data.message : error.message
        );
      }
    };
    sentData();
  };

  useEffect(() => {
    if (user.length == 1) {
      //console.log(user);
      localStorage.setItem("user", JSON.stringify({ user }));
      window.location.href = "/home";
    }
    if (serverStatus) {
      alert(serverStatus);
    }
  }, [user, serverStatus]);

  return (
    <>
      <div className={classNames(styles.loginContainer)}>
        <div className={classNames(styles.loginRow)}>
          <div className={classNames(styles.logoCol)}>
            <h1 className={classNames(styles.logo)}>NSTUEET</h1>
            <p className={classNames(styles.moto)}>
              Connect and share your tueet with nstuiens
            </p>
          </div>
          <div className={classNames(styles.formCol)}>
            <form onSubmit={handleLoginFormSubmit}>
              <input
                onChange={(e) => setEmailOrID(e.target.value)}
                className={classNames(styles.loginInput)}
                type="text"
                placeholder="E-mail or student ID"
                required
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={classNames(styles.loginInput)}
                type="password"
                placeholder="Password"
                required
              />
              <button
                type="submit"
                className={classNames(styles.btn, "btn btn-primary col-12")}
              >
                Log in
              </button>
            </form>
            <hr />
            <p className={classNames(styles.regText)}>
              Don&apos;t have an account
            </p>
            <Link
              to="/register"
              className={classNames(styles.btn, "btn btn-success col-6")}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
