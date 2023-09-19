import axios from "axios";
import { ITodo } from "../Components/Models/todo";
const baseUrl = `${process.env.REACT_APP_API_URL}/api/Todos`;

export const createTodo = (todo: { title: string; completed: boolean; }) => {
    return axios.post(baseUrl, {
        title: todo.title,
        completed: todo.completed
    }).then(response => response.data);
} 

export const loadTodos = () => {
    return axios.get(baseUrl)
    .then(response => response.data);
}

export const updateTodoStatus = (todo : ITodo) => {
    return axios.put(baseUrl + `/${todo.id}`, {
        completed: !todo.completed,
    }).then(response => response.data);
};