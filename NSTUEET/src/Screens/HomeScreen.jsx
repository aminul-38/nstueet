import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard/PostCard";
import axios from "axios";

function HomeScreen() {
  const localhost = "http://40.0.5.126";

  const user = JSON.parse(localStorage.getItem("user"));
  const studentID = user.user[0].student_id;
  console.log(studentID);

  // Fetching posts for user
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.post(`${localhost}:3000/feed-posts`, {
          studentID,
        });
        console.log(response.data.posts);
        setPosts(response.data.posts);
      } catch (error) {
        console.log(error.response?.data?.message || "An error occurred.");
      }
    };
    getPosts();
  }, [studentID]);

  return (
    <>
      <PostCard posts={posts} />
    </>
  );
}

export default HomeScreen;
