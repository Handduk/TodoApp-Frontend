import axios from "axios";
const baseUrl = '${process.env.REACT_APP_API_URL}/api/Todos';

export const createTodo = (todo: { title: string; isActive: boolean; }) => {
    return axios.post(baseUrl, {
        title: todo.title,
        isActive: todo.isActive
    }).then(response => response.data);
} 