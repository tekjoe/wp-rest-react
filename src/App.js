import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PostList from "./components/PostList";
import PostPage from "./components/PostPage";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={PostList} />
          <Route exact path="/post/:id" component={PostPage} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
