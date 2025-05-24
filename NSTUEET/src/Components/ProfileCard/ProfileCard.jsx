import classNames from "classnames";
import styles from "./ProfileCard.module.css";
import PropTypes from "prop-types";

function ProfileCard(props) {
  const basePath = "src/Images/Other/";

  return (
    <>
      <div className={classNames(styles.profileCardContainer)}>
        <div className={classNames(styles.userInfoSection)}>
          <div className={classNames(styles.profileImageIcon)}>
            <img
              src={`${basePath}${props.user.profile_picture}`}
              alt={`${props.user.name}'s profile`}
            />
          </div>
          <div className={classNames(styles.userName)}>{props.user.name}</div>
        </div>
        <div className={classNames(styles.counterSection)}>
          <div className={classNames(styles.postCounter, styles.counterDiv)}>
            <div className={classNames(styles.counterValue)}>
              {props.countData.total_post}
            </div>
            <div className={classNames(styles.counterName)}>Posts</div>
          </div>
          <div
            className={classNames(styles.followerCounter, styles.counterDiv)}
          >
            <div className={classNames(styles.counterValue)}>
              {props.countData.total_follower}
            </div>
            <div className={classNames(styles.counterName)}>Followers</div>
          </div>
          <div
            className={classNames(styles.followingCounter, styles.counterDiv)}
          >
            <div className={classNames(styles.counterValue)}>
              {props.countData.total_following}
            </div>
            <div className={classNames(styles.counterName)}>Following</div>
          </div>
        </div>
        <div className={classNames(styles.bioSection)}>
          <div className={classNames(styles.bioContent)}>{props.user.bio}</div>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
ProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
  countData: PropTypes.object.isRequired,
};
