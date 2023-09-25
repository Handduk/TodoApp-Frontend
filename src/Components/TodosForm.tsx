import React from 'react';
import { Button, Col, Form, Input, Row } from "antd";
import {PlusCircleFilled} from '@ant-design/icons';
import { ITodo } from './Models/todo';
import { TodosFormProps } from './Models/TodosFromProps';

const TodosForm: React.FC<TodosFormProps> = (props) => {
    const [form] = Form.useForm();
    const { onFormSubmit } = props;
    
    const onFinish = () => {
        const todo: ITodo = {
            title: form.getFieldValue('title'),
            completed: false,
        };
        onFormSubmit(todo);
        form.resetFields();
    }
    return (
        <Form
         form={form}
         onFinish={onFinish}
         layout="vertical"
         className="todo-form">
            <Row
            gutter={20}>
            <Col xs={24} sm={24} md={17} lg={19} xl={20}>
                <Form.Item
                name="title"
                rules={[{ required: true, message: "Please enter a title"}]}>
                    <Input placeholder="What do you need to do?" />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={7} lg={5} xl={4}>
                <Button type="primary" htmlType="submit" block>
                    <PlusCircleFilled /> Add todo
                </Button>
            </Col>
         </Row>
        </Form>
        )
}

export default TodosForm;