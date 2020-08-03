import React,{useState,useContext} from 'react'
import {useHistory } from 'react-router-dom'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import './login.css';
import {UserContext} from '../../App'

export default function Login() {
    const {state,dispatch} = useContext(UserContext)
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();
    
       const PostData = ()=>{ 
        fetch("/signin",{
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
            if(!data.error){
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                store.addNotification({
                    title: "Congratulate",
                    message: "Loged In Succesfully",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 2000
                      }
                })
                history.push('/task')
            }
             else{
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
            <h4 style={{textAlign:"center"}}>Login</h4>
            <div className="row">
                <div className="col-md-12">
            <div class="form-group">
                <label for="inputEmail4">Email</label>
                <input type="text" class="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Name"/>
            </div>
            
           
            <div class="form-group">
                <label for="inputAddress2">Password</label>
                <input type="password" class="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
            </div>
    
            <button type="submit" onClick={()=>PostData()} class="btn btn-primary">Login</button>
        </div>
        </div>
        </div>
    )
}
