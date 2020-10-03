import React from 'react'
import '@testing-library/jest-dom/extend-expect'
// eslint-disable-next-line no-unused-vars
import { render ,fireEvent, prettyDOM } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />', () => {

  test ('check the form calls the event handler  with the right details when a new blog is created', () => {

    // mock createBlog event handler
    const addBlog = jest.fn()
    const component = render(
      <BlogForm addBlog={addBlog} />
    )
    const title = component.container.querySelector('#title')
    const form = component.container.querySelector('form')

    // simulate changing data in the form input field
    fireEvent.change(title, {
      target: { value: 'The wise knows how to make himself fool' }
    })

    //simulate submitting the form
    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect (addBlog.mock.calls[0][0].title).toBe('The wise knows how to make himself fool')
    //console.log(addBlog.mock.calls)
  })

})