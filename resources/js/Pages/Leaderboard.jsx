import DetailQuestionLayout from "@/Layouts/DetailQuestionLayout";
import ArrowButton from "@/Components/ArrowButton";
import Medal from "@/Components/Medal";
import { Head, Link } from "@inertiajs/react";

export default function DetailQuestion({ auth, photoPath }) {
    return (
        <DetailQuestionLayout
            user={auth.user}
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
            <div
                className="rounded-lg mx-12 my-8 p-7"
                style={{ backgroundColor: "#02AF91" }}
            >
                <div className="flex justify-between">
                    <div className="flex">
                        <div className="me-5">
                            <Medal fillColor={"yellow"} size={"64"}></Medal>
                        </div>

                        <div>
                            <div className="flex mb-2">
                                <div className="font-black text-xl">
                                    Danny Suggi Saputra
                                </div>
                            </div>
                            <div className="font-semibold text-lg">
                                Teknik Informatika
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="font-semibold">
                            Pemula
                        </div>
                        <div className="mx-3"> - </div>
                        <div>500 pts</div>
                    </div>
                </div>
            </div>
        </DetailQuestionLayout>
    );
}
