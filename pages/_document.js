import Document, { Html, Head, Main, NextScript } from 'next/document';
const csp = `default-src 'self' next-image-upload-demo.s3.eu-central-1.amazonaws.com data: 'unsafe-inline'`;

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        console.log();
        return (
            <Html>
                <Head>
                    {process.env.NODE_ENV !== 'development' && (
                        <meta httpEquiv="Content-Security-Policy" content={csp} />
                    )}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
