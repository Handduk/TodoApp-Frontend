import {Col, Layout, message, Row, Tabs} from 'antd';
import TodosForm from './TodosForm';
import { useCallback, useEffect, useState } from 'react';
import { createTodo, loadTodos, updateTodoStatus, deleteTodo } from '../Services/todoServices';
import { ITodo } from './Models/todo';
import TodoTab from './TodoTab';


const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [todos, setTodos] = useState([]);

    const handleFormSubmit = async (todo : ITodo) => {
        await createTodo(todo);
        onRefresh();
        message.success('Your todo has been added!');
    }

    const handleToggleTodoStatus = async (todo: ITodo) => {
        todo.completed = !todo.completed;
        try{
            await updateTodoStatus(todo);
            refresh();
            message.success(`Your todo is now ${todo.completed ? "completed!" : "incomplete"}`);
            return todo;
        } catch(error) {
            console.error(error);
        }
    }

    const handleRemoveTodo = async (todo: ITodo) => {
        
        if (typeof todo.id !== "undefined" && "id" in todo) {
            await deleteTodo(todo.id);
            onRefresh();
            message.warning(`the todo ${todo.title} was deleted`);
        } 
    }

    const onRefresh = useCallback( async () => {
        setRefreshing(true);
        refresh();
        setRefreshing(false);
    }, [refreshing]);

    const refresh =async () => {
        await loadTodos()
        .then (json => {
            setTodos(json);
        });
    }

    useEffect(() => {
        refresh();
    }, [onRefresh])
    return (
        <Layout>
            <Content style={{ padding: '10px 60px'}}>
                <div className="todolist">
                    <Row>
                        <Col span={15} offset={5}>
                            <h1>Todo List</h1>
                            <TodosForm onFormSubmit={handleFormSubmit} />
                            <br />
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="All" key="all">
                                <TodoTab todos={todos} onTodoToggle = {handleToggleTodoStatus} onTodoRemoval = {handleRemoveTodo}/>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
}

export default TodoList;
