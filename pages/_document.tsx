import Document, {
  Html,
  Head,
  Main,
  NextScript,
  NextDocumentContext,
  RenderPageResponse,
  DefaultDocumentIProps,
  DocumentProps
} from "next/document";
import { StyleSheetServer } from "aphrodite";

interface Props {
  ids: string[];
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: NextDocumentContext) {
    // @ts-ignore The aphrodite typings are bad; renderStatic returns the
    // value returned from the callback in the `html` prop
    const { html, css } = StyleSheetServer.renderStatic(() => ctx.renderPage());
    const ids = css.renderedClassNames;
    return { ...(html as RenderPageResponse), css, ids };
  }

  constructor(props: Props & DefaultDocumentIProps & DocumentProps) {
    super(props);
    /* Take the renderedClassNames from aphrodite (as generated
     in getInitialProps) and assign them to __NEXT_DATA__ so that they
     are accessible to the client for rehydration. */
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids;
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
          <style
            data-aphrodite
            dangerouslySetInnerHTML={{ __html: this.props.css.content }}
          />
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
