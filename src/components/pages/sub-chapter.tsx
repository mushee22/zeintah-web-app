import MobileBg from "@/assets/images/chapter-listing-mobile-bg.png";
import Image from "next/image";
import Container from "../elements/container";
import VideoListingSection from "../sections/sub-chapter/video-listing";

export default function SubChapterPageContent({ slug }: { slug: string }) {
  return (
    <Container className="h-full overflow-hidden">
      <VideoListingSection slug={slug} />
      <Image
        src={MobileBg}
        alt="Background image"
        className="md:hidden fixed inset-0 -z-10 top-0 object-cover  w-full"
      />
    </Container>
  );
}
