import {useQuery} from "@tanstack/react-query";
import {getAllTodos, getTodoById} from "@/app/api/todoApi";

const useGetAllTodosQuery = () => useQuery({
    queryKey:['todos'],
    queryFn:getAllTodos
});

const useGetTodoByIdQuery = (todoId:string) => useQuery({
    queryKey:['todos',todoId],
    queryFn:()=>getTodoById(todoId)
});

export {useGetAllTodosQuery,useGetTodoByIdQuery};