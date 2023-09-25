import { useState } from "react";
import { Tag, List, Switch, message, Button } from "antd";
import { DeleteOutlined, MessageOutlined } from "@ant-design/icons";
import { TodoProps } from "./Models/TodoProps";
import { deleteTodoStatus, loadTodos, updateTodoStatus } from "../Services/todoServices";
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

    const deleteStatus = async (todo: ITodo) => {
        
        console.log("deleteStatus function called");
        try {
            await deleteTodoStatus(todo);
            message.success(`The todo ${todo.title} was deleted.`);
            refresh();
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
            <div className="todo-check">
                <Switch 
                    onClick={() => handleStatus(todo)}
                    checked={todo.completed}
                    unCheckedChildren={todo.completed}
                    defaultChecked
                    className="todo-switch"
                />
            </div>
            <div>
            <Button 
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />} 
                onClick={() => deleteStatus(todo)}
                className="todo-Delete"
            />
            </div>
        </List.Item>
    )
}

export default Todo;
