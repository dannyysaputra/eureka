import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function EditProfile({ auth, photoPath, jurusans }) {
    const user = auth.user;

    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        nim: user.nim,
        angkatan: user.angkatan,
        jurusanId: user.jurusan_id,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);

        put(route("profile.update"));
    };

    return (
        <MainLayout user={auth.user} photoPath={photoPath}>
            <Head title="Edit Profile" />

            <div className="flex lg:ps-4 lg:pt-4">
                <div className="font-bold lg:ms-4 lg:my-10">
                    <p className="lg:text-4xl">Edit Profile</p>
                </div>
            </div>
            <div className="flex lg:mb-16">
                <div className="lg:w-1/3 lg:p-12">
                    <div className="flex justify-center">
                        <div className="lg:py-14 lg:px-16 border-4 rounded-full border-green-400">
                            <div className="flex justify-center">
                                <i class="fa-solid fa-user fa-5x"></i>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center lg:mt-10">
                        <button className="rounded p-2 font-bold lg:w-full text-white mb-4 bg-red-600 hover:bg-red-500">
                            Hapus akun
                        </button>
                    </div>
                </div>
                <div className="lg:w-2/3 lg:p-12">
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="font-semibold mb-4">
                                <p className="text-xl">Nama</p>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full rounded-none border-none shadow-none text-green-600"
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
                            <div className="font-semibold mb-4">
                                <p className="text-xl">NIM</p>
                                <TextInput
                                    id="nim"
                                    name="nim"
                                    value={data.nim}
                                    className="mt-1 block w-full rounded-none border-none shadow-none text-green-600"
                                    autoComplete="nim"
                                    isFocused={true}
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
                            <div className="font-semibold mb-4">
                                <p className="text-xl">Email</p>
                                <TextInput
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-none border-none shadow-none text-green-600"
                                    autoComplete="email"
                                    isFocused={true}
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
                            <div className="font-semibold mb-4">
                                <p className="text-xl mb-1">Jurusan</p>
                                <select
                                    id="jurusan"
                                    name="jurusanId"
                                    value={data.jurusanId}
                                    onChange={(e) =>
                                        setData("jurusanId", e.target.value)
                                    }
                                    className="p-2 focus:border-indigo-500 shadow-sm block w-full border-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                                    // message={errors.jurusan}
                                    className="mt-2"
                                />
                            </div>
                            <div className="font-semibold mb-4">
                                <p className="text-xl">Angkatan</p>
                                <TextInput
                                    id="angkatan"
                                    name="angkatan"
                                    value={data.angkatan}
                                    className="mt-1 block w-full rounded-none border-none shadow-none text-green-600"
                                    autoComplete="angkatan"
                                    isFocused={true}
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
                            <div className="my-auto">
                                <PrimaryButton
                                    className="rounded-none mt-4 bg-green-600"
                                    disabled={processing}
                                >
                                    Gabung sekarang!
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
