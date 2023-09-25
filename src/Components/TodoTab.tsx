import { List } from 'antd';
import TodoItem from './TodoItem';
import { TodoTabProps } from './Models/TodoTabProps';

const TodosTab = ({todos, onTodoToggle}: TodoTabProps) => {
    return (
        <>
        <List
            locale={{ emptyText: "You got nothing left to do.", }}
            dataSource={todos}
            renderItem={(todo) => {
                return <TodoItem
                    todo={todo}
                    onTodoToggle={onTodoToggle}
                />
            }}
            pagination={{
                position: 'bottom',
                pageSize: 10,
            }}
        />
        </>
    )
}

export default TodosTab;