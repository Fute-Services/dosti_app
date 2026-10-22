import FloatingActionButton from "../../components/FloatingActionButton";
// import type { ReactNode } from "react";
import { FaHandshake } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { RiShieldCheckLine } from "react-icons/ri";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { PiNotebookBold } from "react-icons/pi";
import { FileText } from "lucide-react";
import construct from '../../assets/des/construction.png'


interface ActionItem {
    label: string;
    to: string;
    //   icon: JSX.Element;
    icon: React.ReactNode
    external?: boolean;
}

const actions: ActionItem[] = [
    {
        label: "Brochure",
        to: "/brochure",
        icon: <PiNotebookBold size={20} />,
    },
    {
        label: "About us",
        to: "/about",
        icon: <HiMiniInformationCircle size={20} />,
    },
    {
        label: "Tie-up",
        to: "/tie_up",
        icon: <FaHandshake size={18} />,
    },
    {
        label: "Specification",
        to: "/specification",
        icon: <FileText size={18} />,
        // external: true,
    },
    {
        label: "Construction Progress",
        to: "/construction",
        icon: (
            <img
                src={construct}
                alt="Construction"
                className="w-5 h-5 object-contain"
            />
        ),
    },
    {
        label: "Testimonial",
        to: "/testimonials",
        icon: <RiShieldCheckLine size={18} />,
        // external: true,
    },

    {
        label: "Disclaimer",
        to: "/disclaimer",
        icon: <MdRateReview size={18} />,
    },
];

export default function FloatingActions() {
    return (
        <div className="fixed -right-6 top-[45%] md:top-1/2 z-[4000] -translate-y-1/2">
            <div className="flex flex-col gap-2 animate-fadeIn">
                {actions.map((action) => (
                    <FloatingActionButton
                        key={action.label}
                        icon={action.icon}
                        label={action.label}
                        to={action.to}
                        external={action.external}
                    />
                ))}
            </div>
        </div>
    );
}
