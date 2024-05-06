import ApplicationLogo from '@/Components/ApplicationLogo';
import EurekaLogo from '@/Components/EurekaLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:pt-0 ">
            {/* <div>
                <Link href="/">
                    <EurekaLogo />
                </Link>
            </div> */}

            <div className="w-full overflow-hidden">
                {children}
            </div>
        </div>
    );
}
