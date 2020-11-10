import React from "react";
import {BrowserRouter as Router, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "./App.css";

import Layout from "./components/Layout";
import SortPage from "./components/SortPage";
import hpDB from "./modules/HPDatabase";

interface Props { }
interface State {
  result: boolean;
  round: number;
}

export default class App extends React.Component<Props, State> {
  render() {
    const title = "ハロプロソート(updated)";
    return (
      <Layout title={title}>
        <Router basename={process.env.PUBLIC_URL}>
          <Route exact path="/" component={Home} />
          <Route path="/hp" component={HPAll} />
          <Route path="/hptrainee" component={HPAllTrainee} />
          <Route path="/trainee" component={Trainee} />
          <Route path="/test" component={Test} />
        </Router>
      </Layout>
    );
  }
}

class Home extends React.Component<Props, State> {
  render() {
    return (
      <Grid container item xs={12} justify="center" style={{ textAlign: "center" }} spacing={1}>
        <Grid container item xs={12} justify="center" spacing={0}>
          <h2>ハロプロソート(updated)</h2>
        </Grid>
        <Grid container item xs={12} justify="center" spacing={0}>
          <p>(updated)なハロプロソートです。<br />定期更新終了を宣言された本家様を勝手に引き継ぎ、新技術を反映しつつ鋭意改良中です。<br />(2020/11/10 一部機能未完成)</p>
        </Grid>
        <Grid container item xs={12} justify="center"><Button href="hp" style={{ background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)', color: 'white', fontWeight: 'bold', height: 40 }}>ハロプロ全員ソート</Button></Grid>
        <Grid container item xs={12} justify="center"><Button href="hptrainee" style={{ background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)', color: 'white', fontWeight: 'bold', height: 40 }}>ハロプロ全員ソート(研修生含む)</Button></Grid>
        <Grid container item xs={12} justify="center"><Button href="trainee" style={{ background: 'linear-gradient(45deg, #11d386 30%, #11d3bb 90%)', color: 'white', fontWeight: 'bold', height: 40 }}>ハロプロ研修生ソート</Button></Grid>
        <Grid container item xs={12} justify="center" spacing={0}>
          <p><a href="https://twitter.com/xxgentaroxx">@xxgentaroxx</a>大先生による、歴代ハロプロメンバーの<a href="https://github.com/xxgentaroxx/HP_DB">オープンデータ</a>から自動生成しています。</p>
          <p>ソートアルゴリズムに<a href="https://en.wikipedia.org/wiki/Merge-insertion_sort">Ford-Johnson法</a>を採用しています。
          従来の推しソートで一般的だったマージソートと比較して、比較回数が少なくなるほか、ソート後半が上位メン決定戦になる特徴があります。</p>
          <p>ソートは全て端末のJavaScriptで行われるため、サーバーに結果等が送信されることはありません。</p>
          <p>連絡先: <a href="https://twitter.com/emolga587">@emolga587</a></p>
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

class Test extends React.Component<Props, State> {
  render() {
    return <div><SortPage members={["加賀楓", "横山玲奈"]} sortName="テストソート" /></div>;
  }
}