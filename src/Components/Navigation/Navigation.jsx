import React from 'react'

const Navigation = ({onRouteChange, onLinkTag}) => {
 if(onLinkTag){
  return (
    <nav style={{display: 'flex', justifyContent:'flex-end'}}>
     <p 
     onClick={()=>onRouteChange('signIn')}
     className='f3 link dim black underline pa3 pointer'> 
     Sign Out</p>
    </nav>)
}
else {
  return(
    <nav style={{display: 'flex', justifyContent:'flex-end'}}>
     <p 
     onClick={()=>onRouteChange('signIn')}
     className='f3 link dim black underline pa3 pointer'> 
     Sign in</p>
     <p 
     onClick={()=>onRouteChange('register')}
     className='f3 link dim black underline pa3 pointer'> 
     register</p>
    </nav>)
  
}
 }
 

export default Navigation