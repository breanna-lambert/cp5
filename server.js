const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];  
const knex = require('knex')(config);



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/blogPosts', (req, res) => {
  knex('blogposts').select('text','important').then(stuff => {
    res.status(200).json({data:stuff});
  });
});

/*app.get('/api/blogPosts', (req, res) => {
  res.send(blogPosts);
});*/

app.post('/api/blogPosts', (req, res) => {
  knex('blogposts').insert({id: req.body.id, text: req.body.text, important: req.body.important
  }).then(something => {
    res.status(200).json({id: req.body.id, text: req.body.text, important: req.body.important});
  });
});


/*app.post('/api/blogPosts', (req, res) => {
  id = id + 1;
  let blogPost = {id:id, text:req.body.text, important:req.body.important};
  blogPosts.push(blogPost);
  res.send(blogPost);
});
*/
app.put('/api/blogPosts/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let blogMap = blogPosts.map(blogPost => { return blogPost.id; });
  let index = blogMap.indexOf(id);
  let blogPost = blogPosts[index];
  blogPost.important = req.body.important;
  blogPost.text = req.body.text;
  //console.log(blogPost);
  //console.log(req.body);
  res.send(blogPost);
});

app.delete('/api/blogPosts/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = blogPosts.map(blogPost => { return blogPost.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that blogPost doesn't exist");
    return;
  }
  blogPosts.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));








/*
app.put('/api/blogPosts/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let blogPostsMap = blogPosts.map(blogPost => { return blogPost.id; });
  let index = blogPostsMap.indexOf(id);
  let blogPost = blogPosts[index];
  blogPost.text = req.body.text;
  blogPost.important = req.body.important;
  res.send(blogPost);
});
app.put('/api/blogPosts/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let blogPostMap = blogPosts.map(blogPost => { return blogPost.id; });
  let index = blogPostMap.indexOf(id);
  let blogPost = blogPosts[index];
  blogPost.important = req.body.important;
  blogPost.text = req.body.text;
  res.send(blogPost);
});*/