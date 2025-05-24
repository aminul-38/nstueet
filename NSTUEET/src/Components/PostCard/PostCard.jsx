import { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./PostCard.module.css";
import PropTypes from "prop-types";
import axios from "axios";

function PostCard(props) {
  const localhost = "http://40.0.5.126";

  const basePath = "src/Images/Other/";

  //console.log("posts", props.posts);
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.user[0].student_id;

  // for reRendering
  const [reRender, setRerender] = useState(false);

  // fetching the name of user for each post
  const [names, setNames] = useState({});
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const nameMap = {};
        for (const post of props.posts) {
          const response = await axios.post(`${localhost}:3000/get-name`, {
            studentID: post.student_id,
          });
          nameMap[post.student_id] = response.data.name;
        }
        setNames(nameMap);
      } catch (error) {
        console.error(error.response?.data || "An error occurred");
      }
    };
    fetchNames();
  }, [props.posts]);

  // fetching profile picture of each post creator
  const [profilePictures, setProfilePictures] = useState({});
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const profilePicturesMap = {};
        for (const post of props.posts) {
          const response = await axios.post(
            `${localhost}:3000/get-profile-picture`,
            {
              studentID: post.student_id,
            }
          );
          profilePicturesMap[post.student_id] = response.data.profilePicture;
        }
        setProfilePictures(profilePicturesMap);
      } catch (error) {
        console.error(error.response?.data || "An error occurred");
      }
    };
    fetchProfilePicture();
  }, [props.posts]);

  // fetching likes for each posts
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesMap = [];
        for (const post of props.posts) {
          const response = await axios.post(`${localhost}:3000/get-likes`, {
            postID: post.post_id,
          });
          likesMap.push(response.data.like_data);
        }
        setLikes(likesMap);
      } catch (error) {
        console.error(error.response?.data || "An error occurred");
      }
    };
    fetchLikes();
  }, [props.posts, reRender]);

  // fetching comments for each posts
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentMap = [];
        for (const post of props.posts) {
          const response = await axios.post(`${localhost}:3000/get-comments`, {
            postID: post.post_id,
          });
          commentMap.push(response.data.comment_data);
        }
        console.log(commentMap);
        setComments(commentMap);
      } catch (error) {
        console.error(error.response?.data?.message || "An error occurred");
      }
    };
    fetchComments();
  }, [props.posts, reRender]);

  /* CODE SECTION FOR HANDLING LIKE FUCTIONALITIES */

  // selecting the posts that are liked by user
  const [postsLiked, setPostsLiked] = useState({});
  // setting defalult value for all posts as false
  useEffect(() => {
    const initializePostsLiked = () => {
      const initialPostsLiked = {};
      for (const post of props.posts) {
        initialPostsLiked[post.post_id] = false;
      }
      setPostsLiked(initialPostsLiked);
    };
    initializePostsLiked();
  }, [props.posts]);
  // changing the value for actual state
  useEffect(() => {
    for (const like of likes) {
      for (const postWiseLike of like) {
        if (postWiseLike.student_id === userID) {
          postsLiked[postWiseLike.post_id] = true;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  // menthod for like button click
  const handleLikeButtonClick = (postID) => {
    if (postsLiked[postID] === true) {
      // post already Liked. making it unliked
      setPostsLiked((prevLiked) => ({
        ...prevLiked,
        [postID]: !prevLiked[postID],
      }));
      const unlikeRequest = async () => {
        try {
          const response = await axios.post(
            `${localhost}:3000/unlike-request`,
            {
              postID,
              userID,
            }
          );
          console.log(response.data.message);
        } catch (error) {
          console.error(error.response?.data || "An error occurred");
        }
      };
      unlikeRequest();
    } else {
      // post is not liked. setting it liked
      setPostsLiked((prevLiked) => ({
        ...prevLiked,
        [postID]: !prevLiked[postID],
      }));
      const likeRequest = async () => {
        try {
          const response = await axios.post(`${localhost}:3000/like-request`, {
            postID,
            userID,
          });
          console.log(response.data.message);
        } catch (error) {
          console.error(error.response?.data || "An error occurred");
        }
      };
      likeRequest();
    }
    setRerender((prev) => ({ prev: !prev }));
  };

  /* HANDLING COMMENT BUTTON FUNCTIONALITIES */

  const [commentButtonClicked, setCommentButtonClicked] = useState({});
  // initially setting false for all posts
  useEffect(() => {
    const initializeCommentButtonClicked = () => {
      const initialCommentButtonClicked = {};
      for (const post of props.posts) {
        initialCommentButtonClicked[post.post_id] = false;
      }
      setCommentButtonClicked(initialCommentButtonClicked);
    };
    initializeCommentButtonClicked();
  }, [props.posts]);

  const handleCommentButtonClick = (postID) => {
    setCommentButtonClicked((prevCommented) => ({
      ...prevCommented,
      [postID]: !prevCommented[postID],
    }));
  };

  /* HANDLING COMMENT CONTENT FOR EACH POST AND SUBMIT LOGIC */
  const [commentContent, setCommentContent] = useState({});
  useEffect(() => {
    const commentMap = {};
    for (const post of props.posts) {
      commentMap[post.post_id] = null;
    }
    setCommentContent(commentMap);
  }, [props.posts]);

  const handleCommentSubmit = (postID) => {
    const content = commentContent[postID];
    const postComment = async () => {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post(`${localhost}:3000/comment-request`, {
          postID,
          userID,
          content,
        });
        //console.log(response.data.message);
      } catch (error) {
        console.error(error.response?.data || "An error occurred");
        alert(error.response.data.message);
      }
    };
    postComment();
    // for rerendering
    setRerender((prev) => ({ prev: !prev }));
    setCommentContent((prev) => ({
      ...prev,
      [postID]: null,
    }));
  };

  // return nothing if props.post is emply or props don't have any posts.
  if (!props.posts || props.posts.length === 0) {
    return <></>;
  }

  return (
    <>
      {props.posts.map((post, index) => (
        <div className={styles.postCard} key={post.post_id}>
          <div className={classNames(styles.headerSection)}>
            <div className={styles.profileImageIcon}>
              <img
                src={`${basePath}${profilePictures[post.student_id]}`}
                alt={`${names[post.student_id]}'s profile picture`}
              />
            </div>
            <div className={styles.nameAndTime}>
              <div className={styles.profileName}>
                <span>{names[post.student_id]}</span>
              </div>
              <div className={styles.postTimestamp}>
                <span>
                  {new Date(post.created_at).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className={classNames(styles.textSection)}>
            <p>{post.content}</p>
          </div>
          <div className={classNames(styles.buttonSection)}>
            <div className={styles.counterSection}>
              <div className={styles.likeCounter}>
                <a href="#">
                  Total likes <span>{likes[index]?.length || 0}</span>
                </a>
              </div>
              <div className={styles.commentCounter}>
                <a href="#">
                  Total comments <span>{comments[index]?.length || 0}</span>
                </a>
              </div>
            </div>
            <hr />
            <div className={styles.twoButton}>
              <div className={styles.likeButton}>
                <button
                  className={classNames({
                    [styles.active]: postsLiked[post.post_id],
                  })}
                  onClick={() => {
                    handleLikeButtonClick(post.post_id);
                  }}
                >
                  {postsLiked[post.post_id] ? (
                    <i className="fa-solid fa-thumbs-up"></i>
                  ) : (
                    <i className={"fa-regular fa-thumbs-up"}></i>
                  )}{" "}
                  Like
                </button>
              </div>
              <div className={styles.commentButton}>
                <button
                  className={classNames({
                    [styles.active]: commentButtonClicked[post.post_id],
                  })}
                  onClick={() => {
                    handleCommentButtonClick(post.post_id);
                  }}
                >
                  {commentButtonClicked[post.post_id] ? (
                    <i className="fa-solid fa-comment"></i>
                  ) : (
                    <i className={"fa-regular fa-comment"}></i>
                  )}{" "}
                  Comment
                </button>
              </div>
            </div>
          </div>
          {commentButtonClicked[post.post_id] && (
            <div className={classNames(styles.commentBoxSection)}>
              <div>
                <hr />
              </div>
              <div className={styles.commentBox}>
                <div className={styles.profileImageIcon}>
                  <img
                    src={`${basePath}${user.user[0].profile_picture}`}
                    alt={`${user.user[0].name}'s profile picture`}
                  />
                </div>
                <div className={classNames(styles.inputBox)}>
                  <textarea
                    className={"form-control"}
                    type="text"
                    placeholder="comment"
                    onChange={(e) => {
                      setCommentContent((prev) => ({
                        ...prev,
                        [post.post_id]: e.target.value,
                      }));
                      //console.log(commentContent);
                    }}
                  />
                  <button
                    className={styles.submitCommentButton}
                    type="submit"
                    onClick={() => {
                      handleCommentSubmit(post.post_id);
                    }}
                  >
                    <i className={"fa-solid fa-circle-chevron-right fa-2x"}></i>
                  </button>
                </div>
              </div>

              {comments[index].length > 0 && (
                <div>
                  <hr />
                </div>
              )}

              {comments[index]?.slice(0, 3).map((comment) => (
                <div
                  key={comment.comment_id}
                  className={classNames(styles.commentContentContainer)}
                >
                  <div className={classNames(styles.commentContentBox)}>
                    <div className={classNames(styles.commentTime)}>
                      <span>
                        {new Date(comment.created_at).toLocaleString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                    <div className={classNames(styles.commentContent)}>
                      <span>{comment.content}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default PostCard;

PostCard.propTypes = {
  posts: PropTypes.array.isRequired,
};
