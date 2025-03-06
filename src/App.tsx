import React, { useState, FormEvent } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      <h1>Todoリスト</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="新しいタスクを入力"
          required
        />
        <button type="submit">追加</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <span>{todo.text}</span>
            <div>
              <input
                type="time"
                key={todo.id}
                className={todo.completed ? "completed" : ""}
              />
              <button onClick={() => toggleComplete(todo.id)}>完了</button>
              <button onClick={() => deleteTodo(todo.id)}>削除</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
