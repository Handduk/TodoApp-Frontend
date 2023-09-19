import { useState } from "react";
import { Tag, List, Switch, message } from "antd";
import { TodoProps } from "./Models/TodoProps";
import { loadTodos, updateTodoStatus } from "../Services/todoServices";
import { ITodo } from "./Models/todo";

const Todo = ({todo}: TodoProps) => {
    const [todos, setTodos] = useState([]);
    
    const refresh =async () => {
        await loadTodos()
        .then (json => {
            setTodos(json);
        });
    }

    const handleStatus = async (todo: ITodo) => {
        todo.completed = !todo.completed;
        try{
            await updateTodoStatus(todo);
            refresh();
            message.success(`Your todo is now ${todo.completed ? "completed!" : "incomplete"}`);
            return todo;
        } catch(error) {
            console.error(error);
        }
    };

    return(
        <List.Item

        className="list-item"
        key={todo.id}
        >
            <div className="todo-item">
                <Tag color={todo.completed ? 'green' : 'red'} className="todo-tag">
                    {todo.title}
                </Tag>
            </div>
            {/**TODO: add function to complete todo tasks, also change color depending if the task is completed or not */}
            <div className="todo-check">
                <Switch 
                onClick={() => handleStatus(todo)}
                checked={todo.completed}
                unCheckedChildren={todo.completed}
                defaultChecked
                className="todo-switch"
                />
            </div>
        </List.Item>
    )
}

export default Todo;
