"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export default function BookCarousel({ images }: { images: string[] }) {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderLoaded, setSliderLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created() {
      setSliderLoaded(true);
    },
  });

  useEffect(() => {
    let loadedCount = 0;
    images.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setLoaded(true);
        }
      };
    });
  }, [images]);

  if (!loaded) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-gray-400">
        Chargement des images...
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        ref={sliderRef}
        className="keen-slider rounded-lg shadow bg-white overflow-hidden"
      >
        {images.map((url, index) => (
          <div
            key={index}
            className="keen-slider__slide flex justify-center items-center"
          >
            <img
              src={url}
              alt={`Image ${index + 1}`}
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
              className="object-contain max-h-[400px] w-full cursor-zoom-in hover:opacity-90 transition"
            />
          </div>
        ))}
      </div>

      {sliderLoaded && (
        <>
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute top-1/2 -translate-y-1/2 left-0 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute top-1/2 -translate-y-1/2 right-0 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicateur de slide */}
      {sliderLoaded && images.length > 1 && (
        <div className="text-center mt-4 text-sm text-gray-600">
          {currentSlide + 1} / {images.length}
        </div>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={images.map((src) => ({ src }))}
        plugins={[Zoom]}
      />
    </div>
  );
}
