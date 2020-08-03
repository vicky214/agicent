import React from 'react'
import Taskform from './Taskform'
import './task.css';
import Taskdata from './Taskdata'
export default function Task() {
    return (
            <div className="taskform">
            <Taskform />
            <Taskdata />
            </div>
           
        
    )
}
