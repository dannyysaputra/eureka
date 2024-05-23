import { Head, Link, useForm, router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import "../echo";
import DetailQuestionLayout from "@/Layouts/DetailQuestionLayout";

export default function MyQuestion({ auth, photoPath, pertanyaans }) {
    const [questions, setQuestions] = useState(pertanyaans || []);
    const [deletedQuestion, setDeletedQuestion] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const { post } = useForm();

    console.log(questions);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (!window.Echo) {
            console.error("Echo not initialized properly");
            return;
        }

        const channel = window.Echo.channel("question-liked");

        const listener = ({ question }) => {
            setQuestions((prevQuestions) =>
                prevQuestions.map((q) =>
                    q.id === question.id ? { ...q, likes: question.likes } : q
                )
            );
        };

        channel.listen("QuestionLiked", listener);

        return () => {
            channel.stopListening("QuestionLiked", listener);
        };
    }, []);

    const handleLike = (questionId) => {
        post(`/pertanyaan/${questionId}/like`);
    };

    const userHasLiked = (likes) => {
        const userLiked = likes.some((like) => like.user_id == auth.user.id);
        return userLiked;
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus pertanyaan ini?")) {
            // Panggil fungsi untuk menghapus pertanyaan
            Inertia.delete(`/pertanyaan/${id}`, {
                onSuccess: () => {
                    console.log("sukses");
                    setIsSuccess(true); // Set state isSuccess menjadi true jika penghapusan berhasil
                    setShowModal(true); // Tampilkan modal
                    setDeletedQuestion(id); // Set state deletedQuestion dengan id pertanyaan yang dihapus
                },
                onError: () => {
                    setIsSuccess(false); // Set state isSuccess menjadi false jika penghapusan gagal
                    setShowModal(true); // Tampilkan modal
                },
            });
        }
    };

    useEffect(() => {
        console.log(isSuccess, showModal);
    }, [isSuccess, showModal]);

    return (
        <DetailQuestionLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Question
                </h2>
            }
            photoPath={photoPath}
            pertanyaans={pertanyaans}
        >
            <Head title="Question" />

            <div className="flex flex-auto px-8 pt-16 justify-between">
                <div className="grid content-center font-sans text-3xl font-extrabold px-4 mr-10">
                    Pertanyaan Saya
                </div>
            </div>

            <div className="flex justify-center px-8 py-10">
                <div className="relative m-4 flex w-screen flex-wrap items-stretch">
                    <input
                        type="search"
                        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto bg-slate-200 rounded-l-3xl border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-secondary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-secondary"
                        placeholder="Cari pertanyaan..."
                        aria-label="Search"
                        aria-describedby="button-addon1"
                    />
                    <div className="rounded-r-3xl bg-gray-600 p-2">
                        <i class="fa-solid fa-magnifying-glass mx-4 my-auto bg-gray-600"></i>
                    </div>
                </div>
            </div>

            {questions?.map((pertanyaan) => (
                <div className="flex justify-center px-8 mx-4 mt-5">
                    <div className="rounded-lg border bg-gray-300 w-screen h-auto">
                        <Link href={`/detail-pertanyaan/${pertanyaan.id}`}>
                            <div className="font-bold mx-6 my-8">
                                {pertanyaan.judul}
                            </div>
                            <div className="mx-6 font-semibold my-8">
                                {pertanyaan.deskripsi}
                            </div>
                        </Link>
                        <div className="flex justify-evenly">
                            <div className="flex">
                                <img
                                    style={{
                                        height: "25px",
                                        width: "25px",
                                    }}
                                    src="/images/refresh.png"
                                    alt=""
                                />
                                <div className="font-bold mb-8">
                                    {pertanyaan.nama_depan}
                                </div>
                            </div>
                            <div className="mx-1">-</div>
                            <div className="mx-2">Ask {pertanyaan.timeAgo}</div>
                            <div
                                className="flex flex-row mr-4"
                                onClick={() => handleLike(pertanyaan.id)}
                            >
                                <div>
                                    <i
                                        className={`fa-lg ${
                                            userHasLiked(pertanyaan.likes)
                                                ? "fa-solid fa-heart"
                                                : "fa-regular fa-heart"
                                        }`}
                                    ></i>
                                </div>
                                <div className="mx-1">
                                    {pertanyaan.likes.length}
                                </div>
                                <div className="">Likes</div>
                            </div>
                            <div className="flex flex-row mr-4">
                                <img
                                    style={{
                                        height: "25px",
                                        width: "25px",
                                    }}
                                    src="/images/answer.png"
                                    alt=""
                                />
                                <div className="mx-1">2</div>
                                <div className="">Jawaban</div>
                            </div>
                            <div
                                className="flex flex-row "
                                style={{ color: "#e6b400" }}
                            >
                                <div>
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </div>
                                <div className="mx-1">Ubah</div>
                            </div>
                            <div
                                className="flex flex-row "
                                style={{ color: "#f50a0a" }}
                                onClick={() => handleDelete(pertanyaan.id)}
                            >
                                <div>
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                                <div className="mx-1">Hapus</div>
                            </div>
                        </div>
                    </div>

                    {/* Confirm delete modal */}
                    {showDeleteModal && (
                        <div
                            id="popup-modal"
                            tabindex="-1"
                            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                        >
                            <div class="relative p-4 w-full max-w-md max-h-full">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <button
                                        type="button"
                                        class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-hide="popup-modal"
                                    >
                                        <svg
                                            class="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                    <div class="p-4 md:p-5 text-center">
                                        <svg
                                            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                            Are you sure you want to delete this
                                            product?
                                        </h3>
                                        <button
                                            onClick={setDelete(true)}
                                            data-modal-hide="popup-modal"
                                            type="button"
                                            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                        >
                                            Yes, I'm sure
                                        </button>
                                        <button
                                            data-modal-hide="popup-modal"
                                            type="button"
                                            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        >
                                            No, cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Modal */}
                    {showModal && (
                        <Modal
                            isOpen={showModal}
                            onRequestClose={handleCloseModal}
                            contentLabel="Contoh Modal"
                            className="modal"
                            overlayClassName="modal-overlay"
                        >
                            <div className="modal-content">
                                <span
                                    className="close"
                                    onClick={handleCloseModal}
                                >
                                    &times;
                                </span>
                                {isSuccess ? (
                                    <p>Pertanyaan berhasil dihapus!</p>
                                ) : (
                                    <p>
                                        Gagal menghapus pertanyaan. Silakan coba
                                        lagi.
                                    </p>
                                )}
                            </div>
                        </Modal>
                    )}
                </div>
            ))}
        </DetailQuestionLayout>
    );
}
