import HeroSection from "./Components/SummarySection";
import SummarySection from "./Components/SummarySection";
import ActivitysSection from "./Components/ActivitysSection";
import DescriptionSection from "./Components/DescriptionSection";
// import CommentsSection from "./Components/CommentsSection";

export default function Negocio() {
    return ( 
        <div>
            <HeroSection />
            <SummarySection />
            <ActivitysSection />
            <DescriptionSection />
            {/*<CommentsSection />} */}
        </div>
     );
}
