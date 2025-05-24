import { useState } from "react";
import classNames from "classnames";
import styles from "./CreatePost.module.css";
import axios from "axios";

function CreatePost() {
  const localhost = "http://40.0.5.126";

  const basePath = "src\\Images\\Other\\";
  const [postContent, setPostContent] = useState("");
  const maxWords = 101;

  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.user[0]);
  const studentID = user.user[0].student_id;

  const countWords = (text) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const handleInputChange = (event) => {
    const text = event.target.value;
    const wordCount = countWords(text);

    if (wordCount <= maxWords) {
      setPostContent(text);
    }
  };

  const handlePostClick = () => {
    if (countWords(postContent) === 0) {
      alert("Post cannot be empty.");
      return;
    }
    console.log("Post content:", postContent);
    const sentData = async () => {
      try {
        const response = await axios.post(`${localhost}:3000/create-post`, {
          postContent,
          studentID,
        });
        alert(response.data.message);
      } catch (error) {
        alert(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      }
    };
    sentData();
    setPostContent(""); // clear the textarea after posting
  };

  return (
    <>
      <div className={classNames(styles.createPostContainer)}>
        <div className={classNames(styles.createPostHeader)}>
          <h2>Create Post</h2>
        </div>
        <hr />

        <div className={classNames(styles.createPostBody)}>
          <div className={classNames(styles.userInfoSection)}>
            <div className={classNames(styles.profileImageIcon)}>
              <img
                src={`${basePath}${user.user[0].profile_picture}`}
                alt={`${user.user[0].name}'s profile`}
              />
            </div>
            <div className={classNames(styles.userName)}>
              {user.user[0].name}
            </div>
          </div>
          <div className={classNames(styles.postInput)}>
            <textarea
              name="post"
              id="post"
              placeholder="What's on your mind?"
              spellCheck="true"
              value={postContent}
              onChange={handleInputChange}
              aria-label="Write your post"
            ></textarea>
            <div className={classNames(styles.wordCounter)}>
              {countWords(postContent)}/{maxWords} words
            </div>
          </div>
        </div>

        <div className={classNames(styles.createPostFooter)}>
          <button
            className={classNames(styles.postButton)}
            onClick={() => {
              handlePostClick();
            }}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
