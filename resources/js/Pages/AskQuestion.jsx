import QuestionLayout from "@/Layouts/QuestionLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import RichTextEditor from "@/Components/RichTextEditor";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function AskQuestion({ auth, photoPath, mataKuliahs, pertanyaans, topCourses }) {
    console.log(mataKuliahs);

    const { data, setData, post, processing, errors, reset } = useForm({
        judul: "",
        deskripsi: "",
        mataKuliah: "",
    });

    console.log(data);

    const [semester, setSemester] = useState("");
    const [filteredMataKuliahs, setFilteredMataKuliahs] = useState([]);

    const handleSemesterChange = (e) => {
        const selectedSemester = e.target.value;
        setSemester(selectedSemester);
        console.log("Semester yang dipilih:", selectedSemester);

        const filteredCourses = mataKuliahs.filter((mataKuliah) => {
            return mataKuliah.semester === selectedSemester;
        });

        setFilteredMataKuliahs(filteredCourses);
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data);

        post(route("submit-pertanyaan"));
    };

    return (
        <QuestionLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Ajukan Pertanyaan
                </h2>
            }
            photoPath={photoPath}
            pertanyaans={pertanyaans}
            topCourses={topCourses}
        >
            <Head title="Ajukan Pertanyaan" />

            <div className="mt-12">
                <h1 className="font-black text-2xl">Ajukan Pertanyaan</h1>
                <form onSubmit={submit}>
                    <div className="flex gap-5 mt-4">
                        <select
                            id="semester"
                            name="semester"
                            value={semester}
                            onChange={handleSemesterChange}
                            className="p-2 focus:border-indigo-500 rounded-full shadow-sm block w-full border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        >
                            <option value="">Pilih Semester</option>
                            <option value="1">Semester 1</option>
                            <option value="2">Semester 2</option>
                            <option value="3">Semester 3</option>
                            <option value="4">Semester 4</option>
                            <option value="5">Semester 5</option>
                            <option value="6">Semester 6</option>
                            <option value="7">Semester 7</option>
                            <option value="8">Semester 8</option>
                        </select>

                        <select
                            id="mataKuliah"
                            name="mataKuliah"
                            value={data.mataKuliah}
                            onChange={(e) =>
                                setData("mataKuliah", e.target.value)
                            }
                            className="p-2 focus:border-indigo-500 rounded-full shadow-sm block w-full border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        >
                            <option value="">Pilih Mata Kuliah</option>
                            {filteredMataKuliahs.map((mataKuliah) => (
                                <option
                                    key={mataKuliah.id}
                                    value={mataKuliah.id}
                                >
                                    {mataKuliah.nama_matkul}
                                </option>
                            ))}
                        </select>

                        <InputError
                            message={errors.mataKuliah}
                            className="mt-2"
                        />
                    </div>
                    <div className="my-8">
                        <TextInput
                            id="judul"
                            name="judul"
                            placeholder="Judul"
                            value={data.judul}
                            className="mt-1 block w-full"
                            autoComplete="judul"
                            isFocused={true}
                            onChange={(e) => setData("judul", e.target.value)}
                            required
                        />

                        <InputError message={errors.judul} className="mt-2" />
                    </div>
                    <div className="flex flex-col">
                        <div className="mt-5 h-auto flex-grow">
                            <RichTextEditor
                                name="deskripsi"
                                value={data.deskripsi}
                                onChange={(content) =>
                                    setData("deskripsi", content)
                                }
                            />
                        </div>
                        <PrimaryButton disabled={processing} className="mt-5">
                            Submit
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </QuestionLayout>
    );
}
