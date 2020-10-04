describe('Blog app', function() {
  beforeEach(function() {
    //reset database before each test
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Adminstrator',
      username: 'admin',
      password: 'password'
    }
    //save new user for test
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('admin')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Adminstrator logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('admin')
      cy.get('#password').type('wrongpass')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Adminstrator logged in')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('admin')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      //cy.login is custom command which is defined in cypress/support/commands.js
      cy.login( {
        username: 'admin',
        password: 'password'
      })

    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Blog from everywhere')
      cy.get('#blog-author').type('Awel Eshetu')
      cy.get('#blog-url').type('https://github.com/AwelEshetu/HU_FullStack_2020/tree/master/part2')
      cy.get('#create-blog').click()
      cy.contains('Blog from everywhere')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        //cy.createNote is custome command defined in cypress/support/commands.js
        cy.addBlog({
          title: 'Blog from everywhere',
          author: 'Awel Eshetu' ,
          url: 'https://github.com/AwelEshetu/HU_FullStack_2020/tree/master/part2'
        })

        cy.addBlog({
          title: 'Blog from home',
          author: 'Awel' ,
          url: 'https://github.com/AwelEshetu/HU_FullStack_2020/tree/master/part2'
        })

      })

      it.only('it can increase likes', function () {
        cy.contains('Blog from everywhere')
          .contains('view')
          .click()

        cy.contains('likes')
          .contains('like')
          .click()
        cy.contains('likes')
          .contains('1')
      })

      it.only('user can remove a blog he created', function () {
        cy.contains('Blog from everywhere')
          .contains('view')
          .click()

        cy.contains('remove')
          .click()

        cy.contains('Blog from everywhere').should('not.exist')
      })

      it.only('blogs are sorted according to most likes', function () {
        cy.contains('Blog from home')
          .contains('view')
          .click()

        cy.contains('Blog from home')
          .contains('likes')
          .contains('like')
          .click()
        cy.contains('Blog from home')
          .contains('likes')
          .contains('1')

        cy.contains('Blog from everywhere')
          .contains('likes')
          .contains('0')
      })
    })
  })

})