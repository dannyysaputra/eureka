import MainLayout from "@/Layouts/MainLayout";
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
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
                                    className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-secondary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-secondary"
                                    placeholder="Cari pertanyaan..."
                                    aria-label="Search"
                                    aria-describedby="button-addon1"
                                />

                                {/* <!--Search button--> */}
                                <TERipple color="light">
                                    <button
                                        className="relative z-[2] flex items-center rounded-r bg-secondary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-black shadow-md transition duration-150 ease-in-out hover:bg-secondary-700 hover:shadow-lg focus:bg-secondary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-secondary-800 active:shadow-lg"
                                        type="button"
                                        id="button-addon1"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </TERipple>
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
