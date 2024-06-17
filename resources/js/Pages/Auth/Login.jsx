import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import ArrowButton from "@/Components/ArrowButton";
import GoogleLogo from "@/Components/GoogleLogo";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({
    status,
    canResetPassword,
    photoPath,
    backgroundPath,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        const emailPattern = /^[^\s@]+@uinsgd\.ac\.id$/;
        const isDosenEmail = emailPattern.test(data.email);

        if (isDosenEmail) {
            post(route("login-dosen"));
        } else {
            post(route("login"));
        }
    };

    const formBackgroundStyle = {
        backgroundImage: `url(${photoPath})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    const authBackgroundStyle = {
        backgroundImage: `url(${backgroundPath})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div className="flex" style={formBackgroundStyle}>
                <div
                    className="flex-auto w-64"
                    style={authBackgroundStyle}
                ></div>
                <div className="flex-auto w-32">
                    <div className="flex justify-between mx-3">
                        <Link href={route("welcome")} className="my-auto">
                            <ArrowButton fillColor={"white"}></ArrowButton>
                        </Link>
                        <img src="/images/saintek.png" alt="" />
                    </div>
                    <div className="px-5 font-black text-white text-center my-16">
                        <h1 className="text-6xl font-bold">Selamat Datang</h1>
                        <p className="text-2xl mt-2 font-semibold">
                            Masukkan Akun Untuk Melanjutkan
                        </p>
                    </div>
                    <div className="mx-5 p-7">
                        <form onSubmit={submit}>
                            <div className="mb-10">
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* <div className="block mt-4">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                        Remember me
                                    </span>
                                </label>
                            </div> */}

                            <div className="flex justify-end my-3">
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-white hover:text-gray-900 font-bold"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>

                            <div className="flex items-center mt-8">
                                <PrimaryButton
                                    className="w-full"
                                    disabled={processing}
                                >
                                    Log in
                                </PrimaryButton>
                            </div>
                            <div className="flex my-7">
                                <div className="border-t-2 border-white flex-grow m-auto"></div>
                                <p className="text-white font-bold text-lg mx-4">
                                    ATAU
                                </p>
                                <div className="border-t-2 border-white flex-grow m-auto"></div>
                            </div>
                            <a href={route("auth.google")}>
                                <div className="flex justify-center mb-10 w-full px-4 py-2 bg-white border border-transparent rounded-full font-semibold text-white dark:text-blue-900 tracking-widest hover:bg-blue-400 dark:hover:bg-white focus:bg-blue-700 dark:focus:bg-white active:bg-blue-900">
                                    <GoogleLogo></GoogleLogo>
                                    <p className="ms-5 font-extrabold text-black hover:text-white">
                                        Masuk menggunakan Google
                                    </p>
                                </div>
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
