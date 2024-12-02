"use client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TodoSchema, todoSchema} from "@/app/schema/TodoSchema";
import {addNewTodo} from "@/app/api/todoApi";
import {TodoInterface} from "@/app/type/typeInterface";

export default function AddTodoForm(){
    const {handleSubmit,register,formState:{errors},reset} = useForm<TodoSchema>({resolver:zodResolver(todoSchema)});

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn:addNewTodo,
        onSuccess:(addedTodo:TodoInterface)=>{
            queryClient.setQueryData(['todos'],(oldData:TodoInterface[] | undefined)=>oldData?[...oldData,addedTodo]:[addedTodo]);
            reset();
        },
    })

    const todoFormSubmitHandler = (data:{title:string}) => {
        const dataForServer = {...data,completed:false}
        mutation.mutate(dataForServer);
        (document.getElementById("add_new_todo_modal_dialog") as HTMLDialogElement).close();
    }

    return(
        <form className=" flex flex-col items-center gap-3" onSubmit={handleSubmit(todoFormSubmitHandler)}>
            <h1 className=" font-semibold text-2xl">Add New Todo Here</h1>
            <input
                {...register('title')}
                type="text" placeholder="Type here"
                className="input input-bordered w-full max-w-xs" />
            <p>{errors.title?.message}</p>
            <button className="btn" type={"submit"}>ADD</button>
        </form>
    )
}