import { useState } from "react";
import { Tag, List, Switch, message, Button, Tooltip } from "antd";
import { CheckOutlined, CloseOutlined, DeleteOutlined, MessageOutlined } from "@ant-design/icons";
import { TodoProps } from "./Models/TodoProps";
import { deleteTodoStatus, loadTodos, updateTodoStatus } from "../Services/todoServices";
import { ITodo } from "./Models/todo";

const Todo = ({todo, onTodoToggle}: TodoProps) => {
    const [todos, setTodos] = useState([]);
    
    const refresh =async () => {
        await loadTodos()
        .then (json => {
            setTodos(json);
        });
    }

    

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

        actions={[
            <Tooltip
                title={todo.completed ? `Mark as not completed` : `Mark as completed`}>
                    <Switch
                        checkedChildren={<CheckOutlined/>}
                        unCheckedChildren={<CloseOutlined/>}
                        onChange={() => onTodoToggle(todo)}
                        defaultChecked={todo.completed}
                        />
                </Tooltip>  
        ]}

        className="list-item"
        key={todo.id}
        >
            <div className="todo-item">
                <Tag color={todo.completed ? 'green' : 'red'} className="todo-tag">
                    {todo.title}
                </Tag>
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
