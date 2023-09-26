import {Col, Layout, message, Row, Tabs} from 'antd';
import TodosForm from './TodosForm';
import { useCallback, useEffect, useState } from 'react';
import { createTodo, loadTodos, updateTodo, deleteTodo } from '../Services/todoServices';
import { ITodo } from './Models/todo';
import TodoTab from './TodoTab';
import { useMutation, useQuery, useQueryClient} from 'react-query';

const baseUrl = `${process.env.REACT_APP_API_URL}/api/Todos`;

const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList = () => {
    const [activeTodos, setActiveTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);

    const queryClient = useQueryClient();

    const { isLoading, isError, data} = useQuery("todos", async () => {
        const data = await loadTodos();
        setActiveTodos(data.filter((todo : ITodo) => todo.completed === false));
        setCompletedTodos(data.filter((todo : ITodo) => todo.completed === true));
        return data;
    });

    const createMutation = useMutation(createTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
            message.success("Your Todo has been added!");
        }
    })

    const updateMutation = useMutation(updateTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
            message.info("Todo updated!");
        }
    })

    const deleteMutation = useMutation(deleteTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos")
            message.warning("Todo deleted.");
        },
        onError: () => {
            console.log("Error deleting todo");
        }
    })

    const handleFormSubmit = async (todo : ITodo) => {
        createMutation.mutate(todo);
    }

    const handleToggleTodoStatus = async (todo: ITodo) => {
        todo.completed = !todo.completed;
        updateMutation.mutate(todo);
    }

    const handleRemoveTodo = async (todo: ITodo) => {
        
        if (typeof todo.id !== "undefined" && "id" in todo) {
            deleteMutation.mutate(todo.id);
        } 
    }

    return (
        <Layout>
            <Content style={{ padding: '10px 60px'}}>
                <div className="todolist">
                    <Row>
                        <Col span={15} offset={5}>
                            <h1>Todo List</h1>
                            <TodosForm onFormSubmit={handleFormSubmit} />
                            <br />

                            {isLoading && <div>Loading todos from the server...</div>}
                            {isError && <div>Something went wrong</div>}

                            <Tabs defaultActiveKey="all">
                                <TabPane tab="All" key="all">
                                    <TodoTab todos={data} onTodoToggle = {handleToggleTodoStatus} onTodoRemoval = {handleRemoveTodo}/>
                                </TabPane>
                                <TabPane tab="In Progress" key="active">
                                    <TodoTab todos={activeTodos} onTodoToggle = {handleToggleTodoStatus} onTodoRemoval = {handleRemoveTodo}/>
                                </TabPane>
                                <TabPane tab="Completed" key="complete">
                                    <TodoTab todos={completedTodos} onTodoToggle = {handleToggleTodoStatus} onTodoRemoval = {handleRemoveTodo}/>
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
