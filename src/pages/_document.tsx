import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel='shortcut icon' type='image/svg+xml' href='/vercel.svg' />
                    <meta name='theme-color' content='#fff' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <div id='app-modal' />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
