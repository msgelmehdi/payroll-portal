import { useLiveQuery } from "dexie-react-hooks";
import { TodoList } from "../TodoList";
import { db } from "../db";
import { TodoItemView } from "./TodoItemView";
import { AddTodoItem } from "./AddTodoItem";

interface Props {
  todoList: TodoList;
}

export function TodoListView({ todoList }: Props) {
  const items = useLiveQuery(
    () => db.todoItems.where({ todoListId: todoList.id }).toArray(),
    [todoList.id]
  );

  if (!items) return null;

  return (
    <div className="box">
      <div className="grid-row">
        <h2>{todoList.title}</h2>
        <div className="todo-list-trash">
          <a onClick={() => db.deleteList(todoList.id!)} title="Delete list">
            delete
          </a>
        </div>
      </div>
      hello
      <div>
        {items.map((item) => (
          <TodoItemView key={item.id} item={item} />
        ))}
      </div>
      <div>
        <AddTodoItem todoList={todoList} />
      </div>
    </div>
  );
}
