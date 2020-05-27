import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import Boardgamelist from './components/boardgame-list';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Route path='/' exact component={Homepage}></Route>
      <Route path='/boardgames' component={Boardgamelist}></Route>
    </Router>
  );
}

export default App;
