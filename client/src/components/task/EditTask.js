import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import './task.css';

const EditTask = props => {
  const id = props.match.params.id
  const history = useHistory();

  const [name, setName] = useState("")
  useEffect(() => {
    fetch(`/tasks/${id}`,{
        method:"get",
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt"),
            "Content-Type":"application/json",
        }
    }).then(res=>res.json())
    .then(result=>{
        setName(result)
    })
  }, [])

  const PostData = ()=>{ 
    fetch(`/tasks/edit/${id}`,{
        method:"post",
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt"),
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            name
        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
            store.addNotification({
                title: "ERROR",
                message: data.error,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000
                  }
            })
         }
         else{
            store.addNotification({
                title: "Congratulate",
                message: data.message,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000
                  }
            })
            history.push("/task")
         }            
    })
    .catch(err=>{
        console.log(err)
    })
    .catch(err=>{
        console.log(err)
    }) 
}
  return (
        <div className="container taskeditform">
        <h4 style={{textAlign:"center"}}>Edit Task Manager</h4>
        <div className="row">
            <div className="col-md-12">
        <div class="form-group">
            <input type="text" placeholder="Edit Task..." value={name} onChange={(e)=>setName(e.target.value)} required className="form-control" />
        </div>
        <button type="submit" onClick={()=>PostData()} className="btn btn-primary mb-1">Edit</button>
        </div>
        </div>
    </div>

  );
}
export default EditTask