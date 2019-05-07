import { Props } from "./Editor";
import dynamic from "next/dynamic";
import { StyleSheet, css } from "aphrodite";
import { Spinner } from "reactstrap";

const DynamicEditor = dynamic(() => import("./Editor"), {
  ssr: false,
  loading: () => (
    <div className={css(styles.loading)}>
      <Spinner color="light" />
    </div>
  )
});

const Editor: React.FunctionComponent<Props> = props => {
  return <DynamicEditor {...props} />;
};

export default Editor;

const styles = StyleSheet.create({
  loading: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 0%",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 0,
    minHeight: 0,
    backgroundColor: "#1e1e1e"
  }
});
