import EurekaLogo from "@/Components/EurekaLogo";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function Collection({ auth, photoPath }) {
    return (
        <MainLayout user={auth.user} photoPath={photoPath}>
            <Head title="Collection" />
            
            ini collection
        </MainLayout>
    );
}
