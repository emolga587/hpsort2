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
      <AppBar position="static" style={{background: 'linear-gradient(45deg, #11A316 30%, #11BF16 70%, #11A316 90%)'}}>
        <Toolbar>
          <Typography variant="h5" style={{flexGrow: 1, fontFamily: "Kosugi Maru"}}>{this.props.children}</Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            href="home"
          >
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
