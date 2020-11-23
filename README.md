# File upload with NextJs

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It is currently deployed at: https://image-upload-three.vercel.app/

## Installation

First, run `yarn` to install dependencies and then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

As the application is making use of AWS s3 we need some AWS credentials and settings. These can be set in a `.env` file. An `.env.sample` shows whats needed:

```
ACCESS_KEY=aws-access-key
SECRET_KEY=aws-super-secret-key
S3_BUCKET_NAME=bucket-name
REGION=some-aws-region
```

To run tests:

```bash
yarn test
```
