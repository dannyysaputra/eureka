import EurekaLogo from "@/Components/EurekaLogo";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { TERipple } from "tw-elements-react";

export default function Welcome({ auth, photoPath }) {
    return (
        <MainLayout user={auth.user} photoPath={photoPath}>
            <Head title="Welcome" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-3 sm:px-6 lg:px-8">
                    <div className="col-span-2 my-10">
                        <img src="/images/eureka.png" alt="" />
                        <p className="font-bold text-xl my-2 ms-1">
                            Platform tanya jawab tugas mahasiswa SAINTEK.
                        </p>
                        <div className="mb-3 my-24 md:w-96">
                            <div className="relative mb-4 flex w-96 flex-wrap items-stretch">
                                <input
                                    type="search"
                                    className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto bg-slate-200 rounded-l-lg border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-secondary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-secondary"
                                    placeholder="Cari pertanyaan..."
                                    aria-label="Search"
                                    aria-describedby="button-addon1"
                                />
                                <div className="rounded-r-lg bg-gray-600 p-2">
                                    <i class="fa-solid fa-magnifying-glass mx-4 my-auto bg-gray-600"></i>
                                </div>
                                
                            </div>
                            <div>
                                Ajukan pertanyaan mu
                            </div>
                        </div>
                    </div>
                    <div className="flex-row-reverse">
                        <img
                            className=""
                            src="/images/hero.png"
                            alt="Hero"
                        />
                    </div>
                </div>
                <div className="flex justify-around p-4 w-100 flex-wrap mx-10" style={{backgroundColor : "#02AF91"}}>       
                    <div className="font-bold text-center">Elektro</div>
                    <div className="font-bold text-center">Informatika</div>
                    <div className="font-bold text-center">Fisika</div>
                    <div className="font-bold text-center">Agroteknologi</div>
                    <div className="font-bold text-center">Kimia</div>
                    <div className="font-bold text-center">Matematika</div>
                    <div className="font-bold xtext-center">Biologi</div>    
                </div>   
            </div>
            
            <div className="flex justify-left p-10 h-44-auto w-1/2 rounded-br-lg flex-wrap my-10" style={{backgroundColor : "#02AF91"}}>       
                    <div className="font-bold text-6xl text-center flex-auto text-white">APA ITU EUREKA?</div>
            </div>

            <div className="max-w-7xl mx-auto my-10 grid grid-cols-3 sm:px-6 lg:px-8">
                <div className="flex-row size-4/5 mx-32">
                    <img
                        className=""
                        src="/images/two-person.png"
                        alt="Two-Person"
                    />
                </div>

                <div className="absolute right-0 p-10 h-44-auto w-1/2 rounded-bl-lg flex-wrap my-32" style={{backgroundColor : "#02AF91"}}>
                        <div className="font-bold text-xl text-center text-white">Nama Eureka! terinspirasi dari kata Yunani yang berarti “Saya menemukannya!” dan menunjukkan bahwa website ini dapat membantu user menemukan solusi untuk tugas SAINTEK.</div> 
                </div>
            </div>
            
            <div className="h-auto" style={{backgroundColor : "#02AF91"}}>
                <div className="size-40 absolute right-0 h-auto mt-8">
                    <img src="/images/saintek.png" alt="" />
                </div>
                <div className="flex justify-between items-center lg:px-8 lg:pt-8">
                    <EurekaLogo></EurekaLogo> 
                </div>
                

                <div className="mt-2 px-9 font-bold text-2xl text-white">
                    <p>JADILAH YANG<br />PALING CERDAS</p>
                </div>
                <div className="font-light text-center">Copyright reserved</div>
            </div>
        </MainLayout>
    );
}
