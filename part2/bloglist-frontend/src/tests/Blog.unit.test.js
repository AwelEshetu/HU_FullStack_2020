import React from 'react'
import '@testing-library/jest-dom/extend-expect'
// eslint-disable-next-line no-unused-vars
import { render ,fireEvent, prettyDOM } from '@testing-library/react'
import Blog from '../components/Blog'

describe ('<Blog />',() => {
  let component
  const blog ={
    author: 'Tanya Khovanova',
    id: '5f75abb56bf7ee4aeca3635e',
    likes: 23,
    title: 'Tanya Khovanova\'s Math Blog',
    url: 'http://blog.tanyakhovanova.com/',
    user: {
      username: 'admin',
      name: 'Adminstrator',
      id: '5f719ca08d64f570146c8e4a'
    }
  }
  const handleLikes = jest.fn()
  const handleRemove = jest.fn()
  const ownBlog = true

  beforeEach(() => {
    component = render(
      <Blog blog={blog} handleLikes={handleLikes} handleRemove ={handleRemove} ownBlog={ownBlog}/>
    )
  })

  test ('renders blog title and author by default',() => {

    expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)
  })

  test ('blog do not render likes and url initial ',() => {
    const element = component.container.querySelector('.detail')
    //console.log(prettyDOM(element))
    expect(element).toHaveStyle('display: none')
  })

  test ('blog renders likes and url after view button is clicked ',() => {

    const button = component.getByText('view')

    //console.log(prettyDOM(button))
    fireEvent.click(button)

    const element = component.container.querySelector('.detail')

    expect(element).not.toHaveStyle('display: none')
  })

  test ('like button is clicked twice, handleLikes called twice ',() => {


    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(handleLikes.mock.calls).toHaveLength(2)
  })
})