import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'

type Todo = {
  id: number;
  text: string;
  done: number | null;
  cancelled: number | null;
  created: number;
}

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const changeNewTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  }

  const handleInsert = () => {
    if (newTodo !== '') {
      const id = todoList.sort((a, b) => a.id - b.id)[todoList.length - 1]?.id ?? -1;
      const newTodoList = [...todoList, 
        { id: id + 1, text: newTodo, created: Date.now(), done: null, cancelled: null }];
      setTodoList(newTodoList);
      localStorage.setItem('todoList', JSON.stringify(newTodoList));
    }
    setNewTodo('');
  }

  const setDone = (id: number) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        todo.done ? todo.done = null : todo.done = Date.now();
      }
      return todo;
    });
    setTodoList(newTodoList);
    localStorage.setItem('todoList', JSON.stringify(newTodoList));
  }

  const setCancel = (id: number) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        todo.cancelled ? todo.cancelled = null : todo.cancelled = Date.now();
      }
      return todo;
    });
    setTodoList(newTodoList);
    localStorage.setItem('todoList', JSON.stringify(newTodoList));
  }

  const setDelete = (id: number) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
    localStorage.setItem('todoList', JSON.stringify(newTodoList));
  }

  useEffect(() => {
    const loadTodoList = localStorage.getItem('todoList');
    if (loadTodoList) {
      setTodoList(JSON.parse(loadTodoList));
    }
  }, [])
  

  return (
    <div className="App">
      <div className="container">
        <div className="new-todo">
          <input type="text" value={newTodo} placeholder='Add a task'
            onChange={changeNewTodo} 
            onKeyDown={(e) => (e.key === 'Enter') ? handleInsert() : null} />
          <button onClick={handleInsert}>+</button>
        </div>
        <div className="list">
          <ul>
            {
              todoList.sort((a, b) => {
                if (a.cancelled || b.cancelled)
                  if (!a.cancelled) return -1;
                  else if (!b.cancelled) return 1;
                  else return b.cancelled - a.cancelled;
                if (a.done || b.done) 
                  if (!a.done) return -1;
                  else if (!b.done) return 1;
                  else return b.done - a.done;
                return b.created - a.created;
              }).map((todo) => (
                <li key={todo.id} className={`${todo.done && 'done'} ${todo.cancelled && 'cancelled'}`}>
                  <div className="item-text">
                    {todo.text}
                  </div>
                  <span className="item-control">
                    { !todo.done && !todo.cancelled &&
                      <button className="check" onClick={() => setDone(todo.id)}>O</button>}
                    { todo.done && !todo.cancelled &&
                      <button className="uncheck" onClick={() => setDone(todo.id)}>U</button>}
                    { !todo.done && !todo.cancelled &&
                      <button className="cancel" onClick={() => setCancel(todo.id)}>X</button>}
                    { !todo.done && todo.cancelled &&
                      <button className="restore" onClick={() => setCancel(todo.id)}>R</button>}
                    { !todo.done && todo.cancelled &&
                      <button className="delete" onClick={() => setDelete(todo.id)}>D</button>}
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
