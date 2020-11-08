import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import HomeIcon from '@material-ui/icons/Home';
import { styled } from '@material-ui/core/styles';

interface Props { }

interface State { }

const CustomAppBar = styled(AppBar)({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 70%, #2196F3 90%)',
});

export default class Header extends React.Component<Props, State> {
  render() {
    return (
      <CustomAppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>{this.props.children}</Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            href="/"
          >
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </CustomAppBar>
    );
  }
}
