async function uploadFile(signedUrl, selectedFile) {
    return fetch(signedUrl, {
        method: 'PUT',
        body: selectedFile,
    });
}

export default uploadFile;
