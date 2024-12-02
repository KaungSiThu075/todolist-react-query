"use client";
import ModalDialog from "@/app/components/dialog/ModalDialog";
import AddTodoForm from "@/app/components/form/AddTodoForm";

export default function AddNewTodoButton(){

    const btnAddNewTodoHandler = () => {
        (document.getElementById("add_new_todo_modal_dialog") as HTMLDialogElement).showModal();
    }

    return(
        <div>
            <button
                type="button"
                className="btn my-3"
                onClick={btnAddNewTodoHandler}
            >
                ADD NEW TODO
            </button>

            <ModalDialog modalId={"add_new_todo_modal_dialog"}>
                <AddTodoForm/>
            </ModalDialog>
        </div>
    )
}