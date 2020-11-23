async function getSignedUrl(fileInfo) {
    const signedUrl = await fetch('api/sign-url', {
        method: 'POST',
        'content-type': 'application/json',
        body: JSON.stringify(fileInfo),
    });
    return signedUrl.json();
}

export default getSignedUrl;
