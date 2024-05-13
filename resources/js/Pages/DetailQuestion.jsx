import DetailQuestionLayout from "@/Layouts/DetailQuestionLayout";
import { Head } from "@inertiajs/react";

export default function DetailQuestion({ auth, photoPath, pertanyaan }) {
    console.log(pertanyaan);
    
    return (
        <DetailQuestionLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    DetailQuestion
                </h2>
            }   
            photoPath={photoPath}
        >
            <Head title={pertanyaan.judul} />

            
        </DetailQuestionLayout>
    );
}
