import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import "./App.css";

import Layout from "./components/Layout";
import SortPage from "./components/SortPage";
import hpDB from "./modules/HPDatabase";
import BogoSortPage from "./components/BogoSortPage";

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
        <Router basename={process.env.PUBLIC_URL}>
          <Route exact path="/" component={Home} />
          <Route exact path="/pandasan" component={Panda} />
          <Route exact path="/home" component={Home} />
          <Route path="/hp" component={HPAll} />
          <Route path="/hptrainee" component={HPAllTrainee} />
          <Route path="/trainee" component={Trainee} />
          <Route path="/allstars" component={AllStars} />
          <Route path="/aprilfool" component={Bogo} />
        </Router>
      </Layout>
    );
  }
}

class Home extends React.Component<Props, State> {
  render() {
    function helpAlert() {
      alert("選択を繰り返すことで自分だけのランキングを作ることができます。\n今まで気づかなかった「好き」を再発見するためにご利用ください。\nソートの結果はあなたにとってのランキングであり、メンバーの優劣を意味しません。")
    }
    return (
      <Grid container item xs={12} justifyContent="center" style={{ textAlign: "center" }} spacing={1}>
        <Grid container item xs={12} justifyContent="center" spacing={0}>
          <h1>{TITLE}</h1>
        </Grid>
        <Grid container item xs={12} justifyContent="center" spacing={0}>
          <p>ハロプロソートは、あなたの毎日に小さな喜びを届けていきます。小さな選択が、いつしか大きなランキングとなって、人生を輝かせていく…</p>
          <p>そんなコンセプトで、お送りするソートです。</p>
        </Grid>
        {
          /*
          <Grid container item xs={12} justifyContent="center"><Button href="pandasan" style={{ background: 'linear-gradient(45deg, #11A316 30%, #11BF16 90%)', color: 'white', fontWeight: 'bold', height: 40 }}>🐼パンダさんソート🐼</Button></Grid>
          */
        }
        <Grid container item xs={12} justifyContent="center" spacing={0}>
          <p>(最終更新:2023/4/1)</p>
        </Grid>
        <Grid container item xs={12} justifyContent="center" spacing={0}>
          <p><a href="./" onClick={helpAlert}>🔰ハロプロソートとは？🔰</a><br></br><br></br></p>
        </Grid>
        <Grid container item xs={12} justifyContent="center"><Button href="aprilfool" style={{ background: 'linear-gradient(45deg, #cca11f 30%, #e6b422 90%)', color: 'white', fontWeight: 'bold', height: 48, fontSize: "24px"}}>全自動ハロプロソート</Button></Grid>
        <p>あなたに代わってAIが究極の選択をします<br/><br/>従来のソート</p>
        <Grid container item xs={12} justifyContent="center"><Button href="hp" style={{ background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)', color: 'white', fontWeight: 'bold', height: 32 }}>ハロプロ全員ソート</Button></Grid>
        <Grid container item xs={12} justifyContent="center"><Button href="hptrainee" style={{ background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)', color: 'white', fontWeight: 'bold', height: 32 }}>ハロプロ全員ソート(研修生含む)</Button></Grid>
        <Grid container item xs={12} justifyContent="center"><Button href="trainee" style={{ background: 'linear-gradient(45deg, #11d386 30%, #11d3bb 90%)', color: 'white', fontWeight: 'bold', height: 32 }}>ハロプロ研修生ソート</Button></Grid>
        <Grid container item xs={12} justifyContent="center"><Button href="allstars" style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', fontWeight: 'bold', height: 32 }}>歴代ハロプロ全員ソート</Button></Grid>
        <Grid container item xs={12} justifyContent="center" spacing={0}>
          <p>定期更新終了を宣言された本家様を引き継ぎました。</p>
          <p>ソートアルゴリズムに<a href="https://en.wikipedia.org/wiki/Merge-insertion_sort">Ford-Johnson法</a>を採用しています。</p>
          <p><a href="https://twitter.com/xxgentaroxx" target="_blank" rel="noreferrer">@xxgentaroxx</a>大先生による、歴代ハロプロメンバーの<a href="https://github.com/xxgentaroxx/HP_DB" target="_blank" rel="noreferrer">オープンデータ</a>から自動生成しています。</p>
          <p>「引き分け」ボタンを1回押すと比較回数が4-5回減ります。急いでいる方は活用してください。</p>
        </Grid>
        <Grid container item xs={12} justifyContent="center" spacing={0}>
          <p>
            <Button href="https://twitter.com/emolga587" target="_blank" size="small" style={{ backgroundColor: "#00ACEE", color: "#ffffff", textTransform: "none", margin: 2 }}><FontAwesomeIcon icon={faTwitter} />&nbsp;Twitter</Button>
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