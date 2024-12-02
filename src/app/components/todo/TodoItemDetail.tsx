import {TodoInterface} from "@/app/type/typeInterface";

export default function TodoItemDetail({todo}:{todo:TodoInterface}){
    return (
        <div>
            <p>Title - {todo.title}</p>
            <p>Completed - {`${todo.completed}`}</p>
        </div>
    )
}