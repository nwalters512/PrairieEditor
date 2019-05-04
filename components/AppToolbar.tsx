import * as React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

const AppToolbar: React.FunctionComponent = () => {
  return (
    <Navbar color="dark" dark>
      <NavbarBrand tag="span">PrairieEditor</NavbarBrand>
    </Navbar>
  );
};

export default AppToolbar;
