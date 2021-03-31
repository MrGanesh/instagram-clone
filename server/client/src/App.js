import React,{useEffect,createContext, useReducer, useContext} from 'react'
import Navbar from "./component/Navbar";
import './App.css'
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Home from './component/screens/Home';
import Signin from './component/screens/Signin';
import Profile from './component/screens/Profile';
import Signup from './component/screens/Signup';
import CreatePost from './component/screens/CreatePost';
import UserProfile from './component/screens/UserProfile'
import { initialState, reducer } from './reducers/userReducer';
import SubscribeUserPost from './component/screens/SubscribeUserPost'
export const UserContext = createContext();

 const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse( localStorage.getItem('user') )
    if(user){  
      dispatch({type:"USER",payload:user})   
      // history.push('/')
    }
    else
    {
      history.push('/signin')
    }
  },[])
  return(
    <Switch>
         <Route exact path="/">
           <Home />
        </Route>
        <Route path="/signin">
            <Signin />
        </Route>
        <Route path="/signup">
            <Signup />
        </Route>
        <Route exact path="/profile">
            <Profile />
        </Route>
        <Route path="/create">
        <CreatePost />
        </Route>
        <Route path="/profile/:userid">
        <UserProfile />
        </Route>
        <Route path="/myfollowerspost">
        <SubscribeUserPost />
        </Route>
   
    </Switch>
  )
}


function App() {
  const [state,dispatch] = useReducer(reducer, initialState)
  return (
  
    <UserContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
     <Navbar />
     <Routing />
    </BrowserRouter>
    </UserContext.Provider> 
   
  );
}

export default App;
