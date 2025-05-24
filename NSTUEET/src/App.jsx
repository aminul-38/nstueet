import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Navbar from "./Components/Navbar/Navbar";
//import PostCard from "./Components/PostCard/PostCard";
import FollowingCard from "./Components/PeopleCard/FollowingCard/FollowingCard";
//import FollowerCard from "./Components/PeopleCard/FollowerCard/FollowerCard";
import CreatePost from "./Components/CreatePost/CreatePost";
import UnknownPeopleCard from "./Components/PeopleCard/UnknownPeopleCard/UnknownPeopleCard";
import PrivateRoute from "./Components/PrivateRouter/PrivateRouter";
import ProfileScreen from "./Screens/ProfileScreen";
import HomeScreen from "./Screens/HomeScreen";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Login />
            <Footer />
          </>
        }
      />
      <Route
        path="/register"
        element={
          <>
            <Register />
            <Footer />
          </>
        }
      />
      <Route
        path="/home"
        element={
          <>
            <PrivateRoute>
              <Navbar />
              <HomeScreen />
            </PrivateRoute>
          </>
        }
      />
      <Route
        path="/people"
        element={
          <>
            <PrivateRoute>
              <Navbar />
              <UnknownPeopleCard flag="False" />
              <FollowingCard flag="False" />
              {/* <FollowerCard /> */}
            </PrivateRoute>
          </>
        }
      />
      <Route
        path="/people-you-may-know"
        element={
          <>
            <PrivateRoute>
              <Navbar />
              <UnknownPeopleCard flag="True" />
            </PrivateRoute>
          </>
        }
      />
      <Route
        path="/following"
        element={
          <>
            <PrivateRoute>
              <Navbar />
              <FollowingCard flag="True" />
            </PrivateRoute>
          </>
        }
      />
      <Route
        path="/create-post"
        element={
          <>
            <PrivateRoute>
              <Navbar />
              <CreatePost />
            </PrivateRoute>
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>
            <PrivateRoute>
              <Navbar />
              <ProfileScreen />
            </PrivateRoute>
          </>
        }
      />
    </Routes>
  );
}

export default App;
