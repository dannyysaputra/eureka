import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const CustomConfirmDialog = ({ targetId, onDelete }) => {
    const submit = () => {
        confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure to do this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        await onDelete(targetId);
                    },
                },
                {
                    label: "No"
                },
            ],
        });
    };

    return (
        <div
            className="flex flex-row "
            style={{ color: "#f50a0a" }}
            onClick={submit}
        >
            <div>
                <i class="fa-solid fa-trash"></i>
            </div>
            <div className="mx-1">Hapus</div>
        </div>
    );
};

export default CustomConfirmDialog;
