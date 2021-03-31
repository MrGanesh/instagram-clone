import React,{useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
function Navbar() {
    const history = useHistory()
    const {state, dispatch} = useContext(UserContext);
    const renderList = () => {
        if(state){
            return [              
                    <li><Link to="/profile">Profile</Link></li>,
                    <li><Link to="/create">Create Post</Link></li>,
                    <li><Link to="/myfollowerspost">My Following Posts</Link></li>,
                    <li> <button className="btn waves-effect waves-light #c62828 red darken-3" 
                    onClick={()=> {
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/signin')
                    }} >Log Out</button>
                    </li>
                ]                  
        }
        else
        {
            return [
                        <li><Link to="/Signin">Signin</Link></li>,
                        <li><Link to="/signup">Signup</Link></li>
                    ]       
        }
    }

    return (
        <div>
            <nav>
                <div className="nav-wrapper white" style={{color: 'black'}}>
                    <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
                    <ul id="nav-mobile" className="right">
                        {renderList()}
                    </ul>
                </div>
            </nav>
        </div>
    )
    
}

export default Navbar
