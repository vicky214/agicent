import React,{useState} from 'react'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import './task.css';

export default function Taskform() {
    const [name,setName] = useState("")
    const PostData = ()=>{ 
        fetch("/task",{
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
            <div className="container">
                <h4 style={{textAlign:"center"}}>Task Manager</h4>
                <div className="row">
                    <div className="col-md-12">
                <div class="form-group">
                    <input type="text" placeholder="Add Task..." value={name} onChange={(e)=>setName(e.target.value)} required className="form-control" />
                </div>
                <button type="submit" onClick={()=>PostData()} class="btn btn-primary mb-1">Add</button>
                </div>
                </div>
            </div>
    )
}
