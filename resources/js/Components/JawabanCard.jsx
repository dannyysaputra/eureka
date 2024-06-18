import React, { useState } from "react";
import RichTextEditor from "react-quill"; // Make sure to import react-quill and its CSS
import "react-quill/dist/quill.snow.css";
import PrimaryButton from "./PrimaryButton";
import CustomConfirmDialog from "./DeleteConfirmation";

const JawabanCard = ({
    jawaban,
    auth,
    pertanyaanUserId,
    formatDate,
    handleValidate,
    handleLike,
    userHasLiked,
    handleDelete,
    handleUpdate,
    setUpdateData,
    updateData,
    processing,
}) => {
    const [isEditMode, setIsEditMode] = useState(false);

    console.log(jawaban);

    const isDosen = auth.user.role === "dosen";
    const isUserQuestion = !isDosen && pertanyaanUserId == auth.user.id;
    const isFromDosen = jawaban.dosen_id != null;

    console.log(pertanyaanUserId == auth.user.id);

    const myAnswer =
        (jawaban.user_id &&
            jawaban.user_id === auth.user.id &&
            auth.user.role === "mahasiswa") ||
        (jawaban.dosen_id &&
            jawaban.dosen_id === auth.user.id &&
            auth.user.role === "dosen");

    const handleEditClick = () => {
        setIsEditMode(true);
        setUpdateData("deskripsiJawaban", jawaban.deskripsi_jawaban);
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(jawaban.id, updateData.deskripsiJawaban);
        setIsEditMode(false);
    };

    return (
        <div
            className="rounded-lg mx-12 my-8 h-auto py-4"
            style={{ backgroundColor: "#02AF91" }}
        >
            {isEditMode ? (
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mx-10">
                        <div className="mt-5 h-auto flex-grow bg-white">
                            <RichTextEditor
                                name="deskripsiJawaban"
                                value={updateData.deskripsiJawaban}
                                onChange={(content) =>
                                    setUpdateData("deskripsiJawaban", content)
                                }
                            />
                        </div>
                        <div className="flex mt-5 justify-around">
                            <PrimaryButton
                                disabled={processing}
                                className="mr-2 rounded-none w-1/3"
                            >
                                Submit
                            </PrimaryButton>
                            <PrimaryButton
                                type="button"
                                onClick={handleCancelEdit}
                                className="rounded-none w-1/3"
                            >
                                Cancel
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            ) : (
                <div
                    style={{ backgroundColor: "#02AF91" }}
                    className="rounded-lg mx-12 my-8 h-auto py-4"
                >
                    <div className="rounded-t-lg mx-6 p-2 px-3 border-x-2 border-t-2 border-black bg-white">
                        <div className="flex justify-between">
                            <div className="flex flex-row mx-1 my-4">
                                <div className="grid content-center me-5">
                                    <i className="fa-solid fa-user fa-2xl"></i>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-extrabold">
                                        {jawaban.user_name ||
                                            jawaban.dosen_name}{" "}
                                        {jawaban.dosen_name ? "- Dosen" : ""}
                                    </p>
                                    <div className="flex flex-row">
                                        <div className="me-3">
                                            <p>
                                                {formatDate(jawaban.updated_at)}
                                            </p>
                                        </div>
                                        <p>-</p>
                                        <div className="ml-2">
                                            <p>
                                                {jawaban.user_jurusan_name ||
                                                    jawaban.dosen_jurusan_name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isUserQuestion && !isFromDosen && (
                                <div
                                    className="flex mx-1 my-4"
                                    onClick={() => handleValidate(jawaban.id)}
                                >
                                    <div className="cursor-pointer">
                                        <i
                                            className={`fa-regular fa-circle-check fa-xl`}
                                            style={{
                                                color: `${
                                                    jawaban.is_validated
                                                        ? "#e61919"
                                                        : "#02AF91"
                                                }`,
                                            }}
                                        ></i>
                                    </div>
                                    <p
                                        className={`ms-2 cursor-pointer ${
                                            jawaban.is_validated
                                                ? "text-red-500"
                                                : "text-green-500"
                                        }`}
                                    >
                                        {jawaban.is_validated
                                            ? "Batalkan Validasi"
                                            : "Validasi"}
                                    </p>
                                </div>
                            )}

                            {isDosen && !isFromDosen && (
                                <div
                                    className="flex mx-1 my-4"
                                    onClick={() => handleValidate(jawaban.id)}
                                >
                                    <div className="cursor-pointer">
                                        <i
                                            className={`fa-regular fa-circle-check fa-xl`}
                                            style={{
                                                color: `${
                                                    jawaban.is_validated
                                                        ? "#e61919"
                                                        : "#02AF91"
                                                }`,
                                            }}
                                        ></i>
                                    </div>
                                    <p
                                        className={`ms-2 cursor-pointer ${
                                            jawaban.is_validated
                                                ? "text-red-500"
                                                : "text-green-500"
                                        }`}
                                    >
                                        {jawaban.is_validated
                                            ? "Batalkan Validasi"
                                            : "Validasi"}
                                    </p>
                                </div>
                            )}

                            {jawaban.is_validated && (
                                <div className="flex mx-1 my-4">
                                    <div>
                                        <i
                                            className="fa-regular fa-circle-check fa-xl"
                                            style={{ color: "#02AF91" }}
                                        ></i>
                                    </div>
                                    <p
                                        className="ms-2"
                                        style={{ color: "#02AF91" }}
                                    >
                                        Jawaban Valid
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="font-bold m-2">
                            <div className="my-4">
                                {jawaban.deskripsi_jawaban}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 divide-x mx-6 rounded-b-lg w-auto py-1 border-2 border-black bg-gray-300">
                        <div className="">
                            <div className="flex justify-center font-extrabold">
                                <div
                                    className="rounded-full px-2 mr-2"
                                    style={{ backgroundColor: "#02AF91" }}
                                >
                                    {jawaban.likes.length}
                                </div>
                                <div onClick={() => handleLike(jawaban.id)}>
                                    <i
                                        className={`fa-lg ${
                                            userHasLiked(jawaban.likes)
                                                ? "fa-solid fa-heart"
                                                : "fa-regular fa-heart"
                                        }`}
                                    ></i>
                                </div>
                            </div>
                        </div>
                        {myAnswer && (
                            <>
                                <div className="cursor-pointer">
                                    <div className="flex justify-center">
                                        <CustomConfirmDialog
                                            targetId={jawaban.id}
                                            onDelete={handleDelete}
                                        />
                                    </div>
                                </div>
                                <div className="cursor-pointer">
                                    <div
                                        className="flex justify-center"
                                        onClick={handleEditClick}
                                    >
                                        <div>
                                            <i className="fa-regular fa-edit fa-lg"></i>
                                        </div>
                                        <p className="ml-2">Edit</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JawabanCard;
