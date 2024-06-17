import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import ArrowButton from "@/Components/ArrowButton";
import GoogleLogo from "@/Components/GoogleLogo";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register({ photoPath, backgroundPath, jurusans }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        nim: "",
        angkatan: "",
        jurusanId: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        console.log(data);

        post(route("register"));
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
            <Head title="Register" />

            <div className="flex" style={formBackgroundStyle}>
                <div className="flex-auto w-32">
                    <div className="flex justify-between mx-3">
                        <Link href={route("welcome")} className="my-auto">
                            <ArrowButton fillColor={'white'}></ArrowButton>
                        </Link>
                        <img src="/images/saintek.png" alt="" />
                    </div>
                    <div className="px-5 font-black text-white text-center">
                        <h1 className="text-6xl">Register</h1>
                        <p className="text-2xl mt-2">
                            Buat akun untuk mulai berjelajah
                        </p>
                    </div>
                    <div className="mx-5">
                        <form onSubmit={submit} className="px-14 py-5">
                            <div className="my-8">
                                <TextInput
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="my-8">
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    placeholder="Email"
                                    autoComplete="email"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="my-8">
                                <TextInput
                                    id="nim"
                                    name="nim"
                                    value={data.nim}
                                    className="mt-1 block w-full"
                                    placeholder="NIM"
                                    autoComplete="nim"
                                    onChange={(e) =>
                                        setData("nim", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.nim}
                                    className="mt-2"
                                />
                            </div>

                            <div className="my-8">
                                <TextInput
                                    id="angkatan"
                                    name="angkatan"
                                    value={data.angkatan}
                                    className="mt-1 block w-full"
                                    placeholder="Angkatan"
                                    autoComplete="angkatan"
                                    onChange={(e) =>
                                        setData("angkatan", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.angkatan}
                                    className="mt-2"
                                />
                            </div>

                            <div className="my-8">
                                <select
                                    id="jurusan"
                                    name="jurusanId"
                                    value={data.jurusanId}
                                    onChange={(e) =>
                                        setData("jurusanId", e.target.value)
                                    }
                                    className="p-2 focus:border-indigo-500 rounded-full shadow-sm block w-full border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                                >
                                    <option value="">Pilih Jurusan</option>
                                    {jurusans.map((jurusan) => (
                                        <option
                                            key={jurusan.id}
                                            value={jurusan.id}
                                        >
                                            {jurusan.nama_jurusan}
                                        </option>
                                    ))}
                                </select>

                                <InputError
                                    message={errors.jurusan}
                                    className="mt-2"
                                />
                            </div>

                            <div className="my-8">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    placeholder="Password"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-8">
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    placeholder="Confirm Password"
                                    autoComplete="confirm-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="items-center">
                                <div className="flex justify-end mb-6">
                                    <Link
                                        href={route("login")}
                                        className="underline text-gray-600  hover:text-gray-900"
                                    >
                                        Already registered?
                                    </Link>
                                </div>

                                <PrimaryButton className="w-full" disabled={processing}>
                                    Gabung sekarang!
                                </PrimaryButton>

                                <a href={route("auth.google")}>
                                    <div className="flex justify-center mt-6 mb-10 w-full px-4 py-2 bg-white border border-transparent rounded-full font-semibold text-white dark:text-blue-900 tracking-widest hover:bg-blue-400 dark:hover:bg-white focus:bg-blue-700 dark:focus:bg-white active:bg-blue-900">
                                        <GoogleLogo></GoogleLogo>
                                        <p className="ms-5 font-extrabold text-black hover:text-white">
                                            Daftar menggunakan Google
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
                <div
                    className="flex-auto w-64"
                    style={authBackgroundStyle}
                ></div>
            </div>
        </GuestLayout>
    );
}
