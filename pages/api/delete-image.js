import { s3Setup } from 'lib/server';

const s3 = s3Setup();

export default async (req, res) => {
    if (req.method === 'DELETE') {
        try {
            const key = req.query.key;
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
            };
            s3.deleteObject(params, (error) => {
                if (error) {
                    res.status(500).send(error);
                }
            });
            res.status(200).json({ success: true, message: 'File has been deleted successfully' });
        } catch (error) {
            console.error('Error fetching files: ', error);
            res.status(500).json({
                error: `An error occured while fetching contents of a bucket.`,
            });
        }
    } else {
        res.status(405).send('Method not allowed');
    }
};
