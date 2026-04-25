import HomeLayout from "@/Layouts/HomeLayout";
import HeroSection from "./Components/HeroSection";
import SummarySection from "./Components/SummarySection";
import ActivitysSection from "./Components/ActivitysSection";
import DescriptionSection from "./Components/DescriptionSection";
import { Head } from "@inertiajs/react";

export default function Negocio({ trade }) {
    if (!trade) return null;

    return (
        <HomeLayout>
            <Head title={trade.comercial_name || "Negocio"} />
            <div className="pb-20">
                <HeroSection trade={trade} />
                <SummarySection trade={trade} />
                <ActivitysSection activities={trade.activities} />
                <DescriptionSection trade={trade} />

            </div>
        </HomeLayout>
    );
}
