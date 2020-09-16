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

blogsRouter.delete('/:id', async ( request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body=request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes

  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter