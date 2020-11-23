import { getImages } from 'lib/server';

export default async (req, res) => {
    if (req.method === 'GET') {
        try {
            const filter = req.query.filter;
            const images = await getImages(filter);
            res.status(200).json(images);
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
