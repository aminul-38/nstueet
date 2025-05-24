const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// connecting nstueet database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nstueet",
});
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

/* for register page data collection */
app.post("/register", (req, res) => {
  console.log(req.body);

  // sending data to database
  const { name, studentID, eduMail, bio, password } = req.body;
  const sql =
    "INSERT INTO users (student_id, name, email, password, bio) VALUES(?,?,?,?,?)";
  const values = [studentID, name, eduMail, password, bio];
  // inserting user information in user table
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      return res
        .status(200)
        .json({ message: "Registration Successful", result: result });
    }
  });

  // updating follow list for user
  const sqlFollow =
    "INSERT INTO follows_table (follower_id, following_id) VALUES(?,?)";
  const valuesFollow = [studentID, studentID];
  db.query(sqlFollow, valuesFollow, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

/* For login page varification */
app.post("/login", (req, res) => {
  console.log(req.body);

  // verifying data from database
  const { emailOrID, password } = req.body;
  const sql =
    "SELECT * FROM users WHERE (BINARY email = ? OR BINARY student_id = ?) AND BINARY password =?";
  const values = [emailOrID, emailOrID, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      if (result.length == 1) {
        return res
          .status(200)
          .json({ message: "Login successful.", user: result });
      } else {
        return res.status(404).json({ message: "Invalid ID or Password." });
      }
    }
  });
});

/* For create-post */
app.post("/create-post", (req, res) => {
  console.log("create post: ");
  console.log(req.body);

  const { postContent, studentID } = req.body;
  const sql = "INSERT INTO posts (student_id, content) VALUES (?,?)";
  const values = [studentID, postContent];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      console.log("post result : ");
      console.log(result);
      return res.status(200).json({ message: "Content posted successfully" });
    }
  });
});

/* For people you may know */
app.post("/people-you-may-know", (req, res) => {
  console.log("people you may know...");
  console.log(req.body);

  const { studentID } = req.body;
  const sql = `
  SELECT student_id, name, profile_picture 
  FROM users
  WHERE student_id NOT IN (
    SELECT following_id
    FROM follows_table
    WHERE follower_id = ?
  )
  `;
  const values = [studentID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      return res
        .status(200)
        .json({ message: "People you may know", people: result });
    }
  });
});

/* For folloing list */
app.post("/following", (req, res) => {
  console.log("following list...");
  console.log(req.body);

  const { studentID } = req.body;
  const sql = `
  SELECT student_id, name, profile_picture 
  FROM users
  WHERE student_id IN (
    SELECT following_id
    FROM follows_table
    WHERE follower_id = ?
  )
  `;
  const values = [studentID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      return res
        .status(200)
        .json({ message: "Following list found", people: result });
    }
  });
});

/* For follow request */
app.post("/follow-request", (req, res) => {
  console.log("follow request...");
  console.log(req.body);

  // inserting into follows_table
  const { studentID, followingID } = req.body;
  const sql =
    "INSERT INTO follows_table (follower_id,following_id) VALUES (?,?)";
  const values = [studentID, followingID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      return res.status(200).json({ message: "Followed success" });
    }
  });
});

/* For unfollow request */
app.post("/unfollow-request", (req, res) => {
  console.log("unfollow request...");
  console.log(req.body);

  // deleting from follows_table
  const { studentID, followingID } = req.body;
  const sql = `
  DELETE FROM follows_table
  WHERE follower_id = ? AND following_id = ?
  `;
  const values = [studentID, followingID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      return res.status(200).json({ message: "Unfollowed" });
    }
  });
});

/* For profile data */
app.post("/profile", (req, res) => {
  console.log("profile data ... ");
  //console.log(req.body);
  const { studentID } = req.body;

  const sql_totalPost =
    "SELECT COUNT(post_id) AS total_post FROM posts WHERE student_id = ?";
  const sql_totalFollower =
    "SELECT COUNT(follower_id) AS total_follower FROM follows_table WHERE following_id = ?";
  const sql_totalFollowing =
    "SELECT COUNT(following_id) AS total_following FROM follows_table WHERE follower_id = ?";

  const values = [studentID];

  db.query(sql_totalPost, values, (err, totalPost) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to count total post" });
    }
    db.query(sql_totalFollower, values, (err, totalFollower) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Failed to count total follower" });
      }
      db.query(sql_totalFollowing, values, (err, totalFollowing) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Failed to count total following" });
        }
        const result = { totalPost, totalFollower, totalFollowing };
        res.json(result);
      });
    });
  });
});

/* For profile posts */
app.post("/profile-post", (req, res) => {
  console.log("profile post...");
  console.log(req.body);

  const { studentID } = req.body;
  const sql_post =
    "SELECT * FROM posts WHERE student_id = ? ORDER BY post_id DESC";
  const values_post = [studentID];

  db.query(sql_post, values_post, (err, posts) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching posts" });
    }
    console.log(posts);
    res.json(posts);
  });
});

