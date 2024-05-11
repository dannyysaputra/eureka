import QuestionLayout from '@/Layouts/QuestionLayout';
import { Head } from '@inertiajs/react';

export default function Question({ auth, photoPath }) {
    return (
        <QuestionLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Question</h2>}
            photoPath={photoPath}
        >
            <Head title="Question" />

            <div>
                Halama Question <br />
                <a href="ajukan-pertanyaan">link ke ajukan pertanyaan</a>
            </div>
        </QuestionLayout>
    );
}
