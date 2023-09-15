import {Col, Layout, message, Row, Tabs} from 'antd';
import TodosForm from './TodosForm';
import { useCallback, useEffect, useState } from 'react';
import { createTodo } from './Services/todoServices';
import { Todo } from './Models/todo';


const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList = () => {
    const [refreshing, setRefreshing] = useState(false);

    const handleFormSubmit = async (todo : Todo) => {
        await createTodo(todo);
        onRefresh();
        message.success('Your todo has been added!');
    }

    const onRefresh = useCallback( async () => {
        setRefreshing(true);

        setRefreshing(false);
    }, [refreshing]);

    useEffect(() => {

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

                                </TabPane>
                                <TabPane tab="In Progress" key="active">

                                </TabPane>
                                <TabPane tab="Completed" key="complete">
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
