import { s3Setup } from 'lib/server';
import sanitize from 'sanitize-filename';

const s3 = s3Setup();

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const requestData = JSON.parse(req.body);
            const sanitizedName = sanitize(requestData.name);
            const s3Params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: sanitizedName,
                ContentType: requestData.type,
                ACL: 'public-read',
                Expires: 60,
            };

            const signedUrl = await s3.getSignedUrlPromise('putObject', s3Params);
            res.status(200).json({ signedUrl });
        } catch (error) {
            console.error(error);

            res.status(500).json({ error });
        }
    } else {
        res.status(405).send('Method not allowed');
    }
};
