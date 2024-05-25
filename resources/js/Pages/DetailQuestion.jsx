import DetailQuestionLayout from "@/Layouts/DetailQuestionLayout";
import { format } from "date-fns";
import PrimaryButton from "@/Components/PrimaryButton";
import RichTextEditor from "@/Components/RichTextEditor";
import { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/react";

export default function DetailQuestion({
    auth,
    photoPath,
    pertanyaan,
    jawabans,
}) {
    const [answers, setAnswers] = useState(jawabans || []);

    useEffect(() => {
        if (!window.Echo) {
            console.error("Echo not intialized properly");
            return;
        }

        const channel = window.Echo.channel("answer-liked");

        const listener = ({ answers }) => {
            setAnswers((prevAnswers) => {
                const updatedAnswers = prevAnswers.map((a) =>
                    a.id === answers.id
                        ? {
                              ...a,
                              likes: answers.likes,
                              is_validated: answers.is_validated,
                          }
                        : a
                );

                const sortAnswers = [...updatedAnswers].sort(
                    (a, b) => b.likes.length - a.likes.length
                );
                return sortAnswers;
            });
        };

        channel.listen("AnswerLiked", listener);

        return () => {
            channel.stopListening("AnswerLiked", listener);
        };
    }, []);

    const formatDate = (dateString) => {
        return format(new Date(dateString), "dd/MM/yyyy");
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        deskripsiJawaban: "",
        pertanyaanId: pertanyaan.id,
    });

    const submit = (e) => {
        e.preventDefault();

        console.log(data);

        post(route("submit-jawaban"));
    };

    const handleLike = (answerId) => {
        post(`/jawaban/${answerId}/like`);
    };

    const handleValidate = (answerId) => {
        post(`/jawaban/${answerId}/validate`);
    };

    const userHasLiked = (likes) => {
        const userLiked = likes.some((like) => like.user_id == auth.user.id);
        return userLiked;
    };

    const isUserQuestion = pertanyaan.user_id === auth.user.id;

    return (
        <DetailQuestionLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    DetailQuestion
                </h2>
            }
            photoPath={photoPath}
        >
            <Head title={pertanyaan.judul} />
            <div
                className="rounded-lg mx-12 my-8 h-auto"
                style={{ backgroundColor: "#02AF91" }}
            >
                <div className="flex flex-row p-4 ml-3">
                    <div className="grid content-center me-5">
                        <i class="fa-solid fa-user fa-2xl"></i>
                    </div>

                    <div className="flex flex-col">
                        <p className="font-extrabold">{pertanyaan.user_name}</p>
                        <div className="flex flex-row">
                            <div className="w-20 h-auto mr-4">
                                <p>{formatDate(pertanyaan.updated_at)}</p>
                            </div>
                            <p>-</p>
                            <div className="ml-2">
                                <p>{pertanyaan.jurusan_name}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between rounded-t-lg mx-6 mt-2 pb-2 border-x-2 border-t-2 border-black bg-white ">
                    <div className="pe-5">
                        <div className="font-bold m-2">
                            <p1>{pertanyaan.judul}</p1>
                            <div className="my-4">{pertanyaan.deskripsi}</div>
                        </div>
                    </div>
                    <div className="p-2">
                        <i class="fa-regular fa-bookmark fa-lg"></i>
                    </div>
                </div>
                <div className="rounded-b-lg py-1 mx-6 mb-4 border-2 border-black bg-gray-300">
                    <div className="flex justify-center font-extrabold">
                        Komentar
                    </div>
                </div>
                <form onSubmit={submit}>
                    <div
                        className="flex flex-col"
                        style={{ backgroundColor: "#F3F4F6" }}
                    >
                        <div className="mt-5 h-auto flex-grow">
                            <RichTextEditor
                                name="deskripsiJawaban"
                                value={data.deskripsiJawaban}
                                onChange={(content) =>
                                    setData("deskripsiJawaban", content)
                                }
                            />
                        </div>
                        <PrimaryButton disabled={processing} className="mt-5">
                            Submit
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            {answers.map((jawaban) => (
                <div
                    className="rounded-lg mx-12 my-8 h-auto py-4"
                    style={{ backgroundColor: "#02AF91" }}
                >
                    <div className="rounded-t-lg mx-6 p-2 px-3 border-x-2 border-t-2 border-black bg-white ">
                        <div className="">
                            <div className="flex justify-between">
                                <div className="flex flex-row mx-1 my-4">
                                    <div className="grid content-center me-5">
                                        <i class="fa-solid fa-user fa-2xl"></i>
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="font-extrabold">
                                            {jawaban.user_name}
                                        </p>
                                        <div className="flex flex-row">
                                            <div className="me-3">
                                                <p>
                                                    {formatDate(
                                                        jawaban.updated_at
                                                    )}
                                                </p>
                                            </div>
                                            <p>-</p>
                                            <div className="ml-2">
                                                <p>{jawaban.jurusan_name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {isUserQuestion && (
                                    <div
                                        className="flex mx-1 my-4"
                                        onClick={() =>
                                            handleValidate(jawaban.id)
                                        }
                                    >
                                        <div className="cursor-pointer">
                                            <i
                                                class="fa-regular fa-circle-check fa-xl"
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
                                            {`${
                                                jawaban.is_validated
                                                    ? "Batalkan Validasi"
                                                    : "Validasi"
                                            }`}
                                        </p>
                                    </div>
                                )}

                                {!isUserQuestion && jawaban.is_validated && (
                                    <div className="flex mx-1 my-4">
                                        <div className="">
                                            <i
                                                class="fa-regular fa-circle-check fa-xl"
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
                    </div>

                    <div className="grid grid-cols-2 divide-x mx-6 rounded-b-lg w-auto py-1 border-2 border-black bg-gray-300">
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
                    </div>
                </div>
            ))}
        </DetailQuestionLayout>
    );
}
