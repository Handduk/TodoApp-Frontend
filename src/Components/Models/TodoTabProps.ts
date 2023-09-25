export type TodoTabProps = {
    todos: {
        id: number;
        title: string;
        completed: boolean;
    }[];
    onTodoToggle: (todo: { id: number; title: string; completed: boolean; }) => void;
};