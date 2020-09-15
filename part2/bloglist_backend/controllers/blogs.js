const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs= await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)


  if(!request.body.title && !request.body.url){
    response.status(400).end()
  }else{
    const savedBlog = await blog.save()
    response.json(savedBlog)
  }


})

module.exports = blogsRouter