/* For feed posts */
app.post("/feed-posts", (req, res) => {
  console.log("fetching posts for feed...");
  console.log("studentID: ", req.body);

  const { studentID } = req.body;
  const sql = `
  SELECT * FROM posts 
  WHERE student_id IN 
	   (SELECT following_id 
      FROM follows_table 
      WHERE follower_id = ?) 
      ORDER BY post_id DESC;
  `;
  const values = [studentID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal sever error" });
    } else {
      console.log(result);
      return res.status(200).json({ posts: result });
    }
  });
});

/* For fetching name against a student_id */
app.post("/get-name", (req, res) => {
  console.log("fetching name...");
  console.log(req.body);

  const { studentID } = req.body;
  const sql = "SELECT name FROM users WHERE student_id = ?";
  const values = [studentID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      if (result.length == 1) {
        return res.status(200).json({ name: result[0].name });
      } else {
        return res.status(404).json({ message: "Student ID not found" });
      }
    }
  });
});

/* For fetching profile picture against a student_id */
app.post("/get-profile-picture", (req, res) => {
  console.log("fetching profile picture...");
  console.log(req.body);

  const { studentID } = req.body;
  const sql = "SELECT profile_picture FROM users WHERE student_id = ?";
  const values = [studentID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      if (result.length == 1) {
        return res
          .status(200)
          .json({ profilePicture: result[0].profile_picture });
      } else {
        return res.status(404).json({ message: "Student ID not found" });
      }
    }
  });
});

/* For fetching likes for posts bassed on post_id */
app.post("/get-likes", (req, res) => {
  console.log("fetching likes...");
  console.log(req.body);

  const { postID } = req.body;
  const sql = ` 
  SELECT 
    likes.like_id, 
    likes.post_id, 
    likes.student_id, 
    users.name
  FROM likes
  LEFT JOIN users ON likes.student_id = users.student_id
  WHERE likes.post_id = ? `;
  const values = [postID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      return res.status(200).json({ like_data: result });
    }
  });
});

/* For fetching comments for posts based on post_id */
app.post("/get-comments", (req, res) => {
  console.log("fetching comments...");
  console.log(req.body);

  const { postID } = req.body;
  const sql = `
  SELECT 
    comments.comment_id,
    comments.post_id,
    comments.student_id,
    comments.content,
    comments.created_at,
    users.name
  FROM comments
  LEFT JOIN users ON comments.student_id = users.student_id
  WHERE post_id = ?
  ORDER BY comments.comment_id DESC
  `;
  const values = [postID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      return res.status(200).json({ comment_data: result });
    }
  });
});

/* For unlike request */
app.post("/unlike-request", (req, res) => {
  console.log("unlike request...");
  console.log(req.body);

  const { postID, userID } = req.body;
  const sql = `
  DELETE FROM likes 
  WHERE post_id = ? AND student_id = ?
  `;
  const values = [postID, userID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      return res.status(200).json({ message: "Unliked" });
    }
  });
});

/* For like request */
app.post("/like-request", (req, res) => {
  console.log("like request...");
  console.log(req.body);

  const { postID, userID } = req.body;
  const sql = " INSERT INTO likes (post_id, student_id) values (?,?) ";
  const values = [postID, userID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      return res.status(200).json({ message: "Liked" });
    }
  });
});

/* For comment request */
app.post("/comment-request", (req, res) => {
  console.log("comment request processing...");
  console.log(req.body);

  const { postID, userID, content } = req.body;
  const sql =
    "INSERT INTO comments (post_id, student_id, content) VALUES (?,?,?)";
  const values = [postID, userID, content];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Comment can't be null" });
    } else {
      console.log(result);
      return res.status(200).json({ message: "Commented" });
    }
  });
});

/* For searching */
app.post("/search", (req, res) => {
  console.log("Searching...");
  console.log(req.body);

  const { searchContent } = req.body;
  const sql = `
    SELECT student_id, name, profile_picture 
    FROM users 
    WHERE name LIKE ? OR student_id LIKE ? 
  `;
  const values = [`%${searchContent}%`, `%${searchContent}%`];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      return res.status(200).json({ searchData: result });
    }
  });
});

http: app.get("/", function (req, res) {
  const sql = "SELECT * FROM users";
  db.query(sql, function (err, data) {
    if (err) return res.json(err);
    //return res.json(data);
    return res.send("<h1>Welcome To NSTUEET SERVER !</h1>");
  });
});

app.listen(3000, "0.0.0.0", function () {
  console.log("NSTUEET server running at port 3000....");
});
