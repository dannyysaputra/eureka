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
                    <div className="">Terbaru</div>
                </div>
                <div className="grid content-center justify-center px-4 rounded-lg border-4 border-gray-400 w-32 h-14 mx-4">
                    <div className="">Rekomendasi</div>
                </div>
                <div className="grid content-center justify-center px-4 rounded-lg border-4 border-gray-400 w-32 h-14 mx-4">
                    <div className="">Sering</div>
                </div>
            </div>

            <div className="flex justify-center px-8 mx-4">
                <div className="rounded-lg border bg-gray-300 w-screen h-auto">
                    //Soal
                </div>
            </div>
        </QuestionLayout>
    );
}
