import DetailQuestionLayout from "@/Layouts/DetailQuestionLayout";
import ArrowButton from "@/Components/ArrowButton";
import Medal from "@/Components/Medal";
import { Head, Link } from "@inertiajs/react";

export default function DetailQuestion({ auth, photoPath, users }) {
    console.log(auth.user);
    const user = auth.user;

    return (
        <DetailQuestionLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Leaderboard
                </h2>
            }
            photoPath={photoPath}
        >
            <Head title="Leaderboard" />
            <div className="my-6 mx-10 flex">
                <div>
                    <Link href={route("pertanyaan")} className="my-auto">
                        <ArrowButton fillColor={"#02AF91"}></ArrowButton>
                    </Link>
                </div>
                <div className="my-auto ms-6">
                    <h1 className="font-black text-4xl">Leaderboard</h1>
                </div>
            </div>

            {users.map((user, index) => {
                let medalColor = "";
                let rankDisplay = null;

                if (index === 0) {
                    medalColor = "#Ffd700";
                    rankDisplay = <Medal fillColor={medalColor} size={"64"} />;
                } else if (index === 1) {
                    medalColor = "#C0C0C0";
                    rankDisplay = <Medal fillColor={medalColor} size={"64"} />;
                } else if (index === 2) {
                    medalColor = "#CD7F32";
                    rankDisplay = <Medal fillColor={medalColor} size={"64"} />;
                } else if (index < 10) {
                    rankDisplay = (
                        <div className="rounded-full border-4 p-4">
                            <div className="font-semibold text-2xl mx-2">
                                {index + 1}
                            </div>
                        </div>
                    );
                }

                return (
                    <div
                        key={user.id}
                        className="rounded-lg mx-12 my-8 p-7"
                        style={{ backgroundColor: "#02AF91" }}
                    >
                        <div className="flex justify-between">
                            <div className="flex">
                                <div className="me-5">{rankDisplay}</div>
                                <div>
                                    <div className="flex mb-2">
                                        <div className="font-black text-xl">
                                            {user.name}
                                        </div>
                                    </div>
                                    <div className="font-semibold text-lg">
                                        {user.jurusan.nama_jurusan}
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="font-semibold">
                                    {user.level}
                                </div>
                                <div className="mx-3"> - </div>
                                <div>{user.points} pts</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </DetailQuestionLayout>
    );
}
