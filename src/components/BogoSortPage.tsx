import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import BogoSorter from "../modules/BogoSorter";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import hpDB from "../modules/HPDatabase";
import ResultPicture from "./ResultPicture";

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
        let rankTable: React.ReactElement[] = [];
        let tweet_url: string = "https://twitter.com/intent/tweet?text=" + encodeURI(`${this.props.sortName}結果\n`);
        let max_output = 10;
        if (this.props.members.length < 10) {
          max_output = 3;
        } else if (this.props.members.length < 20) {
          max_output = 5;
        }
  
        for (let i of this.sort.array.slice(0,20)) {
          let groupname = hpDB.groupNameByMemberName(i);
          rankTable.push(<TableRow key={i}><TableCell align="left">{this.sort.rank(i)}位</TableCell><TableCell align="left">{i}</TableCell><TableCell><span style={{ color: hpDB.groupName2ColorCode(hpDB.groupNameByMemberName(i)) }}><FontAwesomeIcon icon={faUserFriends} /></span> {groupname}</TableCell></TableRow>);
          if (this.sort.rank(i) <= max_output) {
            tweet_url += encodeURI(`${this.sort.rank(i)}位: ${i}\n`);
          }
        }
  
        const getResultPictures = (min: number, max: number) => {
          const result: React.ReactElement[] = [];
          for (let i of this.sort.array) {
            if (this.sort.rank(i) >= min && this.sort.rank(i) <= max) {
              result.push(
                <ResultPicture key={i} name={i} rank={this.sort.rank(i)}></ResultPicture>
              );
            }
          }
          return result;
        }
  
        tweet_url += "&hashtags=" + encodeURI("ハロプロソート") + "&url=" + encodeURI("https://16be.at/sort/");
        console.log(tweet_url);
        return <Grid container sx={{ alignItems: "flex-start" }}>
          <Grid container size={12} sx={{ justifyContent: "center" }}>
            <h2 style={{ marginBottom: 0 }}>{this.props.sortName}結果</h2>
          </Grid>
          <Grid container size={12} sx={{ justifyContent: "center" }}>
            <p style={{ marginTop: 0, marginBottom: 10 }}>AIが決めた、あなたの結果です</p>
          </Grid>
          <Grid container size={{ xs: 12, md: 6 }} sx={{ justifyContent: "center" }}>
            <Grid container size={12} sx={{ justifyContent: "center" }}>
              {getResultPictures(1, 1)}
            </Grid>
            <Grid container size={12} sx={{ justifyContent: "center" }}>
              {getResultPictures(2, 3)}
            </Grid>
            <Grid container size={12} sx={{ justifyContent: "center" }}>
              {getResultPictures(4, 6)}
            </Grid>
            <Grid container size={12} sx={{ justifyContent: "center" }}>
              {getResultPictures(7, 10)}
            </Grid>
          </Grid>
  
          <Grid container size={{ xs: 12, md: 6 }} sx={{ justifyContent: "center" }}>
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
                  {rankTable}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid container size={12} sx={{ justifyContent: "center" }}>
            <br />
            <p>
              <Button href={tweet_url} target="_blank" variant="contained" size="large" style={{ backgroundColor: "#00ACEE", color: "#ffffff" }}><FontAwesomeIcon icon={faTwitter} />&nbsp;結果をツイート</Button>
            </p>
          </Grid>
        </Grid>
    }
}
