import QuestionLayout from "@/Layouts/QuestionLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import "../echo";
import { Inertia } from "@inertiajs/inertia";

export default function Question({
    auth,
    photoPath,
    pertanyaans,
    topCourses,
    search,
    topQuestions,
}) {
    const [questions, setQuestions] = useState(pertanyaans || []);
    const [searchQuery, setSearchQuery] = useState(search || "");
    const [sortByDate, setSortByDate] = useState(false);
    const [filterJurusan, setFilterJurusan] = useState(false);
    const [filterJawaban, setFilterJawaban] = useState(false);
    const [matkulId, setMatkulId] = useState(null);

    const { post } = useForm();

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get(
            route("pertanyaan"),
            { search: searchQuery },
            {
                preserveState: true,
                replace: true,
            }
        );
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

    const handleSortByDate = () => {
        setSortByDate(!sortByDate);
    };

    const handleFilterByJurusan = () => {
        setFilterJurusan(!filterJurusan);
    };

    const handleFilterByJawaban = () => {
        setFilterJawaban(!filterJawaban);
    };  

    const handleFilterByMatkul = (id) => {
        setMatkulId(id);
    }

    const filteredQuestions = questions
        .filter((question) => {
            if (filterJurusan) {
                return question.mata_kuliah.jurusan_id === auth.user.jurusan_id;
            }
            if (matkulId) {
                return question.matkul_id === matkulId;
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

        // console.log(questions);


    const handleLike = (questionId) => {
        post(`/pertanyaan/${questionId}/like`);
    };

    const userHasLiked = (likes) => {
        const userLiked = likes.some((like) => like.user_id == auth.user.id);
        return userLiked;
    };

    return (
        <QuestionLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Question
                </h2>
            }
            photoPath={photoPath}
            pertanyaans={pertanyaans}
            topCourses={topCourses}
            topQuestions={topQuestions}
            handleFilterByMatkul={handleFilterByMatkul}
        >
            <Head title="Question" />

            <div className="flex flex-auto px-8 pt-16 justify-between">
                <div className="grid content-center font-sans text-3xl font-extrabold px-4 mr-10">
                    Semua Pertanyaan
                </div>

                <div className="">
                    <a href="ajukan-pertanyaan">
                        <div
                            className=" font-extrabold text-white rounded-2xl h-12 w-auto p-3 m-2"
                            style={{ backgroundColor: "#02AF91" }}
                        >
                            Ajukan pertanyaan
                        </div>
                    </a>
                </div>
            </div>
            <form onSubmit={handleSearch} className="w-full">
                <div className="flex justify-center px-8 py-10">
                    <div className="relative m-4 flex w-screen flex-wrap items-stretch">
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="search"
                            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto bg-slate-200 rounded-l-3xl border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-secondary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-secondary"
                            placeholder="Cari pertanyaan..."
                            aria-label="Search"
                            aria-describedby="button-addon1"
                        />
                        <button type="submit">
                            <div className="rounded-r-3xl bg-gray-600 p-2 flex items-center">
                                <i className="fa-solid fa-magnifying-glass mx-4 my-auto bg-gray-600"></i>
                            </div>
                        </button>
                    </div>
                </div>
            </form>

            <div className="flex justify-between px-8 pb-10">
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
                                <div className="mx-1">{pertanyaan.jawabans_count}</div>
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
                                <div className="mx-1">2</div>
                                <div className="">Lihat</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </QuestionLayout>
    );
}
