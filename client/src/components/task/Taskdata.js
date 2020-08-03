import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import './task.css';

import {DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd'


export default function Taskdata(props) {
    const [value,setValue] = useState([])
    const history = useHistory();
    const taskbyid = JSON.parse(localStorage.getItem('user')) 

    useEffect(() => {
        setInterval(() => {
        fetch(`/taskdata/${taskbyid._id}`,{
            method:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json",
            }
        }).then(res=>res.json())
        .then(result=>{
            setValue(result.data)
        })
    },10000)
    },[])

    const deleteData=(id)=>{
        fetch(`/delete/${id}`,{
            method:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json",
            }
        }).then(res=>res.json())
        .then(result=>{
            if(result.error){
                store.addNotification({
                    title: "ERROR",
                    message: result.error,
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
                    message: result.message,
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
        })
    }
    const Edit = (id) => {
        history.push("/tasks/edit/" + id);
      };

    return (
        <div>
            <DragDropContext onDragEnd={(param)=>{
                const srcI = param.source.index;
                const destI = param.destination.index;
                value.splice(destI,0,value.splice(srcI,1)[0]);

                }}>
                <Droppable droppableId="droppable-1">
                    {(provided,_)=>(
                     <div ref={provided.innerRef} {...provided.droppableProps}>
              { value.map((item,i)=>{
                    return (
                        <Draggable key={item._id} draggableId={'draggable-'+ item._id} index={i}>
                            {(provided,snapshot)=>(
                                <li className="list-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                    style={{ ...provided.draggableProps.style, boxShadow:snapshot.isDragging?"0 0 .5rem #666":"none"}}>
                                         <span>{item.name} </span>
                                         <div>
                                         <button
                                             className="btn-delete task-btn"
                                             onClick={() => deleteData(item._id)}
                                             >
                                             <i className="fas fa-trash-alt"></i>
                                         </button>{' '}
                                         <button className="btn-edit task-btn" onClick={() => Edit(item._id)}>
                                             <i className="fas fa-pen"></i>
                                           </button>
                                         </div>
                                       </li>
                                 )}
                                         
                        </Draggable>
                        )  
                }) }
                {provided.placeholder}
                </div>
                )}
                </Droppable>
                </DragDropContext>
            
        </div>
    )
}
