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
            <div className="rounded-lg mx-12 my-8 h-auto pb-4" style={{backgroundColor: "#02AF91"}}>
                <div className="flex flex-row p-4 ml-3">
                    <div className="grid content-center">
                        <img
                        style={{
                            height: "40px",
                            width: "40px",
                        }}
                        src="/images/template_profile.png"
                        alt=""
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <p className="font-extrabold">Denis Sitampan</p>
                        <div className="flex flex-row">
                            <div className="w-20 h-auto mr-4">
                                <p>15/04/2024</p>
                            </div>
                            <p>-</p>
                            <div className="ml-2">
                                <p>Jurusan</p>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
                
                <div className="flex flex-row rounded-t-lg mx-6 mt-2 pb-2 border-x-2 border-t-2 border-black bg-white ">
                    <div className="pr-32">
                        <div className="font-bold m-2">
                            <p1>{pertanyaan.judul}</p1>
                            <div className="my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ipsa cumque ipsum in ullam iusto excepturi amet vero similique fugiat sed magnam, inventore ad aliquam officiis error culpa, velit itaque. Impedit porro vel magnam atque non, sed officia reprehenderit praesentium.</div>
                        </div>
                    </div>
                    <div className="p-2">
                        <img
                        style={{
                            height: "40px",
                            width: "80px",
                        }}
                        src="/images/ribbon.png"
                        alt=""
                        />
                    </div>
                </div>
                <div className="rounded-b-lg py-1 mx-6 border-2 border-black bg-gray-300">
                    <div className="flex justify-center font-extrabold">
                        <div className="rounded-full px-2 mr-2" style={{backgroundColor: "#02AF91"}}>3</div>
                        Komentar
                    </div>
                </div>
            </div>

            <div className="rounded-lg mx-12 my-8 h-auto py-4" style={{backgroundColor: "#02AF91"}}>
                <div className="flex flex-row rounded-t-lg mx-6 pb-2 border-x-2 border-t-2 border-black bg-white ">
                    <div>

                        <div className="flex flex-row mx-1 my-4">
                            <div className="grid content-center">
                                <img
                                style={{
                                    height: "40px",
                                    width: "40px",
                                }}
                                src="/images/template_profile.png"
                                alt=""
                                />
                            </div>
                            
                            <div className="flex flex-col">
                                <p className="font-extrabold">Danny Spakborr</p>
                                <div className="flex flex-row">
                                    <div className="w-20 h-auto mr-4">
                                        <p>15/04/2024</p>
                                    </div>
                                    <p>-</p>
                                    <div className="ml-2">
                                        <p>Jurusan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pr-32">
                            <div className="font-bold m-2">
                                <p1>{pertanyaan.judul}</p1>
                                <div className="my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ipsa cumque ipsum in ullam iusto excepturi amet vero similique fugiat sed magnam, inventore ad aliquam officiis error culpa, velit itaque. Impedit porro vel magnam atque non, sed officia reprehenderit praesentium.</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <img
                        style={{
                            height: "35px",
                            width: "80px",
                        }}
                        src="/images/heart-like.png"
                        alt=""
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 divide-x mx-6 rounded-b-lg w-auto py-1 border-2 border-black bg-gray-300">
                    <div className="">
                        <div className="flex justify-center font-extrabold">
                            <div className="rounded-full px-2 mr-2" style={{backgroundColor: "#02AF91"}}>3</div>
                            Suka
                        </div>
                    </div>
                    <div className="">
                        <div className="flex justify-center font-extrabold">
                            <div className="rounded-full px-2 mr-2" style={{backgroundColor: "#02AF91"}}>3</div>
                            Komentar
                        </div>
                    </div>
                </div>
            </div>
        </DetailQuestionLayout>
    );
}
