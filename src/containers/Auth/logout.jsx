import React, {useState,useEffect} from 'react'


function logout(props) {
    const logout = () => {
        localStorage.removeItem('user');
        history.push('/');
      };

   useEffect(() => {
    if (user.id && (history.location.pathname === '/login' || history.location.pathname === '/') ){
        if (user.role === '1') {
            history.push('/root')
        } else if (user.role === '2') {
          history.push('/admin')
        } else {
          history.push('/');
        }
    }
  }, [history])


  
    return (
        <div>
          
        </div>
    )
}


export default logout

