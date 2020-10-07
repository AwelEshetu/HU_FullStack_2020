const initialState=false

export const display=(flag)=>{
    return {
         type: 'DISPLAY' ,
         data: {flag}
    }
}

const displayReducer=(state = initialState, action)=>{ 
    //console.log('state now: ', state)
    //console.log('action', action)
    switch(action.type) {
        case 'DISPLAY' :
            
           return action.data.flag
        default:
            return state
    }
}


export default displayReducer