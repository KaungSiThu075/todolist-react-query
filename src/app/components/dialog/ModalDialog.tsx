"use client";
import React from "react";

export default function ModalDialog({modalId,children}:{modalId:string,children:React.ReactNode}){
    return (
        <dialog id={modalId} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {children}
            </div>
        </dialog>
    )
}