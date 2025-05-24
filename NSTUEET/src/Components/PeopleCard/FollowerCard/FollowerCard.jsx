import classNames from "classnames";
import styles from "./FollowerCard.module.css";
import { Link } from "react-router-dom";

function FollowerCard() {
  const followingList = [
    { id: 1, name: "Aminul Imam", image: "src/Images/Other/aminul Imam.jpg" },
    { id: 2, name: "John Doe", image: "src/Images/Other/aminul Imam.jpg" },
    { id: 3, name: "No One", image: "src/Images/Other/aminul Imam.jpg" },
    { id: 4, name: "Aminul Imam", image: "src/Images/Other/aminul Imam.jpg" },
    { id: 5, name: "Aminul Imam", image: "src/Images/Other/aminul Imam.jpg" },
  ];

  return (
    <>
      <div className={classNames(styles.followingCardContainer)}>
        <div className={classNames(styles.headingSeciton)}>
          <h2>Follower</h2>
        </div>
        <hr />

        {followingList.slice(0, 3).map((person) => (
          <div key={person.id} className={classNames(styles.personCard)}>
            <div className={classNames(styles.personInfo)}>
              <div className={classNames(styles.profileImageIcon)}>
                <img src={person.image} alt={`${person.name}'s profile`} />
              </div>
              <div className={classNames(styles.personName)}>
                <Link to="#">{person.name}</Link>
              </div>
            </div>

            <div className={classNames(styles.followButton)}>
              <button>Unfollow</button>
            </div>
          </div>
        ))}

        <div className={classNames(styles.linkSection)}>
          <Link to="#">See More</Link>
        </div>
      </div>
    </>
  );
}

export default FollowerCard;
