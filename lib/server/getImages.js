import s3Setup from './s3Setup';

async function getImages(filter = '') {
    const s3 = s3Setup();
    const bucketData = await s3.listObjects({ Bucket: process.env.S3_BUCKET_NAME }).promise();

    // TODO: this should be improved. not the most performant
    const images = bucketData.Contents.filter((i) => i.Key.toLowerCase().includes(filter.toLowerCase())).map(
        (image) => ({
            key: image.Key,
            size: getKiloByteFileSize(image.Size),
        })
    );
    return images;
}

const getKiloByteFileSize = (bytes) => parseInt(bytes / 1000);

export default getImages;
