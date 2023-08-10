import { useState } from "react";

type TodoItemT = {
  content: string;
  finished: boolean;
};

function TodoItem(
  prop: TodoItemT & {
    updateFinished: (finished: boolean) => void;
  }
) {
  return (
    <li style={{ display: "flex", flexDirection: "row" }} className="red">
      <input
        type="checkbox"
        onChange={(e) => prop.updateFinished(e.target.checked)}
        checked={prop.finished}
      ></input>
      <p style={{color: prop.finished ? "green" : "black"}}>{prop.content}</p>
    </li>
  );
}

function TodoList() {
  const [inputContent, setInput] = useState("");
  const [todoList, setTodo] = useState<TodoItemT[]>([]);
  function updateFinished(index: number, finished: boolean) {
    const before = todoList.slice(0, index);
    const after = todoList.slice(index + 1);
    const toUpdate = todoList[index];
    const updated: TodoItemT = { content: toUpdate.content, finished };
    setTodo([...before, updated, ...after]);
  }
  return (
    <>
      <ul>
        {todoList.map((item, index) => (
          <TodoItem
            key={index}
            content={item.content}
            finished={item.finished}
            updateFinished={(finished) => updateFinished(index, finished)}
          ></TodoItem>
        ))}
      </ul>
      <div>
        <input
          value={inputContent}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="要做的事情"
        ></input>
        <button
          onClick={() => {
            setTodo([...todoList, { content: inputContent, finished: false }]);
            setInput("");
          }}
        >
          添加
        </button>
      </div>
    </>
  );
}

export default TodoList;
