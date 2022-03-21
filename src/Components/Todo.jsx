import React, { useState } from "react";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState([]);
  const [loading, setIsLoading] = useState(true)
  const [error,setIsError]  = useState(false)
  const [page, setPage] = useState(1);
  const [count,setCount] = useState(0)

  React.useEffect(()=>{
    getData();
  },[page])


  const getData = () =>{
      fetch(`http://localhost:3001/todos?_page=${page}&_limit=3`)
      .then((res)=>res.json())
      .then((res)=>setTodo(res))
      .catch((err)=>setIsError(true))
      .finally(()=>setIsLoading(false))
  }

  const handleAdd = () => {
    const payload = {
      title,
      status: false,
    };
   
    setCount(count+1)
    const jsonpayload = JSON.stringify(payload)
    fetch(`http://localhost:3001/todos?_page=${page}&_limit=3`, {
      method: "POST",
      body: jsonpayload,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res)=>{
      getData();
    }).then((err)=>setIsError(false))
    .finally(()=>setIsLoading(false))
  };
//   console.log("count" + count)
  return loading ? <div>Loading......</div> : error ? <div>...Error....Something went Wrong...</div>:(
    <div>
      <h1>Todo List</h1>
      <input
        placeholder="Add Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>SAVE</button>
      { todo.map((item,idx)=>{
        return<div key={idx}>{item.title}</div>
      })}
      <button onClick={()=>setPage(page-1)} disabled={ page === 1}>PREV</button>
      <button onClick={()=>setPage(page+1)} disabled={ page === Math.ceil(count/3)}>NEXT</button>
    </div>
  );
};

export { Todo };
