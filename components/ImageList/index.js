import ImageInfo from './ImageInfo';
import ImageHeader from './ImageHeader';

function ImageList({ images, mutate, error }) {
    if (error) {
        return <div className="text-red-600">Error loading images...</div>;
    }
    if (!images) {
        return <div className="text-gray-700">Loading...</div>;
    }
    return (
        <>
            <ImageHeader images={images} />
            <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
                {images.map((image) => (
                    <ImageInfo image={image} mutate={mutate} key={image.key} />
                ))}
            </div>
        </>
    );
}

export default ImageList;
