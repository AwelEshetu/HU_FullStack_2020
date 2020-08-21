import React from 'react';
import Part from './Part';
import Total from './Total';

const Content =({course}) => {
    return(
        <>
        <table>
            <tbody>
            <Part parts={course.parts} />
            <Total parts={course.parts} />
            </tbody>
        </table>
        
        </>
        
    )
}

export default Content;