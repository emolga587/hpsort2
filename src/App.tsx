import React from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import SortPage from "./components/SortPage";

interface Props { }
interface State {
  result: boolean;
  round: number;
}

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <Layout title="ハロプロソート2.0">
        <Router>
          <Link to="/">Home</Link>
          <Link to="/HPAll">ハロプロ全員</Link>
          <Route exact path="/" component={Home} />
          <Route path="/HPAll" component={HPAll} />
        </Router>
      </Layout>
    );
  }
}

class Home extends React.Component<Props, State> {
  render() {
    return <div></div>;
  }
}

class HPAll extends React.Component<Props, State> {
  render() {
    return <div><SortPage members={["加賀楓", "えもえも", "デデンネ", "ピカチュウ"]} /></div>;
  }
}