import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import BogoSorter from "../modules/BogoSorter";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import hpDB from "../modules/HPDatabase";

interface Props {
    members: string[];
    sortName: string;
}
interface State {
    result: boolean;
    count: number;
}

export default class BogoSortPage extends React.Component<Props, State> {
    sort: BogoSorter;
    constructor(props: Props) {
        super(props);
        this.sort = new BogoSorter(props.members);
        this.state = { result: this.sort.sort(), count: 1 };
    }
    render() {
        let list: JSX.Element[] = [];
        let tweet_url: string = "https://twitter.com/intent/tweet?text=" + encodeURI(`${this.props.sortName}結果\n`);
        for (let i of this.sort.array) {
            let groupname = hpDB.groupNameByMemberName(i);
            list.push(<TableRow key={i}><TableCell align="left">{this.sort.rank(i)}位</TableCell><TableCell align="left">{i}</TableCell><TableCell><span style={{ color: hpDB.groupName2ColorCode(hpDB.groupNameByMemberName(i)) }}><FontAwesomeIcon icon={faUserFriends} /></span> {groupname}</TableCell></TableRow>);
            if (this.sort.rank(i) <= 10) {
                tweet_url += encodeURI(`${this.sort.rank(i)}位: ${i}\n`);
            }
        }
        tweet_url += "&hashtags=" + encodeURI("ハロプロボゴソート") + "&url=" + encodeURI("https://16be.at/sort/");
        console.log(tweet_url);
        return <Grid container spacing={1}>
            <Grid container item xs={12} justify="center">
                <p>
                    <Button variant="contained" size="large" style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', fontWeight: 'bold', height: 40 }} onClick={() => {
                        this.setState({ result: this.sort.sort(), count: this.state.count + 1 });
                    }}>{this.props.sortName}</Button>
                </p>
            </Grid>
            <Grid container item xs={12} justify="center" spacing={0}>
                【ラウンド{this.state.count}】<br />
                <a href="https://ja.wikipedia.org/wiki/%E3%83%9C%E3%82%B4%E3%82%BD%E3%83%BC%E3%83%88" target="_blank" rel="noreferrer">ボゴソートとは？</a>
            </Grid>
            <Grid container item xs={12} justify="center">
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: "#444" }}>
                                <TableCell style={{ color: "white", fontWeight: "bold" }}>順位</TableCell>
                                <TableCell style={{ color: "white", fontWeight: "bold" }}>名前</TableCell>
                                <TableCell style={{ color: "white", fontWeight: "bold" }}>所属グループ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid container item xs={12} justify="center">
                <p>
                    <Button href={tweet_url} target="_blank" variant="contained" size="large" style={{ backgroundColor: "#00ACEE", color: "#ffffff" }}><FontAwesomeIcon icon={faTwitter} />&nbsp;ツイート</Button>
                </p>
            </Grid>
        </Grid>
    }
}