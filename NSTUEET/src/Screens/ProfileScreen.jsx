import axios from "axios";
import PostCard from "../Components/PostCard/PostCard";
import ProfileCard from "../Components/ProfileCard/ProfileCard";
import { useEffect, useState } from "react";

function ProfileScreen() {
  const localhost = "http://40.0.5.126";

  // fetching data for profileCard
  const user = JSON.parse(localStorage.getItem("user"));
  const studentID = user.user[0].student_id;
  const [dataOne, setDataOne] = useState({
    totalPost: 0,
    totalFollower: 0,
    totalFolowing: 0,
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(`${localhost}:3000/profile`, {
          studentID,
        });
        const total_post = response.data.totalPost[0].total_post;
        const total_follower = response.data.totalFollower[0].total_follower;
        const total_following = response.data.totalFollowing[0].total_following;
        setDataOne({
          total_post,
          total_follower,
          total_following,
        });
      } catch (error) {
        console.log(error.response?.data?.message || "An error occurred.");
      }
    };
    getData();
  }, [studentID]);

  // Fetching data for posts
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(`${localhost}:3000/profile-post`, {
          studentID,
        });
        //console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.log(error.response?.data?.message || "An error occurred.");
      }
    };
    getData();
  }, [studentID]);

  /*   // sort post by post_id
  const sortByPostId = () => {
    const sortedData = [...posts].sort((a, b) => a.post_id - b.post_id);
    setPosts(sortedData);
  };
  sortByPostId(); */

  return (
    <>
      <ProfileCard user={user.user[0]} countData={dataOne} />
      <PostCard posts={posts} />
    </>
  );
}
export default ProfileScreen;
