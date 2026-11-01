import { useMemo, useState } from "react";
import Masonry from "@/components/Masonry";
import PhotoLightbox, { AnimatePresence } from "./PhotoLightbox";
import { useReducedMotion } from "framer-motion";

const SF_STACK =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", system-ui, sans-serif';

// Sample photos in public/photos/ (Unsplash, see CREDITS.md). Height =
// normalized to a 600px column from each image's real aspect ratio so the
// masonry layout reads naturally.
const GRADUATION_PHOTOS: { file: string; height: number }[] = [
  { file: "01.jpeg", height: 900 },
  { file: "02.jpeg", height: 900 },
  { file: "03.jpeg", height: 400 },
  { file: "04.jpeg", height: 902 },
  { file: "05.jpeg", height: 900 },
  { file: "06.jpeg", height: 672 },
  { file: "07.jpeg", height: 400 },
  { file: "08.jpeg", height: 900 },
  { file: "09.jpeg", height: 758 },
  { file: "10.jpeg", height: 900 },
  { file: "11.jpeg", height: 900 },
  { file: "12.jpeg", height: 400 },
  { file: "13.jpeg", height: 900 },
  { file: "14.jpeg", height: 900 },
  { file: "15.jpeg", height: 900 },
  { file: "16.jpeg", height: 400 },
];

export default function PhotosPage() {
  const reducedMotion = useReducedMotion();
  const items = useMemo(
    () =>
      GRADUATION_PHOTOS.map(({ file, height }) => ({
        id: file,
        img: `/photos/${file}`,
        url: `/photos/${file}`,
        height,
      })),
    []
  );

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openLightbox = (id: string) =>
    setLightboxIndex(items.findIndex((it) => it.id === id));

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-black"
      style={{ fontFamily: SF_STACK }}
    >
      <div className="h-full w-full overflow-y-auto">
        <Masonry
          items={items}
          blurToFocus={false}
          duration={reducedMotion ? 0 : 0.18}
          stagger={0}
          scaleOnHover={false}
          colorShiftOnHover={false}
          onItemClick={openLightbox}
        />
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <PhotoLightbox
            photos={items}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
