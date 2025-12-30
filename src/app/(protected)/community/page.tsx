import MobileBg from "@/assets/images/chapter-listing-mobile-bg.png";
import Bg from "@/assets/images/desktop-learn-bg.png";
import CreatePost from "@/components/elements/create-post";
import IdeaList from "@/components/sections/community/idea-list";
import { getSession } from "@/lib/session";
import Image from "next/image";


// const CreatePost = dynamic(() => import("@/components/elements/create-post"), {
//   loading: () => (
//     <div className="fixed bottom-[120px] md:bottom-5 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary animate-pulse" />
//   ),
// });

// const IdeaList = dynamic(
//   () => import("@/components/sections/community/idea-list"),
//   {
//     loading: () => (
//       <div className="space-y-1 grid grid-cols-1 gap-4 py-4">
//         {Array.from({ length: 3 }).map((_, i) => (
//           <div
//             key={i}
//             className="post-card-bg border border-white/10 rounded-xl animate-pulse"
//           >
//             <div className="flex items-center gap-x-3 p-4">
//               <div className="w-10 h-10 bg-gray-300 rounded-full" />
//               <div className="space-y-2">
//                 <div className="w-24 h-3 bg-gray-300 rounded" />
//                 <div className="w-16 h-2 bg-gray-300 rounded" />
//               </div>
//             </div>
//             <div className="w-full h-[350px] bg-gray-300 rounded" />
//             <div className="py-4 px-4 space-y-3">
//               <div className="w-3/4 h-3 bg-gray-300 rounded" />
//               <div className="w-full h-3 bg-gray-300 rounded" />
//               <div className="w-1/3 h-2 bg-gray-300 rounded" />
//             </div>
//           </div>
//         ))}
//       </div>
//     ),
//   }
// );

export default async function Page() {

  const { isAuthenticated } = await getSession();



  return (
    <div className="p-4 max-md:pb-[100px] md:p-12 lg:p-10 max-w-2xl mx-auto h-full overflow-hidden">
      <IdeaList />
      {
        isAuthenticated && <CreatePost />
      }
      <Image
        src={Bg}
        alt="Background image"
        className="max-lg:hidden fixed inset-0 -z-10"
        style={{
          top: "100px",
        }}
      />
      <Image
        src={MobileBg}
        alt="Background image"
        className="md:hidden fixed inset-0 top-0 -z-10 object-cover  w-full"
      />
    </div>
  );
}
