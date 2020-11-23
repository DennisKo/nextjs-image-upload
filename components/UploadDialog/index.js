import React, { useState } from 'react';
import { uploadFile, getSignedUrl } from 'lib/client';
import LoadingSpinner from 'components/icons/LoadingSpinner';
import UploadButton from './UploadButton';

const MAX_FILE_SIZE_MB = 10 * 1024 * 1024;

function UploadDialog({ mutate }) {
    const [isUploading, setUploading] = useState(false);
    const [hasUploadError, setUploadError] = useState(false);
    const fileInput = React.useRef(null);

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const formData = new FormData();
            formData.append('selected', selectedFile);
            if (selectedFile.size > MAX_FILE_SIZE_MB) {
                setUploading(true);
                return;
            }
            setUploading(true);
            const { signedUrl } = await getSignedUrl({ name: selectedFile.name, type: selectedFile.type });
            const upload = await uploadFile(signedUrl, selectedFile);
            if (upload.ok) {
                setUploadError(false);
                mutate();
            } else {
                setUploadError(true);
            }
            if (fileInput.current) {
                fileInput.current.value = '';
            }

            setUploading(false);
        }
    };

    const handleUploadClick = () => {
        fileInput.current.click();
    };

    return (
        <div className="order-first mb-1 md:order-last md:mb-0">
            <UploadButton isDisabled={isUploading} handleClick={handleUploadClick}>
                {isUploading && (
                    <LoadingSpinner className="inline w-3 h-3 mr-3 text-gray-700 fill-current animate-spin" />
                )}
                <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
            </UploadButton>
            <div className="inline-block mt-1 ml-2 text-red-600 md:ml-0 md:absolute">
                {hasUploadError && 'Error while uploading'}
            </div>
            <input
                data-testid="file-input"
                type="file"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
                ref={fileInput}
                style={{ display: 'none' }}
            />
        </div>
    );
}

export default UploadDialog;
