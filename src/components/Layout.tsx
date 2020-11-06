import React from "react";
import Header from "./Header";
import { Box, Container } from "@material-ui/core/";
interface Props {
  title?: string;
}

interface State {}

export default class Layout extends React.Component<Props, State> {
  render() {
    return (
      <Box>
        <Header>{this.props.title}</Header>
        <Container><div>{this.props.children}</div></Container>
      </Box>
    );
  }
}