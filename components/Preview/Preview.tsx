import * as React from "react";
import { StyleSheet, css } from "aphrodite";

export interface PreviewHandles {
  reload: () => void;
}

export interface Props {
  courseInstanceId: number;
  questionId: number;
}

const Preview: React.RefForwardingComponent<PreviewHandles, Props> = (
  props,
  ref
) => {
  const { courseInstanceId, questionId } = props;
  const [key, setKey] = React.useState(0);
  const reloadFrame = () => setKey(key => key + 1);
  React.useImperativeHandle(ref, () => ({
    reload() {
      reloadFrame();
    }
  }));
  return (
    <div className={css(styles.container)}>
      <iframe
        src={`http://localhost:3000/pl/course_instance/${courseInstanceId}/instructor/question/${questionId}/`}
        key={key}
        className={css(styles.frame)}
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  frame: {
    flex: "1 1 0%"
  }
});

export default React.forwardRef(Preview);
