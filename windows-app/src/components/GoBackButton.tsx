// // import { useNavigate } from "react-router-dom";
// import { memo } from "react";

// interface GoBackButtonProps {
//   label?: string;
//   className?: string;
//   offsetClass?: string;
// }
// // hover:shadow-[0_4px_30px_rgba(255,80,80,0.4)]
// const GoBackButton = memo(function GoBackButton({
//   label = "GO BACK",
//   className = "",
//   offsetClass = "right-[3%] top-[15%]",
// }: GoBackButtonProps) {
//   // const navigate = useNavigate();

//   return (
//     <button
//       type="button"
//       onClick={(e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         // navigate(-1)
//         window.history.go(-1);
//       }

//       }
//       className={`
//         absolute ${offsetClass}
//         lg:px-6 lg:py-3 
//         px-2 py-1
//         rounded-3xl
//         z-[8000]
//         bg-white/15
//         backdrop-blur-2xl
//         border border-white/30
//         shadow-[0_4px_20px_rgba(255,255,255,0.25)]
//         text-white font-semibold tracking-wide
//         transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
//         hover:scale-110
//         hover:bg-white/25
//         hover:shadow-[0_2px_5px_rgba(0.10,1,0.5,2)]
//         animate-float1
//         cursor-pointer pointer-events-auto text-[11px] lg:text-sm  
//         ${className}
//       `}
//     >
//       {label}
//     </button>
//   );
// });

// export default GoBackButton;


// import { useNavigate } from "react-router-dom";
import { MdOutlineReplyAll } from "react-icons/md";

import { memo } from "react";

const GoBackButton = memo(function GoBackButton() {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        window.history.go(-1);
      }}
      className="
        absolute left-[2.5%] top-[13%]
        z-[8000]

        p-[10px] lg:p-[17px]
        rounded-full

        bg-white/20
        backdrop-blur-xl
        border border-black/30

        text-white
        shadow-lg

        transition-all duration-300 ease-in-out
        hover:bg-white/40
        hover:text-black/80

        animate-float1
        cursor-pointer 
        text-[11px] lg:text-sm
        pointer-events-auto
      "
    >
      <MdOutlineReplyAll />

    </button>
  );
});

export default GoBackButton;