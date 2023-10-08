import React from "react";
import { useState } from "react";
import { ITodo } from "./Models/todo";
import { useQueryClient } from "react-query";
import { updateTodo } from "../Services/todoServices";
import { Button, Form, Input, Modal, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

const TodoEdit = (todo : ITodo) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        setIsModalOpen(false);
        const editedTodo: ITodo = {
            id: todo.id,
            title: form.getFieldValue("title"),
            completed: todo.completed,
        };
        if (editedTodo.title != null) {
            await updateTodo(editedTodo);
            queryClient.invalidateQueries("todos");
        }
        else {
            message.warning("Your todo has not been updated.");
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        <Button onClick={showModal} className="edit-button">
            <EditOutlined/>
        </Button>
        <Modal title="Edit" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
            form={form}
            initialValues={ todo }>
                <Form.Item name={'title'}>
                    <Input value={todo.title} /> 
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
}

export default TodoEdit;