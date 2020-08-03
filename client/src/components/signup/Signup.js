import React,{useState} from 'react'
import {useHistory } from 'react-router-dom'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import './signup.css';

export default function Signup() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();
    
       const PostData = ()=>{ 
        fetch("/register",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email,
                password
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
                 history.push('/login')
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
        <div className="container home">
            <h4 style={{textAlign:"center"}}>SIGNUP</h4>
            <div className="row">
                <div className="col-md-12">
            <div class="form-group">
                <label for="inputAddress">Email ID</label>
                <input type="email" class="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email ID" />
            </div>
            <div class="form-group">
                <label for="inputAddress2">Password</label>
                <input type="password" class="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password"/>
            </div>
    
            <button type="submit" onClick={()=>PostData()} class="btn btn-primary">Signup</button>
        </div>
        </div>
        </div>
    )
}
