import Illustration from "@/Components/Illustration";
import MainLayout from "@/Layouts/MainLayout";
import { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";

export default function Collection({ auth, photoPath, pertanyaans }) {
    console.log(pertanyaans);
    const isDosen = auth.user.role === 'dosen';
    // const questionCollection = isDosen ? dosenQuestions : userQuestions;

    const [questions, setQuestions] = useState(pertanyaans || []);
    const [sortByDate, setSortByDate] = useState(false);
    const [filterJurusan, setFilterJurusan] = useState(false);
    const [filterJawaban, setFilterJawaban] = useState(false);

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

    const handleSortByDate = () => {
        setSortByDate(!sortByDate);
    };

    const handleFilterByJurusan = () => {
        setFilterJurusan(!filterJurusan);
    };

    const handleFilterByJawaban = () => {
        setFilterJawaban(!filterJawaban);
    };

    const filteredQuestions = questions
        .filter((question) => {
            if (filterJurusan) {
                return question.mata_kuliah.jurusan_id === auth.user.jurusan_id;
            }
            return true;
        })
        .sort((a, b) => {
            if (filterJawaban) {
                return b.jawabans_count - a.jawabans_count;
            }
            if (sortByDate) {
                return new Date(b.updated_at) - new Date(a.updated_at);
            }
            return 0;
        });

    const handleLike = (questionId) => {
        post(`/pertanyaan/${questionId}/like`);
    };

    const userHasLiked = (likes) => {
        const userLiked = likes.some((like) => like.user_id == auth.user.id);
        return userLiked;
    };

    return (
        <MainLayout user={auth.user} photoPath={photoPath}>
            <Head title="Collection" />

            <div className="flex justify-between ps-4 pt-4 bg-gray-400">
                <div>
                    <h1 className="font-bold text-4xl">
                        Halo, {auth.user.name}
                    </h1>
                    <h2 className="font-bold text-xl ms-4 mt-4">
                        Pertanyaan dan Jawaban yang telah anda simpan!
                    </h2>
                </div>
                <div className="me-4">
                    <div className="flex">
                        <Illustration></Illustration>
                    </div>
                </div>
            </div>

            <div className="flex justify-evenly px-8 my-10">
                <div className="grid content-center justify-center px-4 rounded-lg border-4 border-gray-400 w-32 h-14 mx-4 hover:border-gray-600">
                    <button onClick={handleSortByDate}>
                        <div className="font-bold">Terbaru</div>
                    </button>
                </div>
                <div className="grid content-center justify-center px-4 rounded-lg border-4 border-gray-400 w-32 h-14 mx-4 hover:border-gray-600">
                    <button onClick={handleFilterByJurusan}>
                        <div className="font-bold">Rekomendasi</div>
                    </button>
                </div>
                <div className="grid content-center justify-center px-4 rounded-lg border-4 border-gray-400 w-32 h-14 mx-4 hover:border-gray-600">
                    <button onClick={handleFilterByJawaban}>
                        <div className="font-bold">Tersering</div>
                    </button>
                </div>
            </div>
            {filteredQuestions?.map((pertanyaan) => (
                <div className="flex px-8 mx-auto my-5 mb-10 w-9/12">
                    <div
                        className="rounded-lg border  w-screen h-auto"
                        style={{ backgroundColor: "#02AF91" }}
                    >
                        <Link href={isDosen ? `/dosen/detail-pertanyaan/${pertanyaan.id}` : `/detail-pertanyaan/${pertanyaan.id}`}>
                            <div className="flex justify-between my-8">
                                <div className="font-bold mx-6">
                                    {pertanyaan.judul}
                                </div>
                                {pertanyaan.is_answered && (
                                    <div className="flex me-3">
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
                                            Terjawab
                                        </p>
                                    </div>
                                )}
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
                                <div className="mx-1">
                                    {pertanyaan.jawabans_count}
                                </div>
                                <div className="">Jawaban</div>
                            </div>
                            <div className="flex flex-row ">
                                <img
                                    style={{
                                        height: "25px",
                                        width: "25px",
                                    }}
                                    src="/images/view.png"
                                    alt=""
                                />
                                <div className="mx-1">{pertanyaan.insight}</div>
                                <div className="">Lihat</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </MainLayout>
    );
}
