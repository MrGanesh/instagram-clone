import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import  {UserContext}  from '../../App'
function Signin() {
  const {state, dispatch} = useContext(UserContext)
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const ValidateUser = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: 'Invalid Email', classes: "#e53935 red darken-1"}) 
  }
  else{
    fetch('/signin', {
      method:'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => res.json())
    .then((data) =>{
      console.log(data)
      if(data.error){
        M.toast({html: data.error, classes: "#e53935 red darken-1"}) 
      }
      else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        M.toast({html:"Signed in Successfully", classes:"#81c784 green lighten-2"})
        history.push('/')
      }
    }).catch(err => console.log(err))
  }
  }

    return (
      <div className="myCard">
        <div className="card auth-card input-field">
          <h2>Instagram</h2>
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className="btn waves-effect waves-light #2196f3 blue" onClick={ValidateUser} >Signin</button>
          <h6>
          <Link to="/signup">Don't have an account?</Link>
          </h6>
         
        </div>
      </div>
    );
}

export default Signin
