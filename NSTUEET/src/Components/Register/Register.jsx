import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames";
import styles from "./Register.module.css";

function Register() {
  const localhost = "http://40.0.5.126";

  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [eduMail, setEduMail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [serverStatus, setServerStatus] = useState("");
  const [affectedRowCount, setAffectedRowcount] = useState(0);

  const hallTag = ["MUH", "ASH", "BKH", "BFH", "BBH"];
  let hallTagFlag = true;
  let eduMailFlag = true;
  let passwordFlag = true;

  const handleRegisterFormSubmit = (e) => {
    e.preventDefault();
    console.log("Name: " + name);
    console.log("sudentID : " + studentID);
    console.log("Edu-Mail: " + eduMail);
    console.log("Bio: " + bio);
    console.log("Password: " + password);
    console.log("confirmPassword : " + confirmPassword);

    // checking if the student id is correct or not
    for (let i = 0; i < hallTag.length; i++) {
      let temp = studentID.search(hallTag[i]);
      if (temp >= 0) {
        hallTagFlag = true;
        break;
      } else hallTagFlag = false;
    }
    studentID.length == 11 ? hallTagFlag : (hallTagFlag = false);
    if (!hallTagFlag) {
      alert("Student ID is not valid. Please enter a valid student ID.");
    }

    // checking if the edu-mail is correct or not
    let temp = eduMail.search("@student.nstu.edu.bd");
    if (temp < 0) {
      eduMailFlag = false;
      alert("Edu-mail is not valid. Please enter a valid edu-mail.");
    }

    // checking if both password are same or not
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      passwordFlag = false;
    }

    if (hallTagFlag && eduMailFlag && passwordFlag) {
      console.log("Everything ok, going to server.");

      // sending userData to server
      const sentData = async () => {
        try {
          const response = await axios.post(`${localhost}:3000/register`, {
            name,
            studentID,
            eduMail,
            bio,
            password,
          });
          setServerStatus(response.data.message);
          setAffectedRowcount(response.data.result.affectedRows);
        } catch (error) {
          setServerStatus(
            error.response ? error.response.data.message : error.message
          );
        }
      };
      sentData();
    }
  };

  // UseEffect to show alert when serverStatus changes
  useEffect(() => {
    if (serverStatus) {
      alert(serverStatus);
    }
    if (affectedRowCount) {
      window.location.href = "/";
    }
  }, [serverStatus, affectedRowCount]);

  // code for screen effect
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 400);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className={classNames(styles.registerHeader)}>
        <h1 className={classNames(styles.logo)}>NSTUEET</h1>
        <Link
          to="/"
          className={
            isSmallScreen
              ? classNames(
                  "btn",
                  "btn-outline-primary",
                  "btn-sm",
                  styles.registerHeaderAnchor
                )
              : classNames(styles.registerHeaderAnchor)
          }
        >
          {isSmallScreen ? "Login" : "Already have an account ?"}
        </Link>
      </div>
      <div className={classNames(styles.registerForm)}>
        <div className={classNames(styles.formHolder)}>
          <div className={classNames(styles.formHeading)}>
            <h1>Lets get you started!</h1>
            <p>Enter the details to get going.</p>
          </div>
          <form onSubmit={handleRegisterFormSubmit}>
            <div className={classNames("form-group")}>
              <label>Name</label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                  // console.log(e.target.value);
                  // console.log("Name: " + name);
                }}
                type="text"
                className={classNames("form-control", styles.formInput)}
                id="username"
                name="username"
                required
              />
            </div>
            <div className={classNames("form-group")}>
              <label>Student ID</label>
              <input
                onChange={(e) => {
                  setStudentID(e.target.value);
                  // console.log(e.target.value);
                  // console.log("StudentID: " + studentID);
                }}
                type="text"
                className={classNames("form-control", styles.formInput)}
                id="studentID"
                name="studentID"
                required
              />
            </div>
            <div className={classNames("form-group")}>
              <label>Edu-mail</label>
              <input
                onChange={(e) => {
                  setEduMail(e.target.value);
                  // console.log(e.target.value);
                  // console.log("Edu-Mail: " + eduMail);
                }}
                type="text"
                className={classNames("form-control", styles.formInput)}
                id="eduMail"
                name="eduMail"
                required
              />
            </div>
            <div className={classNames("form-group")}>
              <label>Bio (optional)</label>
              <textarea
                onChange={(e) => {
                  setBio(e.target.value);
                  // console.log(e.target.value);
                  // console.log("Bio: " + bio);
                }}
                type="text"
                className={classNames("form-control", styles.formInput)}
                id="bio"
                name="bio"
              />
            </div>
            <div className={classNames("form-group")}>
              <label>Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  // console.log(e.target.value);
                  // console.log("Password: " + password);
                }}
                type="password"
                className={classNames("form-control", styles.formInput)}
                id="password"
                name="password"
                required
              />
            </div>
            <div className={classNames("form-group")}>
              <label>Re-type Password</label>
              <input
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  // console.log(e.target.value);
                  // console.log("confirmPassword : " + confirmPassword);
                }}
                type="password"
                className={classNames("form-control", styles.formInput)}
                id="confirmPassword"
                name="confirmPassword"
                required
              />
            </div>
            <div className="d-grid gap-2 col-4 mx-auto mt-4">
              <button className="btn btn-primary" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
