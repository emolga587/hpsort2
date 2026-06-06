import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from '@mui/icons-material/Home';

interface Props {
  children?: React.ReactNode;
}

interface State { }

export default class Header extends React.Component<Props, State> {
  render() {
    return (
      <AppBar position="static" style={{color: 'white', backgroundColor: "rgb(33, 150, 243)", boxShadow: "none"}}>
        <Toolbar>
          <Typography variant="h5" style={{flexGrow: 1, fontWeight: 500}}>{this.props.children}</Typography>
          <IconButton
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            href="./home"
          >
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
