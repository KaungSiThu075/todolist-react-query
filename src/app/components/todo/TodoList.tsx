import {TodoInterface} from "@/app/type/typeInterface";
import TodoItem from "@/app/components/todo/TodoItem";

export default function TodoList({todos}:{todos:TodoInterface[]}){
    return(
        <div>
            {todos.map(todo=><TodoItem key={todo._id} todo={todo}/>)}
        </div>
    )
}