import * as React from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";

export interface Props {
  onSave: () => void;
}

const AppToolbar: React.FunctionComponent<Props> = ({ onSave }) => {
  return (
    <Navbar color="dark" dark>
      <NavbarBrand tag="span">PrairieEditor</NavbarBrand>
      <Button color="primary" onClick={() => onSave()}>
        Save and reload preview
      </Button>
    </Navbar>
  );
};

export default AppToolbar;
