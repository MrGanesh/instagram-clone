import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
function Home() {
    const [data,setData] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(() => {
        fetch('/getsubpost',{
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem('jwt')             
            }
        }).then(res => res.json())
        .then(result => 
            {console.log(result)
            setData(result.posts)
        console.log(data)
    })
    },[])

    const likePosts = (id) => {
        fetch('/like',{
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " +localStorage.getItem('jwt')

            },
            body: JSON.stringify({
                postId: id,
            })
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.map(item => {
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData) 
        }).catch(err =>console.log(err));
    }
    const unlikePosts = (id) => {
        fetch('/unlike',{
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " +localStorage.getItem('jwt')

            },
            body: JSON.stringify({
                postId: id,
            })
        }).then(res => res.json())
        .then(result => 
            {
                console.log(result)
                const newData = data.map(item => {
                    if(item._id == result._id){
                        return result
                    }else{
                        return item
                    }
                })
                setData(newData)
            }).catch(err =>console.log(err));
    }

    const makeComment = (text,postId) => {
        fetch('/comment',{
            method:'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId,
                text,
            })
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.map(item => {
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err =>console.log(err));
        // })
    }


    const deletePost = (postId) =>{
        fetch(`/delete/${postId}`,{
            method: 'delete',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            }

        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.filter(item => {
               
                    return item._id !== result._id
               
            })
            setData(newData)
        })
    }

    return (

        <div className="home">
            {
                data.map((item)=>{
                    return(
                        <div className="card home-card" key={item._id}>
                        <h6 style={{padding: "6px"}}><Link to={item.postedBy._id !== state._id ? "/profile/"+item.postedBy._id : "/profile"}>{item.postedBy.name}</Link> {item.postedBy._id == state._id && <i className="material-icons" style={{float:"right"}} onClick={() => {deletePost(item._id)}}>delete</i> }</h6>
                        <div className="card image">
                             <img src={item.photo} alt="" 
                             />
                        </div>
                        <div className="card-content">
                        <i className="material-icons" style={{color:'red'}}>favorite</i>
                        {item.likes.includes(state._id) ? 
                            <i className="material-icons" onClick={() => {unlikePosts(item._id)}}>thumb_down</i>
                             :               
                            <i className="material-icons" onClick={() => {likePosts(item._id)}}>thumb_up</i>
                            
                        }   
                            <h6>{item.likes.length} Likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                          
                            {
                                item.comments.map(record => {
                                    return(
                                        <h6 key={record._id}><span><strong>{record.postedBy.name}</strong></span> : {record.text}</h6>
                                    )
                                })
                            }
                            <form onSubmit={(e) => {
                                e.preventDefault();
                               
                                makeComment(e.target[0].value, item._id)
                            }}>
                                <input type="text" placeholder="Add a comment" />
                            </form>
                           
                        </div>
         
                    </div>
                    )
                })
            }

            
        </div>
    )
}

export default Home
