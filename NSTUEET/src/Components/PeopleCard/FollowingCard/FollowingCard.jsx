import classNames from "classnames";
import styles from "./FollowingCard.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function FollowingCard({ flag }) {
  const localhost = "http://40.0.5.126";

  const [people, setPeople] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const studentID = user.user[0].student_id;
  const basePath = "src\\Images\\Other\\";

  // Extracting data of following from server
  useEffect(() => {
    //console.log(studentID);
    const getData = async () => {
      try {
        const response = await axios.post(`${localhost}:3000/following`, {
          studentID,
        });
        console.log(response.data.message);
        setPeople(response.data.people);
      } catch (error) {
        console.log(error.response?.data?.message || "An error occurred.");
      }
    };
    getData();
  }, [studentID]);

  const handleClickUnfollowButton = (followingID) => {
    if (followingID == studentID) {
      alert("You can't unfollow yourself!");
    }
    if (followingID != studentID) {
      const sentData = async () => {
        try {
          const response = await axios.post(
            `${localhost}:3000/unfollow-request`,
            { studentID, followingID }
          );
          console.log(response.data.message);
          // Fetch updated data
          if (flag === "True") {
            const updatedResponse = await axios.post(
              `${localhost}:3000/following`,
              { studentID }
            );
            setPeople(updatedResponse.data.people);
          } else window.location.reload();
        } catch (error) {
          console.log(error.response?.data?.message || "An error occurred.");
        }
      };
      sentData();
    }
  };

  return (
    <>
      {people.length > 0 && (
        <div className={classNames(styles.followingCardContainer)}>
          <div className={classNames(styles.headingSeciton)}>
            <h2>Following</h2>
          </div>
          <hr />

          {(flag === "True" ? people : people.slice(0, 3)).map((person) => (
            <div
              key={person.student_id}
              className={classNames(styles.personCard)}
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

              <div className={classNames(styles.followButton)}>
                <button
                  onClick={() => {
                    handleClickUnfollowButton(person.student_id);
                  }}
                >
                  Unfollow
                </button>
              </div>
            </div>
          ))}

          {flag !== "True" && people.length > 3 ? (
            <div className={classNames(styles.linkSection)}>
              <Link to="/following">See More</Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}

export default FollowingCard;

FollowingCard.propTypes = {
  flag: PropTypes.string.isRequired,
};
