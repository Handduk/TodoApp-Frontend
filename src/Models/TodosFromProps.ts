import { Todo } from "./todo";

export type TodosFormProps = {
    onFormSubmit: (todo: Todo) => void;
};