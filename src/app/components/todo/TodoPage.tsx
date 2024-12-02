"use client";
import {useGetAllTodosQuery} from "@/app/hooks/useTodoApi";
import TodoList from "@/app/components/todo/TodoList";
import AddNewTodoButton from "@/app/components/button/AddNewTodoButton";

export default function TodoPage(){
    const {data:todos,isError,isPending,isSuccess} = useGetAllTodosQuery();

    if(isError){return <div>Error</div>}

    if(isPending){return <div>Loading...</div>}

    if(isSuccess)
    {
        return (
            <div className=" flex flex-col items-center justify-center">
                <h1 className=" font-semibold text-3xl mt-5 mb-3">Todo List</h1>
                <AddNewTodoButton/>
                <TodoList todos={todos}/>
            </div>
        );
    }
}