import { Head, Link, useForm, router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useEffect, useState } from "react";
import "../echo";
import DetailQuestionLayout from "@/Layouts/DetailQuestionLayout";
import JawabanCard from "@/Components/JawabanCard";

export default function MyQuestion({ auth, photoPath, pertanyaans }) {
    const [questions, setQuestions] = useState(pertanyaans || []);

    const { post } = useForm();

    console.log(questions);

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
            Inertia.delete(`/pertanyaan/${id}`);
        }
    };

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
                            <div className="mx-2">Bertanya {pertanyaan.timeAgo}</div>
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
                            <Link href={`/edit-pertanyaan/${pertanyaan.id}`}>
                                <div
                                    className="flex flex-row "
                                    style={{ color: "#e6b400" }}
                                >
                                    <div>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </div>
                                    <div className="mx-1">Ubah</div>
                                </div>
                            </Link>
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
                </div>
            ))}
        </DetailQuestionLayout>
    );
}
