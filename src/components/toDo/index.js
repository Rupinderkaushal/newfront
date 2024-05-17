import React from 'react';
import "./style.css";
import CardTodo from './component';

const Todo = () => {
  const text = "jdjiowqdjkowqjdijwiqdwqiodjiwqodiowjdjwqiojdoiwqdowqdwqdijwqijdiowqjdjwqiojdwqi";
  return (
    <div className='todo-handler'>
      <CardTodo text={text}/>
    </div>
  )
}

export default Todo