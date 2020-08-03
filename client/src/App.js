import React,{useContext,useEffect,useReducer,createContext} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Task from './components/task/Task';
import EditTask from './components/task/EditTask'
import {reducer,initialState} from './reducer/useReducer'
import ReactNotification from 'react-notifications-component'
export const UserContext = createContext()

  
const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
           history.push('/login')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/task" component={Task} />
      <Route path="/tasks/edit/:id" component={EditTask} />
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Header />
      <ReactNotification />
      <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

