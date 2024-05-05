import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { TERipple } from "tw-elements-react";

export default function Welcome({ auth, photoPath }) {
    return (
        <MainLayout user={auth.user} photoPath={photoPath}>
            <Head title="Welcome" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-3 sm:px-6 lg:px-8">
                    <div className="col-span-2 my-10">
                        <img src="/images/eureka.png" alt="" />
                        <p className="font-bold text-xl my-2 ms-1">
                            Platform tanya jawab tugas mahasiswa SAINTEK.
                        </p>
                        <div className="mb-3 my-24 md:w-96">
                            <div className="relative mb-4 flex w-96 flex-wrap items-stretch">
                                <input
                                    type="search"
                                    className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto bg-slate-200 rounded-lg border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-secondary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-secondary"
                                    placeholder="Cari pertanyaan..."
                                    aria-label="Search"
                                    aria-describedby="button-addon1"
                                />
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <div>
                                Ajukan pertanyaan mu
                            </div>
                        </div>
                    </div>
                    <div className="flex-row-reverse">
                        <img
                            className=""
                            src="/images/hero.png"
                            alt="Hero"
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
