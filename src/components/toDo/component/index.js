import React from 'react'
import "../style.css";

const CardTodo = ({text}) => {
  return (
    <div className='todo-card'><p>{text}</p></div>
  )
}

export default CardTodo