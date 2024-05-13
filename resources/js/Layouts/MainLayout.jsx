import { useState } from "react";
import EurekaLogo from "@/Components/EurekaLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
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

    const footerStyle = {
        backgroundImage: `url(${photoPath})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        height: "auto",
        color: "white",
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav style={navbarStyle}>
                <div className="flex justify-between items-center lg:px-8 lg:pt-6">
                    <EurekaLogo></EurekaLogo>
                    <div className="flex gap-5">
                        <Link href="/pertanyaan">
                            <div className="text-lg font-black text-black">Pertanyaan</div>
                            <div className="border-y-2 border-black font-bold"></div>
                        </Link>
                        <Link href="/login">
                            <div className="text-lg font-black text-black">Masuk</div>
                            <div className="border-y-2 border-black font-bold"></div>
                        </Link>
                        <Link href="/register">
                            <div className="text-lg font-black text-black">Daftar</div>
                            <div className="border-y-2 border-black font-bold"></div>
                        </Link>
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
