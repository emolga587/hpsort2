import React from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
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
    return (
      <Layout title="H!PSort(updated)">
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/hpmembers" component={HPAll} />
          <Route path="/hpall" component={HPAllIncludeTrainee} />
        </Router>
      </Layout>
    );
  }
}

class Home extends React.Component<Props, State> {
  render() {
    return <div>
      <Link to="/">Home</Link><br />
      <Link to="/hpmembers">ハロプロ全員</Link><br />
      <Link to="/hpall">ハロプロ全員(研修生含む)</Link><br />
    </div>;
  }
}

class HPAll extends React.Component<Props, State> {
  render() {
    return <div><SortPage members={hpDB.currentHPMembers} /></div>;
  }
}

class HPAllIncludeTrainee extends React.Component<Props, State> {
  render() {
    return <div><SortPage members={hpDB.currentHPMembersIncludeTrainee} /></div>;
  }
}