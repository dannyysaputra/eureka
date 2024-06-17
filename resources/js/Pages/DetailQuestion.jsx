import DetailQuestionLayout from "@/Layouts/DetailQuestionLayout";
import { format } from "date-fns";
import PrimaryButton from "@/Components/PrimaryButton";
import RichTextEditor from "@/Components/RichTextEditor";
import CustomConfirmDialog from "@/Components/DeleteConfirmation";
import { useEffect, useState } from "react";
import ArrowButton from "@/Components/ArrowButton";
import { Head, useForm, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import JawabanCard from "@/Components/JawabanCard";

export default function DetailQuestion({
    auth,
    photoPath,
    pertanyaan,
    jawabans,
}) {
    const [answers, setAnswers] = useState(jawabans || []);
    const isDosen = auth.user.role === "dosen";
    const isUserQuestion = !isDosen && pertanyaan.user_id == auth.user.id;

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

    const {
        data: updateData,
        setData: setUpdateData,
        put,
        processing: updateProcessing,
        errors: updateErrors,
        reset: resetUpdate,
    } = useForm({
        deskripsiJawaban: data.deskripsiJawaban,
    });

    const submit = (e) => {
        e.preventDefault();

        if (isDosen) {
            post(route("dosen.submit-jawaban"));
        } else {
            post(route("submit-jawaban"));
        }
    };

    const handleDelete = async (id) => {
        if (isDosen) {
            Inertia.delete(`/dosen/jawaban/${id}`);
        } else {
            Inertia.delete(`/jawaban/${id}`);
        }
    };

    const handleUpdate = (id, updatedContent) => {
        setUpdateData("deskripsiJawaban", updatedContent);

        const routeName = isDosen ? "dosen.jawaban.update" : "jawaban.update";

        put(route(routeName, id), {
            preserveScroll: true,
            onSuccess: (response) => {
                setAnswers(
                    answers.map((answer) =>
                        answer.id === id
                            ? { ...answer, deskripsi_jawaban: updatedContent }
                            : answer
                    )
                );
            },
        });
    };

    const handleLike = (answerId) => {
        post(`/jawaban/${answerId}/like`);
    };

    const handleBookmark = (questionId) => {
        post(`/pertanyaan/${questionId}/add-collection`);
    };

    const handleUnbookmark = (questionId) => {
        post(`/pertanyaan/${questionId}/remove-collection`);
    };

    const handleValidate = (answerId) => {
        if (isDosen) {
            post(`/dosen/jawaban/${answerId}/validate`);
        } else {
            post(`/jawaban/${answerId}/validate`);
        }
    };

    const userHasLiked = (likes) => {
        const userLiked = likes.some((like) => like.user_id == auth.user.id);
        return userLiked;
    };

    const userHasBookmarked = (bookmarks) => {
        const userBookmark = bookmarks.some(
            (bookmark) => bookmark.id == auth.user.id
        );
        return userBookmark;
    };

    console.log(answers);

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
            <div className="my-6 mx-10">
                <Link href={route("pertanyaan")} className="my-auto">
                    <ArrowButton fillColor={"#02AF91"}></ArrowButton>
                </Link>
            </div>
            <div
                className="rounded-lg mx-12 my-8 h-auto pb-3"
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
                        {userHasBookmarked(pertanyaan.collected_by) ? (
                            <div
                                className="flex"
                                onClick={() => handleUnbookmark(pertanyaan.id)}
                            >
                                <div>
                                    <i class="fa-solid fa-bookmark fa-lg"></i>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="flex"
                                onClick={() => handleBookmark(pertanyaan.id)}
                            >
                                <div>
                                    <i class="fa-regular fa-bookmark fa-lg"></i>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="rounded-b-lg py-1 mx-6 mb-5 border-2 border-black bg-gray-300">
                    <div className="flex justify-center font-extrabold">
                        Komentar
                    </div>
                </div>
                {!isUserQuestion && (
                    <form onSubmit={submit}>
                        <div className="flex flex-col mx-5">
                            <div className="mt-5 h-auto flex-grow bg-white">
                                <div className="h-auto flex-grow">
                                    <RichTextEditor
                                        name="deskripsiJawaban"
                                        value={data.deskripsiJawaban}
                                        onChange={(content) =>
                                            setData("deskripsiJawaban", content)
                                        }
                                    />
                                </div>
                            </div>
                            <PrimaryButton
                                disabled={processing}
                                className="mt-5"
                            >
                                Submit
                            </PrimaryButton>
                        </div>
                    </form>
                )}
            </div>

            {answers.map((jawaban) => (
                <JawabanCard
                    jawaban={jawaban}
                    auth={auth}
                    pertanyaanUserId={pertanyaan.user_id}
                    formatDate={formatDate}
                    handleValidate={handleValidate}
                    handleLike={handleLike}
                    userHasLiked={userHasLiked}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    setUpdateData={setUpdateData}
                    updateData={updateData}
                    updateProcessing={updateProcessing}
                />
            ))}
        </DetailQuestionLayout>
    );
}
