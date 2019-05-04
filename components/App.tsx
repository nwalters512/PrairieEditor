import * as React from "react";
import AppToolbar from "./AppToolbar";
import AppFooter from "./AppFooter";
import Editor from "./Editor";

const App: React.FunctionComponent = () => {
  return (
    <div className="app-wrapper">
      <AppToolbar />
      <Editor />
      <AppFooter />
      <style jsx>{`
        .app-wrapper {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default App;
