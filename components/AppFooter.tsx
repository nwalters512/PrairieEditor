import * as React from "react";
import { CustomInput } from "reactstrap";

export interface Props {
  vimModeEnabled: boolean;
  toggleVimModeEnabled: () => void;
}

const AppFooter: React.FunctionComponent<Props> = props => {
  const { vimModeEnabled, toggleVimModeEnabled } = props;
  return (
    <div className="d-flex flex-row bg-dark text-white px-2">
      <div className="ml-auto d-flex flex-row">
        <CustomInput
          type="switch"
          id="vimModeToggle"
          name="vimModeToggle"
          onChange={() => toggleVimModeEnabled()}
          checked={vimModeEnabled}
        />
        <label className="mr-2 my-0" htmlFor="vimModeToggle">
          VIM keybindings
        </label>
      </div>
    </div>
  );
};

export default AppFooter;
