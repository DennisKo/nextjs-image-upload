import { useState } from 'react';
import LoadingSpinner from 'components/icons/LoadingSpinner';

function ImageInfo({ image, mutate }) {
    const [isDeleting, setDeleting] = useState(false);
    const [hasDeleteError, setDeleteError] = useState(false);
    const handleDelete = async () => {
        setDeleting(true);
        const encodedKey = encodeURIComponent(image.key);
        const deleteResponse = await fetch(`/api/delete-image?key=${encodedKey}`, {
            method: 'DELETE',
        });
        if (deleteResponse.ok) {
            setDeleting(false);
            setDeleteError(false);
            mutate((curr) => curr.filter((i) => i.key !== image.key), false);
        } else {
            setDeleteError(true);
            setDeleting(false);
        }
    };
    return (
        <div className="relative p-4 border-2 border-gray-500">
            <h3 className="h-16 font-bold break-all">{image.key}</h3>
            <div className="flex justify-between mt-3">
                <div className="text-sm text-gray-600">{image.size}kb</div>
                <button
                    className="inline-flex items-center justify-center w-24 px-2 py-1 text-xs font-medium leading-3 text-gray-800 bg-indigo-200 border border-gray-800 rounded-sm hover:bg-indigo-300 focus:shadow-outline-blue focus:border-blue-600"
                    onClick={handleDelete}
                >
                    {isDeleting && (
                        <LoadingSpinner className="inline w-2 h-2 mr-2 text-gray-700 fill-current animate-spin" />
                    )}
                    {isDeleting ? 'Deleting' : 'Delete'}
                </button>
            </div>
            {hasDeleteError && (
                <span className="absolute bottom-0 right-0 text-xs text-red-600 w-60">
                    There was an error deleting the file...
                </span>
            )}
        </div>
    );
}

export default ImageInfo;
