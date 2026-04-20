import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/Components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const imageModules = import.meta.glob(
    '/public/Fotos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
    {
        eager: true,
        import: 'default',
    },
);

const carouselImages = Object.values(imageModules).sort((a, b) =>
    String(a).localeCompare(String(b)),
);

export default function Background() {
    const images = carouselImages.length
        ? carouselImages
        : Array.from({ length: 5 }, (_, index) =>
              `https://picsum.photos/1920/1080?random=${index + 1}`,
          );

    return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 5000,
                        stopOnInteraction: false,
                    }),
                ]}
                className="absolute inset-0 h-full w-full"
                opts={{ loop: true }}
            >
                <CarouselContent>
                    {images.map((imageSrc, index) => (
                        <CarouselItem key={`${imageSrc}-${index}`}>
                            <div className="relative h-full min-h-screen w-full">
                                <img
                                    src={imageSrc}
                                    alt={`Fondo ${index + 1}`}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    onError={(event) => {
                                        event.currentTarget.src = `https://picsum.photos/1920/1080?random=${index + 1}`;
                                    }}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden" />
                <CarouselNext className="hidden" />
            </Carousel>

            <div className="absolute inset-0 bg-black/45" />
        </div>
    );
}