import { Tag, List, Switch, Button, Tooltip, Popconfirm } from "antd";
import { CheckOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { TodoProps } from "./Models/TodoProps";
import TodoEdit from "./TodoEdit";
import './item.scss';
import React from "react";

const Todo = ({todo, onTodoToggle, onTodoRemoval}: TodoProps) => {
    return(
        <List.Item

        actions={[
            <Tooltip
                title={todo.completed ? `Mark as not completed` : `Mark as completed`}>
                    <Switch
                        className="todo-Switch"
                        checkedChildren={<CheckOutlined/>}
                        unCheckedChildren={<CloseOutlined/>}
                        onChange={() => onTodoToggle(todo)}
                        defaultChecked={todo.completed}
                        />
                </Tooltip>,
                <TodoEdit id={todo.id} title={todo.title} completed={todo.completed} />,
                <Popconfirm
                title={"Do you really want to delete?"}
                onConfirm={() => {
                    onTodoRemoval(todo);
                }}>
                <Button 
                className="todo-Delete"
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                />
                </Popconfirm>  
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
            
            </div>
        </List.Item>
    )
}

export default Todo;
