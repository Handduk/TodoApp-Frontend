import { ITodo } from "./todo";

export type TodosFormProps = {
    onFormSubmit: (todo: ITodo) => void;
};