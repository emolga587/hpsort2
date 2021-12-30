import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import HomeIcon from '@material-ui/icons/Home';

interface Props { }

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
            href="./"
          >
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
