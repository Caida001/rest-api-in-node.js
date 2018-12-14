const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const routes = require('./routes')

let store = {}
store.posts = []


let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())


app.use((req, res, next) => {
  req.store = store;
  next();
})


/*
GET and POST /posts
PUT and DELETE /posts/:postId/
GET and POST /posts/:postId/comments
PUT and DELETE /posts/:postId/comments/commentId
*/

app.get('/posts', (req, res) => {
  routes.posts.getPosts(req, res);
})

app.post('/posts', (req, res) => {
  routes.posts.addPost(req, res);
})

app.put('/posts/:postId', (req, res) => {
  routes.posts.updatePost(req, res);
})

app.delete('/posts/:postId', (req, res) => {
  routes.posts.removePost(req, res);
})

app.get('/posts/:postId/comments', (req, res) => {
  routes.comments.getComments(req, res);
})

app.post('/posts/:postId/comments', (req, res) => {
  routes.comments.addComment(req, res);
})

app.put('/posts/:postId/comments/:commentId', (req, res) => {
  routes.posts.updateComment(req, res);
})

app.delete('/posts/:postId/comments/:commentId', (req, res) => {
  routes.posts.removeComment(req, res);
})

console.log("listening on port 3000")
app.listen(3000)
