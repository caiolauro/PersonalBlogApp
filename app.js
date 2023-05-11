//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// Mongoose configuration
mongoose.connect("mongodb+srv://caiolauro:UDIPd5uoFAzo03Jy@cluster0.7h2h5fk.mongodb.net/personalblogDB");

const postSchema = new mongoose.Schema({
  postTitle: String,
  postContent: String
});

const Post = mongoose.model("Post", postSchema);

const app = express();

truncate = function (str) {

  return _.truncate(str, { length: 100 });

};

lower = function (str) {

  return _.lowerCase([string = str]);

};

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {

  const posts = Post.find({})
    .then(function (posts) {
      console.log("Posts queried from DB.");
      res.render("home", { homeStartingContent: homeStartingContent, posts: posts });
    })
    .catch(function (err) {
      console.log(err);
    });
  //posts.forEach(function (post) { console.log("New post published: " + post.title) });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {

  const post = new Post({
    postTitle: req.body.title_text,
    postContent: req.body.post_text
  });
  post.save();
  res.redirect("/");
});

app.get("/posts/:postId",
  (req, res) => {

    var postId = req.params.postId;

    Post.findById(postId)
      .then(function (post) {
        try {
          res.render("post", { title: post.postTitle, content: post.postContent });
        }
        catch {
          console.log("Not a match");
          console.log(postTitle);
          console.log(postId);
        }
      })
      .catch(function (err) {
        console.log(err);
      });

  });


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
