import {TodoInterface} from "@/app/type/typeInterface";

const fetchAllTodos = () => fetch(`https://todo-list-express-api.vercel.app/api/todos`);

const fetchTodoById = (todoId:string) => fetch(`https://todo-list-express-api.vercel.app/api/todos/${todoId}`);

const fetchAddNewTodo = (newTodo:TodoInterface) => fetch(`https://todo-list-express-api.vercel.app/api/todos`,{
    headers: {
        'Content-Type': 'application/json',
    },
    method: 'POST',
    body:JSON.stringify(newTodo)
});

const fetchUpdateTodo = (updatedTodo:TodoInterface) => fetch(`https://todo-list-express-api.vercel.app/api/todos/${updatedTodo._id}`,{
    headers: {
        'Content-Type': 'application/json',
    },
    method: 'PUT',
    body:JSON.stringify(updatedTodo)
});

const fetchDeleteTodo = (todoId:string) => fetch(`https://todo-list-express-api.vercel.app/api/todos/${todoId}`,{
    headers: {
        'Content-Type': 'application/json',
    },
    method: 'DELETE',
})

export {fetchAllTodos,fetchTodoById,fetchAddNewTodo,fetchUpdateTodo,fetchDeleteTodo};