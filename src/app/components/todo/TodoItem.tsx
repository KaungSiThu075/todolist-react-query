"use client";
import {TodoInterface} from "@/app/type/typeInterface";
import React, {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteTodo, updateTodo} from "@/app/api/todoApi";
import { Trash } from 'lucide-react';
import { Circle } from 'lucide-react';
import { CircleCheckBig } from 'lucide-react';

export default function TodoItem({todo}:{todo:TodoInterface}){
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn:updateTodo,
        //On Success UI update
        // onSuccess:(data:TodoInterface)=>{
        //     queryClient.setQueryData<TodoInterface[] | undefined>(['todos'],(oldData)=>oldData?.map(todo=>todo._id === data._id ? data : todo));
        // }

        //Optimistic UI update
        onMutate:async(updatedTodo:TodoInterface)=>{
            await queryClient.cancelQueries({queryKey:['todos']});

            const previousTodos = queryClient.getQueryData(['todos']);

            queryClient.setQueryData(['todos'],(oldData:TodoInterface[])=>oldData.map(todo=>todo._id === updatedTodo._id ? updatedTodo : todo));

            return previousTodos;
        }
    });

    const deleteMutation = useMutation({
        mutationFn:deleteTodo,
        //On Success UI update
        // onSuccess:(data:TodoInterface)=>{
        //     queryClient.setQueryData(['todos'],(oldData:TodoInterface[] | undefined)=>oldData?.filter(todo=>todo._id !== data._id));
        // },

        //Optimistic UI update
        onMutate:async(deleteTodoId:string)=>{
            await queryClient.cancelQueries({queryKey:['todos']});

            const previousTodos = queryClient.getQueryData(['todos']);

            queryClient.setQueryData(['todos'],(oldData:TodoInterface[] | undefined)=>oldData?.filter(todo=>todo._id !== deleteTodoId));

            return previousTodos;
        }
    });

    const [edit,setEdit] = useState(false);

    const [complete,setComplete] = useState(todo.completed);

    const [inputValue,setInputValue]=useState(todo.title);

    const btnEditHandler = () => {
        setEdit(!edit);
        const dataForUpdate = {...todo,title:inputValue}
        updateMutation.mutate(dataForUpdate);
    }

    const btnDeleteHandler = () => {
        deleteMutation.mutate(todo._id as string);
    }

    const updateTodoHandler = (e:React.KeyboardEvent<HTMLDivElement>) => {
        if(e.key === 'Enter')
        {
            setEdit(!edit);
            const dataForUpdate = {...todo,title:inputValue}
            updateMutation.mutate(dataForUpdate);
        }
    }

    return(
        <div className=" flex items-start justify-between gap-3 my-2">
            <div className=" flex gap-2">
                {complete ?
                    <CircleCheckBig
                        className=" cursor-pointer"
                        onClick={()=>setComplete(!complete)}
                    /> :
                    <Circle
                        className="cursor-pointer"
                        onClick={()=>setComplete(!complete)}
                    />
                }
                {edit ?
                    <input
                        onKeyDown={updateTodoHandler}
                        className="w-[200px] border border-blue-500 rounded focus:outline-none focus:ring focus:border-blue-500"
                        value={inputValue}
                        onChange={(e)=>setInputValue(e.target.value)}
                    /> :
                    <div
                        className={`w-[200px] ${complete && 'line-through'}`}
                    >
                        <p>{todo.title}</p>
                    </div>
                }
            </div>
            <div className=" flex items-center justify-center gap-2">
                <button
                    className="hover:underline"
                    type={"button"} onClick={btnEditHandler}
                >
                    {edit ? 'SAVE' : 'EDIT'}
                </button>
                <button
                    type={"button"}
                    onClick={btnDeleteHandler}
                >
                    <Trash/>
                </button>
            </div>
        </div>
    )
}