// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev,cur) => prev + (cur.likes || 0 ), 0)
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.filter(blog => blog.likes === Math.max(...blogs.map(blog => blog.likes)))
  return favorite[0]
}

const mostBlogs = (blogs) => {
  const authors = []
  for( let key of [...new Set(blogs.map(blog => blog.author))]){
    let counter=0
    for(let blog of blogs ){
      if(blog.author === key){
        counter+=1
      }
    }
    authors.push({ author : key, blogs : counter })
  }
  return authors.filter(author => author.blogs === Math.max(...authors.map(author => author.blogs)) )[0]
}

const mostLikes = (blogs) => {
  const authors = []
  for(let key of [...new Set(blogs.map(blog => blog.author))]){
    const totalLikes= blogs.filter(blog => blog.author===key).reduce((prev,cur) => prev + (cur.likes ||0),0)
    authors.push({ author:key, likes:totalLikes })
  }

  return authors.filter(author => author.likes === Math.max(...authors.map(author => author.likes)))[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}