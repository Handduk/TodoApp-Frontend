import React from "react";
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from "antd";
import { TodoProps } from "./Models/TodoProps";

const Todo = ({todo}: TodoProps) => {
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
        </List.Item>
    )
}

export default Todo;