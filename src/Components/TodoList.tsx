import {Col, Layout, message, Row, Tabs} from 'antd';
import TodosForm from './TodosForm';
import { useCallback, useEffect, useState } from 'react';
import { createTodo, loadTodos } from '../Services/todoServices';
import { Todo } from './Models/todo';
import TodoTab from './TodoTab';


const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [todos, setTodos] = useState([]);

    const handleFormSubmit = async (todo : Todo) => {
        await createTodo(todo);
        onRefresh();
        message.success('Your todo has been added!');
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
                                <TodoTab todos={todos} />
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
