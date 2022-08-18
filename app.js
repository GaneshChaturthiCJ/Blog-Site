//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent1 = "Twenty-five years ago that little robot, a six-wheeled rover named Sojourner, made it — becoming the first in a string of rovers built and operated by NASA to explore Mars. Four more NASA rovers, each more capable and complex than the last, have surveyed the Red Planet. The one named Curiosity marked its 10th year of cruising around on August 5. Another, named Perseverance, is busy collecting rocks that future robots are supposed to retrieve and bring back to Earth. China recently got into the Mars exploring game, landing its own rover, Zhurong, last year.";
const homeStartingContent2 = "Other Mars spacecraft have done amazing science from a standstill, such as the twin Viking landers in the 1970s that were the first to photograph the Martian surface up close and the InSight probe that has been listening for Marsquakes shaking the planet’s innards (SN Online: 2/24/20). But the ability to rove turns a robot into an interplanetary field geologist, able to explore the landscape and piece together clues to its history. Mobility, says Kirsten Siebach, a planetary scientist at Rice University in Houston, “makes it a journey of discovery.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {


  res.render("home", {
    startingContent1: homeStartingContent1,
    StartingContent2: homeStartingContent2,
    posts: posts
  });

});


app.get("/about", function(req, res) {

  res.render("about", {
    aboutPageContent: aboutContent
  });

});


app.get("/contact", function(req, res) {
  res.render("contact", {
    contactPageContent: contactContent
  });

});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {


  const post = {
    content: req.body.postBody,
    title: req.body.postTitle
  };



  posts.push(post);
  res.redirect("/");


});


app.get("/posts/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);  //lodash is used

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);  //lodash is used

    if (requestedTitle === storedTitle) {

        res.render("post",  {
          title : post.title ,
          content : post.content });

    }
  });

});





 let port = process.env.PORT;
 if (port == null || port == "") {
   let port = 3000;
 }
//app.listen(port);


app.listen(port, function(){
  console.log("Server is up and running successfully");
});
