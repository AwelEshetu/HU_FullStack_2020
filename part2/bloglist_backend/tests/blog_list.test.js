const supertest = require('supertest')
const mongoose = require('mongoose')
//const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe ('blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('verifies that the unique identifier property of the blog posts is named id',async () => {
    const blogs = await api.get('/api/blogs')

    for(let blog of blogs.body){
      expect(blog.id).toBeDefined()
    }

  })

  test('a valid blog can be added ', async () => {
    const newBlog = {

      title: 'React patterns suck!',
      author: 'Michael Chan Wong',
      url: 'https://reactpatterns.com/',
      likes: 0,

    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'React patterns suck!'
    )
  })

  test('verifies that if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {

      title: 'React patterns are really cool!',
      author: 'Michael Chan dung',
      url: 'https://reactpatterns.com/'

    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const savedBlog = blogsAtEnd.filter(n => n.title===newBlog.title)[0]
    expect(savedBlog.likes).toBe(0)
  })

  test('verifies that if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 ', async () => {
    const newBlog = {
      author: 'Michael Funga',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('succeeds in updating a specific blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdated = blogsAtStart[0]

    const updatedBlog = {
      title:blogToUpdated.title,
      author:blogToUpdated.author,
      url:blogToUpdated.url,
      likes:blogToUpdated.likes + 2
    }

    await api
      .put(`/api/blogs/${blogToUpdated.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blog = blogsAtEnd.find(blog => blog.id===blogToUpdated.id)

    expect(blog.likes).toBe(updatedBlog.likes)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secretpassword', 10)
    const user = new User({ username: 'admin', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'awel',
      name: 'Awel Eshetu',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'admin',
      name: 'Adminstrator',
      password: 'password',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})