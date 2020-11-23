function ImageHeader({ images }) {
    const getTotalFileSize = () => images.reduce((a, b) => a + b.size, 0);

    return (
        <div className="md:items-end md:justify-between md:flex">
            <div>
                <h2 className="mb-2 text-2xl font-bold leading-7 text-gray-900 md:mb-0 sm:text-3xl sm:leading-9">
                    {images.length} Document{images.length === 1 ? '' : 's'}
                </h2>
            </div>
            <p>Total size: {getTotalFileSize()}kb</p>
        </div>
    );
}

export default ImageHeader;
