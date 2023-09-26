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
    const [refreshing, setRefreshing] = useState(false);
    //const [todos, setTodos] = useState([]);

    const queryClient = useQueryClient();

    const { isLoading, isError, data} = useQuery("todos", loadTodos);

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
            console.log("URL to be deleted:", `${baseUrl}/${todo.id}`); // Log the URL
            console.log("Todo ID to be deleted:", todo.id); // Log the todo.id
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
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="All" key="all">

                                    {isLoading && <div>Loading todos from the server...</div>}

                                    {isError && <div>Something went wrong</div>}
                                <TodoTab todos={data} onTodoToggle = {handleToggleTodoStatus} onTodoRemoval = {handleRemoveTodo}/>
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
