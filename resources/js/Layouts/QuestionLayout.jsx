import { useState } from "react";
import EurekaLogo from "@/Components/EurekaLogo";
import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";

export default function MainLayout({ user, header, photoPath, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const navbarStyle = {
        backgroundImage: `url(${photoPath})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "90px",
        color: "white",
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav style={navbarStyle}>
                <div className="flex justify-between items-center lg:px-8 lg:pt-5">
                    <EurekaLogo></EurekaLogo>
                    <div className="relative mb-4 flex w-96 flex-wrap items-stretch">
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
                    <div className="flex gap-5">
                        {user ? (
                            // Jika user sudah login, tampilkan Dropdown
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent leading-4 font-medium rounded-md text-black dark:text-gray-400 dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {user.name}

                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        ) : (
                            // Jika user belum login, tampilkan Link untuk menu About
                            <Link href="#">
                                <div className="text-lg font-black text-black">
                                    About
                                </div>
                                <div className="border-y-2 border-black font-bold"></div>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <div className="flex flex-row">
                <div className="fixed">
                    <div className="flex-none w-60 h-auto">
                        <div className="">
                            <div className="flex flex-col h-auto pt-10 px-7">
                                <div className="flex flex-row">
                                    <img
                                        style={{
                                            height: "40px",
                                            width: "40px",
                                        }}
                                        className=""
                                        src="/images/home-icon.png"
                                        alt="Hero"
                                    />
                                    <div className="font-bold text-xl my-2">
                                        Beranda
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <img
                                        style={{
                                            height: "40px",
                                            width: "40px",
                                        }}
                                        className=""
                                        src="/images/star-icon.png"
                                        alt="Hero"
                                    />
                                    <div className="font-bold text-xl my-3">
                                        Koleksi
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <img
                                        style={{
                                            height: "40px",
                                            width: "40px",
                                        }}
                                        className=""
                                        src="/images/profile.png"
                                        alt="Hero"
                                    />
                                    <div className="font-bold text-xl my-3">
                                        Profil
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <img
                                        style={{
                                            height: "40px",
                                            width: "40px",
                                        }}
                                        src="/images/wpf_ask-question.png"
                                        alt="Hero"
                                    />
                                    <div className="font-bold text-xl">
                                        Ajukan Pertanyaan
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse h-auto place-items-center mt-60">
                                <div
                                    className="flex rounded-lg w-44 h-10 mb-6 justify-center"
                                    style={{ backgroundColor: "#02AF91" }}
                                >
                                    <div className="font-bold text-xl my-3 place-content-center">
                                        Sign Up
                                    </div>
                                </div>
                                <div
                                    className="flex rounded-lg w-44 h-10 mb-2 justify-center"
                                    style={{ backgroundColor: "#02AF91" }}
                                >
                                    <div className="font-bold text-xl my-3 place-content-center">
                                        Login
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grow h-40 ms-64">
                    <main>{children}</main>
                </div>

                <div className="flex py-8 px-4">
                    <div className="flex flex-col rounded-xl w-60 h-screen bg-gray-300">
                        <div className="text-xl font-extrabold text-center p-4">
                            Top Questions
                        </div>
                        <div className="flex rounded-xl justify-center p-2 m-4 w-auto h-auto bg-white">
                            <div className="">
                                <p>Disini Pertanyaan</p>
                            </div>
                        </div>
                        <div className="text-xl font-extrabold text-center p-4">
                            Popular Tags
                        </div>
                        <div className="flex rounded-xl justify-center p-1 mx-4 w-auto h-auto bg-white">
                            <div className="">
                                <p>Disini Tags nya</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
