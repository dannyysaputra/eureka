import QuestionLayout from '@/Layouts/QuestionLayout';
import { Head } from '@inertiajs/react';

export default function AskQuestion({ auth, photoPath }) {
    return (
        <QuestionLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Ajukan Pertanyaan</h2>}
            photoPath={photoPath}
        >
            <Head title="Ajukan Pertanyaan" />

            <div>
                Halaman ask Question
            </div>
        </QuestionLayout>
    );
}
