import { useState } from "react";
import EurekaLogo from "@/Components/EurekaLogo";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";

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

    const footerStyle = {
        backgroundImage: `url(${photoPath})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        height: "auto",
        color: "white",
    };

    let isDosen;

    if (user) {
        isDosen = user.role == "dosen";
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav style={navbarStyle}>
                <div className="flex justify-between items-center lg:px-8 lg:pt-6">
                    <EurekaLogo></EurekaLogo>
                    <div className="flex gap-5">
                        <Link href={isDosen ? '/dosen/pertanyaan' : '/pertanyaan'}>
                            <div className="text-lg font-black text-black">
                                Pertanyaan
                            </div>
                            <div className="border-y-2 border-black font-bold"></div>
                        </Link>
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
                                        href={
                                            isDosen
                                                ? route("dosen.logout")
                                                : route("logout")
                                        }
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        ) : (
                            <>
                                <Link href="/login">
                                    <div className="text-lg font-black text-black">
                                        Masuk
                                    </div>
                                    <div className="border-y-2 border-black font-bold"></div>
                                </Link>
                                <Link href="/register">
                                    <div className="text-lg font-black text-black">
                                        Daftar
                                    </div>
                                    <div className="border-y-2 border-black font-bold"></div>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main>{children}</main>

            <div className="h-auto" style={{ backgroundColor: "#02AF91" }}>
                <nav style={footerStyle}>
                    <div className="flex justify-center">
                        <div className="items-center h-auto p-4 mt-4">
                            <EurekaLogo></EurekaLogo>
                        </div>
                    </div>
                    <div className="flex justify-center mt-2 px-9 font-bold text-2xl text-white">
                        <p>"JADILAH YANG PALING CERDAS"</p>
                    </div>
                    <div className="font-bold text-center py-4 text-white">
                        Copyright reserved
                    </div>
                </nav>
            </div>
        </div>
    );
}
