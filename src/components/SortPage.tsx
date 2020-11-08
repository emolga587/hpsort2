import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Sorter from "../modules/Sorter";
import MemberPicture from "./MemberPicture";

interface Props {
  members: string[];
}
interface State {
  result: boolean;
}

export default class SortPage extends React.Component<Props, State> {
  sort: Sorter;
  constructor(props: Props) {
    super(props);
    this.sort = new Sorter(props.members);
    this.state = { result: this.sort.sort() };
  }
  render() {
    if (this.state.result) {
      let list: JSX.Element[] = [];
      for (let i of this.sort.array) {
        list.push(<tr key={i}><td>{this.sort.rank(i)}位</td><td>{i}</td></tr>);
      }
      return <div>
        <table>
          <thead><tr><th>順位</th><th>名前</th></tr></thead>
          <tbody>{list}</tbody>
        </table>
        【ラウンド{this.sort.currentRound} - {this.sort.progress}%】
        </div>
    } else {
      return (
        <div style={{textAlign: "center"}}>
          <Grid container spacing={1}>
            <Grid container item xs={12} justify="center">
              <h2>ハロプロソート</h2>
            </Grid>
            <Grid container item xs={12} justify="center" spacing={0}>
            【ラウンド{this.sort.currentRound} - {this.sort.progress}%】
            </Grid>
            <Grid container item xs={6} justify="center">
              <MemberPicture name={this.sort.lastChallenge[0]}
                onClick={() => {
                  this.sort.addResult(this.sort.lastChallenge[0], this.sort.lastChallenge[1]);
                  this.setState({ result: this.sort.sort() });
                }} />
            </Grid>
            <Grid container item xs={6} justify="center">
              <MemberPicture name={this.sort.lastChallenge[1]}
                onClick={() => {
                  this.sort.addResult(this.sort.lastChallenge[1], this.sort.lastChallenge[0]);
                  this.setState({ result: this.sort.sort() });
                }} />
            </Grid>
            <Grid container item xs={12} justify="center">
              <Button variant="contained" size="large"
                onClick={() => {
                  this.sort.addEqual(this.sort.lastChallenge[0], this.sort.lastChallenge[1]);
                  this.setState({ result: this.sort.sort() });
                }}
              >
                引き分け
            </Button>
            </Grid>
        </Grid>
        </div>
      );
    }
  }
}