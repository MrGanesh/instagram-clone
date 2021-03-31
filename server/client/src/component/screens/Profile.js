import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'
function Profile() {
    const [mypics, setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image, setImage] = useState("");
    useEffect(() => {
        fetch('/mypost',{
            headers:{
                'Authorization' : 'Bearer ' +localStorage.getItem('jwt')
            }

        }).then(res=> res.json())
        .then(result => {console.log(result.myPost)
            setPics(result.myPost)   
        })
    },[])

    useEffect(() => {
        if(image){

      
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","saaho-insta")
        
        fetch("https://api.cloudinary.com/v1_1/saaho-insta/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
        //    setUrl(data.url)
           console.log(data)
        //    localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
        //    dispatch({type:"UPDATEPIC", payload:data.url})

                fetch('/updatepic',{
                    method:'put',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+localStorage.getItem('jwt')
                    },
                    body:JSON.stringify({
                        pic:data.url    
                    })
                }).then(res => res.json())
                .then(data => {
                    console.log(data)
                      localStorage.setItem("user",JSON.stringify({...state,pic:data.pic}))
                      dispatch({type:"UPDATEPIC", payload:data.pic})
                })

        })
        .catch(err=>{
            console.log(err)
        })
    }
    },[image])

    const updatePhoto = (file) => {
        setImage(file)
        
    }

    return (
        <div style={{
            maxWidth:"550px",
            margin:"0px auto"
        }}>
            <div style={{ margin:"18px 0",
                  borderBottom:"1px solid grey"}}>
              <div style={{
                  display: 'flex',
                  justifyContent:'space-around',
                 
              }}>
                  <div > 
                      <img  alt=""  style={{width:"160px",height:"160px",borderRadius:"80px"}} 
                      src={state?state.pic: "Loading..."}/>
                      
         
                  </div>
                  
                  <div>
                      <h4><strong>{state?.name}</strong></h4>
                      <h5><strong>{state?.email}</strong></h5>
                      <div style={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          width:'108%'
                      }}>
                         
                          <h6> <strong>{mypics.length} Post </strong></h6> 
                          <h6><strong>{state?state.followers.length : 0} Followers</strong></h6>
                          <h6><strong>{state?state.following.length : 0} Following</strong></h6>
                          
                      </div>

                  </div>
              </div>
           
                      <div className="file-field input-field" style={{margin:"10px"}}>
                <div className="btn #2196f3 blue">
                    <span>Update Profile</span>
                    <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
                </div>

              </div>
              <div className="gallery">
                  {
                      mypics.map(item => {
                          return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
               
                          )
                      })
                  }
                  {/* <img className="item" src="https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                  <img className="item" src="https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                  <img className="item" src="https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                  <img className="item" src="https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                  <img className="item" src="https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                  <img className="item" src="https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                  <img className="item" src="https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                  */}
              </div>
        </div>
    )
}

export default Profile
