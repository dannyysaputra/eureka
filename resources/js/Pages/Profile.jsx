import DetailQuestionLayout from "@/Layouts/DetailQuestionLayout";
import { format } from "date-fns";
import { useState } from "react";
import { Head, Link } from "@inertiajs/react";

export default function Profile({ photoPath, jurusan, user }) {
    const formatDate = (dateString) => {
        return format(new Date(dateString), "dd/MM/yyyy");
    };

    const isDosen = user.role === "dosen";

    const [switchQuestion, setSwitchQuestion] = useState(true);
    const [switchAnswer, setSwitchAnswers] = useState(false);

    const handleSwitchQuestion = () => {
        setSwitchQuestion(true);
        setSwitchAnswers(false);
    };

    const handleSwitchAnswer = () => {
        setSwitchAnswers(true);
        setSwitchQuestion(false);
    };

    let countValidated = null;
    console.log(user);

    if (!isDosen) {
        countValidated = user.jawabans.map((jawaban, index) => {
            if (jawaban.is_validated) {
                index++;
            }
            return index;
        });
    }

    return (
        <DetailQuestionLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Profile
                </h2>
            }
            photoPath={photoPath}
        >
            <Head title="Profile" />

            <div className="flex justify-between my-16 ms-4 me-9">
                <div className="flex">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt="User Avatar"
                            className="rounded-full object-cover w-36 h-36"
                        />
                    ) : (
                        <div className="py-8 px-9 border-4 rounded-full border-green-400">
                            <i class="fa-solid fa-user fa-3x"></i>
                        </div>
                    )}
                    <div className="my-auto ms-5">
                        <p className="font-bold text-xl">{user.name}</p>
                        <p>{user.nim || user.nip}</p>
                        <p>{jurusan.nama_jurusan}</p>
                    </div>
                </div>
                <div className="me-4">
                    <Link
                        href={isDosen ? "/dosen/edit-profile" : "/edit-profile"}
                    >
                        <div
                            className="rounded p-2 font-bold text-sm mb-4"
                            style={{ backgroundColor: "#02AF91" }}
                        >
                            Edit Profil
                        </div>
                    </Link>
                    {!isDosen && (
                        <div
                            className="rounded-full pt-8 py-5 font-bold text-3xl"
                            style={{ backgroundColor: "#02AF91" }}
                        >
                            <p className="text-center">#{user.rank_position}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-10 my-16 ms-4 me-9">
                <div
                    className="w-1/2 rounded-lg p-5"
                    style={{ backgroundColor: "#02AF91" }}
                >
                    <div className="flex">
                        <div className="me-4">
                            <i class="fa-solid fa-medal fa-3x"></i>
                        </div>
                        <p className="font-bold text-3xl my-auto">
                            Lencana - {user.rank}
                        </p>
                    </div>
                    <div className="flex mt-6 ms-10">
                        <div className="rounded-full py-1 px-2 bg-gray-400">
                            <i class="fa-solid fa-check fa-lg"></i>
                        </div>
                        <p className="font-semibold my-auto ms-3">
                            {countValidated} Jawaban Valid
                        </p>
                    </div>
                </div>
                <div
                    className="w-1/2 rounded-lg p-5"
                    style={{ backgroundColor: "#02AF91" }}
                >
                    <div className="flex">
                        <div className="me-4">
                            <i class="fa-solid fa-chart-line fa-3x"></i>
                        </div>
                        <p className="font-bold text-3xl my-auto">Statistik</p>
                    </div>
                    {isDosen ? (
                        <div className="flex ms-8 mt-6">
                            <p className="font-semibold my-auto">
                                {user.jawabans.length} Jawaban
                            </p>
                        </div>
                    ) : (
                        <div className="flex justify-around mt-6">
                            <p className="font-semibold my-auto">
                                {user.pertanyaan.length} Pertanyaan
                            </p>
                            <p className="font-semibold my-auto">
                                {user.jawabans.length} Jawaban
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div
                className="my-16 pb-10 ms-4 me-9"
                style={{ backgroundColor: "#02AF91" }}
            >
                <div className="flex justify-center cursor-pointer font-semibold text-white mb-10">
                    <div
                        className="p-1"
                        style={{
                            backgroundColor: switchQuestion
                                ? "#08332C"
                                : "#0A6D5C",
                        }}
                        onClick={() => handleSwitchQuestion()}
                    >
                        Pertanyaan
                    </div>
                    <div
                        className="py-1 px-3"
                        style={{
                            backgroundColor: switchAnswer
                                ? "#08332C"
                                : "#0A6D5C",
                        }}
                        onClick={() => handleSwitchAnswer()}
                    >
                        Jawaban
                    </div>
                </div>

                {switchQuestion &&
                    !isDosen &&
                    user.pertanyaan.map((pertanyaan) => (
                        <Link href={`/detail-pertanyaan/${pertanyaan.id}`}>
                            <div className="mb-10 border-4 mx-8 border-black rounded-md">
                                <div
                                    className="p-4"
                                    style={{ backgroundColor: "#9EBEB8" }}
                                >
                                    <h1 className="font-bold text-2xl">
                                        {pertanyaan.judul}
                                    </h1>
                                    <p className="font-semibold mt-8 mb-4">
                                        {pertanyaan.deskripsi}
                                    </p>
                                    <p>{formatDate(pertanyaan.updated_at)}</p>
                                </div>
                            </div>
                        </Link>
                    ))}

                {switchAnswer &&
                    user.jawabans.map((jawaban) => (
                        <Link
                            href={`/detail-pertanyaan/${jawaban.pertanyaan_id}`}
                        >
                            <div className="mb-10 border-4 mx-8 border-black rounded-md">
                                <div
                                    className="p-4"
                                    style={{ backgroundColor: "#9EBEB8" }}
                                >
                                    <h1 className="font-bold text-2xl">
                                        Judul
                                    </h1>
                                    <p className="font-semibold mt-8 mb-4">
                                        {jawaban.deskripsi_jawaban}
                                    </p>
                                    <p>{formatDate(jawaban.updated_at)}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </DetailQuestionLayout>
    );
}
