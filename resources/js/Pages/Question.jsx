import QuestionLayout from '@/Layouts/QuestionLayout';
import { Head } from '@inertiajs/react';

export default function Question({ auth, photoPath }) {
    return (
        <QuestionLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Question</h2>}
            photoPath={photoPath}
        >
            <Head title="Question" />

            <div className="flex flex-auto px-8 pt-16 justify-between">
                <div className="grid content-center font-sans text-3xl font-extrabold px-4 mr-10">Semua Pertanyaan</div>
                
                <div className="">
                    <a href="ajukan-pertanyaan">
                        <div className=" font-extrabold text-white rounded-2xl h-12 w-auto p-3 m-2" style={{backgroundColor: "#02AF91"}}>Ajukan pertanyaan</div>
                    </a>    
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
            
            <div className="flex justify-between px-8 pb-10">
                <div className="grid content-center justify-center px-4 rounded-lg border-4 border-gray-400 w-32 h-14 mx-4">
                    <div className="font-bold">Terbaru</div>
                </div>
                <div className="grid content-center justify-center px-4 rounded-lg border-4 border-gray-400 w-32 h-14 mx-4">
                    <div className="font-bold">Rekomendasi</div>
                </div>
                <div className="grid content-center justify-center px-4 rounded-lg border-4 border-gray-400 w-32 h-14 mx-4">
                    <div className="font-bold">Tersering</div>
                </div>
            </div>

            <div className="flex justify-center px-8 mx-4">
                <div className="rounded-lg border bg-gray-300 w-screen h-auto">
                    <div className="font-bold mx-6 my-8">Soal</div>
                    <div className="flex flex-row w-full">
                        <div className="flex flex-row ml-6">
                            <img
                                style={{
                                    height: "25px",
                                    width: "25px",
                                }}
                                src="/images/refresh.png"
                                alt=""
                            />
                            <div className="font-bold mx-2 mb-8">
                                User
                            </div>
                            <div className="mx-1">-</div>
                            <div className="mx-2">Ask 11 Months ago</div>
                        </div>
                        <div className="flex flex-auto flex-row justify-between mr-8 mb-8">
                            <div className="flex flex-row mr-4">
                                <img
                                    style={{
                                        height: "30px",
                                        width: "30px",
                                    }}
                                    src="/images/like.png"
                                    alt=""
                                />
                                <div className="mx-1">2</div>
                                <div className="">Vote</div>
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
            </div>
        </QuestionLayout>
    );
}
