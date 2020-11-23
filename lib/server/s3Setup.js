import AWS from 'aws-sdk';

function s3Setup() {
    const s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
        region: process.env.REGION,
    });
    return s3;
}

export default s3Setup;
