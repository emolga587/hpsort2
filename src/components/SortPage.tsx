import React from "react";
import Button from "@material-ui/core/Button";
import Sorter from "../modules/Sorter";

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
    this.state = { result: this.sort.sort()};
  }
  render() {
    if (this.state.result) {
      let list: JSX.Element[] = [];
      for(let i of this.sort.array){
        list.push(<tr key={i}><td>{this.sort.rank(i)}位</td><td>{i}</td></tr>);
      }
      return <div>
        <table>
          <thead><tr><th>順位</th><th>名前</th></tr></thead>
          <tbody>{list}</tbody>
        </table>
        【{this.sort.progress}% - ラウンド{this.sort.currentRound}】
        </div>
    } else {
      return (
        <div>
          <Button
            onClick={() => {
              this.sort.addResult(this.sort.lastChallenge[0], this.sort.lastChallenge[1]);
              this.setState({ result: this.sort.sort() });
            }}
          >
            {this.sort.lastChallenge[0]}
          </Button>
          <Button
            onClick={() => {
              this.sort.addEqual(this.sort.lastChallenge[0], this.sort.lastChallenge[1]);
              this.setState({ result: this.sort.sort() });
            }}
          >
            引き分け
            </Button>
          <Button
            onClick={() => {
              this.sort.addResult(this.sort.lastChallenge[1], this.sort.lastChallenge[0]);
              this.setState({ result: this.sort.sort() });
            }}
          >
            {this.sort.lastChallenge[1]}
          </Button>
            【{this.sort.progress}% - ラウンド{this.sort.currentRound}】
        </div>
      );
    }
  }
}