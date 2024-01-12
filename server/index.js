const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

// In-memory storage for users and posts
let users = [
  {
    username: "sagar@gmail.com",
    password: "sagar",
    name: "sagar",
    followers: ["sagar1@gmail.com", "sagar3@gmail.com"],
    following: [
      "sagar1@gmail.com",
      "sagar2@gmail.com",
      "sagar3@gmail.com",
      "sagar4@gmail.com",
    ],
    posts: [
      {
        username: "sagar@gmail.com",
        text: "hello world",
        timestamp: "2024-01-11T10:54:44.528Z",
      },
      {
        username: "sagar@gmail.com",
        text: "hello world Message posted successfully",
        timestamp: "2024-01-11T10:55:03.723Z",
      },
      {
        username: "sagar@gmail.com",
        text: "hello world Message posted successfully hello world Message posted successfully",
        timestamp: "2024-01-11T10:55:25.189Z",
      },
    ],
  },
  {
    username: "sagar1@gmail.com",
    password: "sagar",
    name: "sagar1",
    followers: ["sagar@gmail.com"],
    following: ["sagar@gmail.com", "sagar2@gmail.com", "sagar4@gmail.com"],
    posts: [
      {
        username: "sagar1@gmail.com",
        text: "hello world Message posted successfully hello world Message posted successfully",
        timestamp: "2024-01-11T10:55:31.772Z",
      },
    ],
  },
  {
    username: "sagar2@gmail.com",
    name: "sagar2",
    password: "sagar",
    followers: ["sagar@gmail.com", "sagar1@gmail.com", "sagar3@gmail.com"],
    following: [],
    posts: [
      {
        username: "sagar2@gmail.com",
        text: "hello world Message posted successfully hello world Message posted successfully",
        timestamp: "2024-01-11T10:55:36.768Z",
      },
    ],
  },
  {
    username: "sagar3@gmail.com",
    name: "sagar3",
    password: "sagar",
    followers: ["sagar@gmail.com"],
    following: ["sagar4@gmail.com", "sagar2@gmail.com", "sagar@gmail.com"],
    posts: [
      {
        username: "sagar3@gmail.com",
        text: "hello world Message posted successfully hello world Message posted successfully",
        timestamp: "2024-01-11T10:55:42.555Z",
      },
    ],
  },
  {
    username: "sagar4@gmail.com",
    name: "sagar4",
    password: "sagar",
    followers: ["sagar@gmail.com", "sagar1@gmail.com", "sagar3@gmail.com"],
    following: [],
    posts: [
      {
        username: "sagar4@gmail.com",
        text: "hello world Message posted successfully hello world Message posted successfully",
        timestamp: "2024-01-11T10:55:47.702Z",
      },
      {
        username: "sagar4@gmail.com",
        text: "hello world hello world Message posted successfully",
        timestamp: "2024-01-11T10:56:09.356Z",
      },
    ],
  },
];

app.use(bodyParser.json());
var corsOptions = {
  origin: ["http://localhost:3000", "https://omniclient-asqr.onrender.com/"],
};
app.use(cors(corsOptions));

app.post("/signup", (req, res) => {
  const { name, username, password } = req.body;

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = {
    name,
    username,
    password,
    followers: [],
    following: [],
    posts: [],
  };
  users.push(newUser);

  res.status(200).json({
    message: "Signup successful",
    data: newUser,
  });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find((user) => user.username === username);
  if (!existingUser) {
    return res.status(400).json({ error: "User does not exist" });
  }

  if (existingUser.password !== password) {
    return res.status(403).json({ error: "Incorrect Password." });
  }

  res.status(200).json({
    message: "Signin successful",
    data: existingUser,
  });
});

app.get("/get-user", (req, res) => {
  const sortedFeed = users.sort((a, b) => b.timestamp - a.timestamp);

  res.json(sortedFeed);
});

app.get("/user/:id", (req, res) => {
  const username = req.params.id;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ user });
});

// PostMessage
app.post("/post-message", (req, res) => {
  const { username, message } = req.body;

  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Add the message to the user's posts
  user.posts.push({ text: message, timestamp: new Date() });

  // Send the message to all followers
  user.followers.forEach((follower) => {
    const followerUser = users.find((u) => u.username === follower);
    if (followerUser) {
      followerUser.posts.push({ text: message, timestamp: new Date() });
    }
  });

  res.json({ message: "Message posted successfully" });
});

// FollowUser
app.post("/follow-user", (req, res) => {
  const { username, followUsername } = req.body;

  const user = users.find((user) => user.username === username);
  const followUser = users.find((user) => user.username === followUsername);

  if (!user || !followUser) {
    return res.status(404).json({ error: "User not found" });
  }

  // Check if the user is already following
  if (user.following.includes(followUsername)) {
    return res.status(400).json({ error: "Already following this user" });
  }

  // Add the user to the follower's list
  user.following.push(followUsername);
  followUser.followers.push(username);

  res.json({ message: "User followed successfully" });
});

app.get("/feed/:username", (req, res) => {
  const { username } = req.params;

  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const feed = user.posts.concat(
    user.following.reduce((acc, following) => {
      const followerUser = users.find((u) => u.username === following);
      if (followerUser) {
        acc = acc.concat(followerUser.posts);
      }
      return acc;
    }, [])
  );

  const sortedFeed = feed.sort((a, b) => b.timestamp - a.timestamp);

  res.json(sortedFeed);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
