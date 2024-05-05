import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        nim: '',
        angkatan: '',
        jurusan: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="nim" value="nim" />

                    <TextInput
                        id="nim"
                        name="nim"
                        value={data.nim}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('nim', e.target.value)}
                        required
                    />

                    <InputError message={errors.nim} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="angkatan" value="angkatan" />

                    <TextInput
                        id="angkatan"
                        name="angkatan"
                        value={data.angkatan}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('angkatan', e.target.value)}
                        required
                    />

                    <InputError message={errors.angkatan} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="jurusan" value="jurusan" />

                    <TextInput
                        id="jurusan"
                        name="jurusan"
                        value={data.jurusan}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('jurusan', e.target.value)}
                        required
                    />

                    <InputError message={errors.jurusan} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>
                    <Link
                        href={route('auth.google')}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        google
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                    
                </div>
            </form>
        </GuestLayout>
    );
}
