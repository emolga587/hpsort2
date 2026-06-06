import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import "./App.css";

import Layout from "./components/Layout";
import SortPage from "./components/SortPage";
import hpDB from "./modules/HPDatabase";
import BogoSortPage from "./components/BogoSortPage";
import { faM } from "@fortawesome/free-solid-svg-icons";

interface Props { }
interface State {
  result: boolean;
  round: number;
}

const TITLE = "ハロプロソート";
// const TITLE = "🐼パンダさんソート🐼";

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <Layout title={TITLE}>
        <Router basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pandasan" element={<Panda />} />
            <Route path="/home" element={<Home />} />
            <Route path="/hp" element={<HPAll />} />
            <Route path="/hptrainee" element={<HPAllTrainee />} />
            <Route path="/trainee" element={<Trainee />} />
            <Route path="/allstars" element={<AllStars />} />
            <Route path="/aprilfool" element={<Bogo />} />
          </Routes>
        </Router>
      </Layout>
    );
  }
}

class Home extends React.Component<Props, State> {
  render() {
    //function helpAlert() {
    //  alert("選択を繰り返すことで自分だけのランキングを作ることができます。\n今まで気づかなかった「好き」を再発見するためにご活用ください。\nソートの結果はあなたにとってのランキングであり、メンバーの優劣を意味しません。")
    //}
    return (
      <Grid container size={12} sx={{ justifyContent: "center" }} style={{ textAlign: "center" }} spacing={1}>
        <Grid container size={12} sx={{ justifyContent: "center" }} spacing={0}>
          <h1>{TITLE}</h1>
        </Grid>
        <Grid container size={12} sx={{ justifyContent: "center" }} spacing={0}>
          <p>選択を繰り返すことで自分だけのランキングを作ることができます。</p>
        </Grid>
        {
          /*
          <Grid container size={12} sx={{ justifyContent: "center" }}><Button href="pandasan" style={{ background: 'linear-gradient(45deg, #11A316 30%, #11BF16 90%)', color: 'white', fontWeight: 'bold', height: 40 }}>🐼パンダさんソート🐼</Button></Grid>
          */
        }
        <Grid container size={12} sx={{ justifyContent: "center" }} spacing={0}>
          <p>(最終更新: '25/4/5)</p>
        </Grid>
        <Grid container size={12} sx={{ justifyContent: "center" }} spacing={0}>
          {
            /*
            <p><a href="./" onClick={helpAlert}>🔰ハロプロソートとは？🔰</a></p>
            */
          }
        </Grid>
        <Grid container size={12} sx={{ justifyContent: "center" }}><Button href="hp" style={{ background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)', color: 'white', fontWeight: 'bold', height: 32 }}>ハロプロ全員ソート</Button></Grid>
        <Grid container size={12} sx={{ justifyContent: "center" }}><Button href="hptrainee" style={{ background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)', color: 'white', fontWeight: 'bold', height: 32 }}>ハロプロ全員ソート(研修生含む)</Button></Grid>
        <Grid container size={12} sx={{ justifyContent: "center" }}><Button href="trainee" style={{ background: 'linear-gradient(45deg, #11d386 30%, #11d3bb 90%)', color: 'white', fontWeight: 'bold', height: 32 }}>ハロプロ研修生ソート</Button></Grid>
        <Grid container size={12} sx={{ justifyContent: "center" }}><Button href="allstars" style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', fontWeight: 'bold', height: 32 }}>歴代ハロプロ全員ソート</Button></Grid>
        <Grid container size={12} sx={{ justifyContent: "center" }} spacing={0}>
          <Grid size={12}><p>ソート結果の利用にあたって、以下の行為を禁じます。</p></Grid>
          <p>
            <u>
              ソート結果を利用してメンバーを中傷する行為<br />
              ソート結果をメンバーへ伝える行為（方法を問わず）<br />
              ソート結果のスクリーンショットをSNSにアップロードする行為<br />
            </u>
          </p>
        </Grid>
        <Grid container size={12} sx={{ justifyContent: "center" }} spacing={0}>
          <p><a href="https://twitter.com/xxgentaroxx" target="_blank" rel="noreferrer">@xxgentaroxx</a>大先生による、歴代ハロプロメンバーの<a href="https://github.com/xxgentaroxx/HP_DB" target="_blank" rel="noreferrer">オープンデータ</a>から自動生成しています。</p>
          <p>「引き分け」ボタンを1回押すと比較回数が4-5回減ります。急いでいる方は活用してください。</p>
        </Grid>
        <Grid container size={12} sx={{ justifyContent: "center" }} spacing={0}>
          <p>
            <Button href="https://twitter.com/emolga587" target="_blank" size="small" style={{ backgroundColor: "#000000", color: "#ffffff", textTransform: "none", margin: 2 }}><FontAwesomeIcon icon={faXTwitter} />&nbsp;@emolga587</Button>
            <Button href="https://mixi.social/@emolga" target="_blank" size="small" style={{ backgroundColor: "#ff6347", color: "#ffffff", textTransform: "none", margin: 2 }}><FontAwesomeIcon icon={faM} />&nbsp;@emolga</Button>
            <Button href="https://github.com/emolga587/hpsort2" target="_blank" size="small" style={{ backgroundColor: "#000000", color: "#ffffff", textTransform: "none", margin: 2 }}><FontAwesomeIcon icon={faGithub} />&nbsp;GitHub</Button>
          </p>
        </Grid>
      </Grid>
    );
  }
}

class HPAll extends React.Component<Props, State> {
  render() {
    return <div><SortPage members={hpDB.currentHPMembers} sortName="ハロプロソート" /></div>;
  }
}

class HPAllTrainee extends React.Component<Props, State> {
  render() {
    return <div><SortPage members={hpDB.currentHPMembersIncludeTrainee} sortName="ハロプロ(研修生含)ソート" /></div>;
  }
}

class Trainee extends React.Component<Props, State> {
  render() {
    return <div><SortPage members={hpDB.membersByGroup("ハロプロ研修生").concat(hpDB.membersByGroup("ハロプロ研修生北海道"))} sortName="ハロプロ研修生ソート" /></div>;
  }
}

class Panda extends React.Component<Props, State> {
  private members = hpDB.membersByGroup("恩賜上野動物園").concat(hpDB.membersByGroup("神戸市立王子動物園")).concat(hpDB.membersByGroup("アドベンチャーワールド"));
  render() {
    return <div><SortPage members={this.members} sortName="🐼パンダさんソート🐼" /></div>;
  }
}

class AllStars extends React.Component<Props, State> {
  render() {
    return <div><SortPage members={hpDB.allStars} sortName="歴代ハロプロ全員ソート" /></div>;
  }
}
class Bogo extends React.Component<Props, State> {
  render() {
    return <div><BogoSortPage members={hpDB.currentHPMembers} sortName="全自動ハロプロソート" /></div>;
  }
}
