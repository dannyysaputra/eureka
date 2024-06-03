import { useState } from "react";
import EurekaLogo from "@/Components/EurekaLogo";
import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";

export default function DetailQuestionLayout({
    user,
    header,
    photoPath,
    children,
}) {
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
                                    <Dropdown.Link href={route("profile")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("pertanyaan-saya")}
                                    >
                                        Pertanyaan Saya
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
                <div className="float-start flex-none w-60 h-auto">
                    <div className="">
                        <div className="flex flex-col h-auto pt-10 px-7">
                            <Link href="/">
                                <div className="flex flex-row my-2">
                                    <div>
                                        <i class="fa-solid fa-house fa-xl"></i>
                                    </div>
                                    <div className="font-bold text-xl ms-2">
                                        Beranda
                                    </div>
                                </div>
                            </Link>
                            <Link href="/koleksi">
                                <div className="flex flex-row my-2">
                                    <div>
                                        <i class="fa-regular fa-star fa-xl"></i>
                                    </div>
                                    <div className="font-bold text-xl ms-2">
                                        Koleksi
                                    </div>
                                </div>
                            </Link>

                            <Link href="/profile">
                                <div className="flex flex-row my-2 ms-1">
                                    <div>
                                        <i class="fa-solid fa-user fa-xl"></i>
                                    </div>
                                    <div className="font-bold text-xl ms-3">
                                        Profil
                                    </div>
                                </div>
                            </Link>
                            <Link href="/ajukan-pertanyaan">
                                <div className="flex flex-row my-2">
                                    <div>
                                        <i class="fa-regular fa-circle-question fa-xl"></i>
                                    </div>
                                    <div className="font-bold text-xl ms-3">
                                        Ajukan Pertanyaan
                                    </div>
                                </div>
                            </Link>
                            <Link href="/leaderboard">
                                <div className="flex flex-row my-2">
                                    <div>
                                        <i class="fa-solid fa-chart-simple fa-xl"></i>
                                    </div>
                                    <div className="font-bold text-xl ms-3">
                                        Leaderboard
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {!user ? (
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
                        ) : (
                            <div className="flex flex-col-reverse h-auto place-items-center mt-60">
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    <div className="flex rounded-lg w-44 h-10 mb-6 justify-center bg-red-500">
                                        <div className="font-bold text-xl my-auto place-content-center">
                                            Keluar
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="fixed"></div>

                <div className="overflow-y-auto grow h-screen ms-4">
                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}
