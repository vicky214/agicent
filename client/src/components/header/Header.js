import React,{useContext,useRef,useEffect,useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import './header.css'
import {UserContext} from '../../App'


export default function Header() {
    const history = useHistory();
    const {state,dispatch} = useContext(UserContext)
    const renderList = ()=>{
        if(state){
            return [
                <li key="1"><Link className="nav-item nav-link" to="/task">Task</Link></li>,
                <li key="2"><button className="btn nav-link nav-item"
                    onClick={()=>{
                        localStorage.clear()
                        history.push('/login')
                        dispatch({type:"CLEAR"})
                    }}
                    >Logout
                    </button>
                    </li>
            ]
        }
        else{
          return [
           <li key="3"><Link className="nav-item nav-link" to="/">Signup </Link></li>,
           <li key="4"><Link className="nav-item nav-link" to="/login">Login</Link></li>
          ]
        }
      }
 

    return (
        <nav className="navbar navbar-expand-lg">
            <Link to={state?"/task":"/login"} className="navbar-brand navd">AGICENT</Link>
            <button className="navbar-toggler navbar-light" style={{backgroundColor:"white"}} type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
               {renderList()}
                </div>
            </div>
        </nav>
    )
}
