import {fetchAddNewTodo, fetchAllTodos, fetchDeleteTodo, fetchTodoById, fetchUpdateTodo} from "@/app/service/fetchApi";
import {TodoInterface} from "@/app/type/typeInterface";

const getAllTodos = async () => {
    const response:Response = await fetchAllTodos();

    if(!response.ok)
    {
        throw new Error(`something went wrong`);
    }
    else
    {
        const data:TodoInterface[] = await response.json();
        console.log('data from server in todo api ',data);
        return data;
    }
}

const getTodoById = async (todoId:string) => {
    const reponse:Response = await fetchTodoById(todoId);

    if(!reponse.ok)
    {
        throw new Error(`something went wrong`);
    }
    else
    {
        const data:TodoInterface = await reponse.json();
        console.log('data from server in todo api ',data);
        return data;
    }
}

const addNewTodo = async (newTodo:TodoInterface) => {
    const response:Response = await fetchAddNewTodo(newTodo);

    if(!response.ok)
    {
        throw new Error(`something went wrong`);
    }
    else
    {
        const data:TodoInterface = await response.json();
        console.log('data from server in todo api ',data);
        return data;
    }
}

const updateTodo = async (updatedTodo:TodoInterface) => {
    const response:Response = await fetchUpdateTodo(updatedTodo);

    if(!response.ok)
    {
        throw new Error(`something went wrong`);
    }
    else
    {
        const data:TodoInterface = await response.json();
        console.log('data from server in update api ',data);
        return data;
    }
}

const deleteTodo = async (todoId:string) => {
    const response:Response = await fetchDeleteTodo(todoId);

    if(!response.ok)
    {
        throw new Error(`something went wrong`)
    }
    else
    {
        const data:TodoInterface = await response.json();
        console.log('data from server in delete api ',data);
        return data;
    }
}

export {getAllTodos,getTodoById,addNewTodo,updateTodo,deleteTodo};