import * as React from "react";
import { StyleSheet, css } from "aphrodite";
import { Button } from "reactstrap";

const Preview = () => {
  const [key, setKey] = React.useState(0);
  const reloadFrame = () => setKey(key => key + 1);
  return (
    <div className={css(styles.container)}>
      <Button
        type="button"
        color="success"
        onClick={reloadFrame}
        className="m-1"
      >
        Reload frame
      </Button>
      <iframe
        src="http://localhost:3000/pl/course_instance/1/instructor/question/1/"
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

export default Preview;
