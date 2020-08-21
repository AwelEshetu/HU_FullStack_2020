import React from 'react';
import Content from './Content';
import Header from './Header';

const Course = ({courses}) => {
    console.log('course passed ',courses)
    return (
        <div>
            <h1>Web development curriculum</h1>
            {
                courses.map(course=>
                        <div key={course.id}>
                        <Header course={course} />
                        <Content course={course} />
                        </div>        
                )
            }
          
        </div>
        
    )
}

export default Course;