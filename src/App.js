import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import Boardgameslist from './components/boardgames-list';
import BoardgameAdd from './components/boardgame-add';
import BoardgamePage from './components/boardgame-page';
import PuzzlesList from './components/puzzles-list';
import PuzzleAdd from './components/puzzle-add';
import AccessoriesList from './components/accessories-list';
import AccessoryAdd from './components/accessory-add';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <div className='container'>
        <Switch>
          <Route path='/' exact component={Homepage}></Route>
          <Route path='/boardgames' exact component={Boardgameslist}></Route>
          <Route path='/boardgames/add' component={BoardgameAdd}></Route>
          <Route path='/boardgames/:id' component={BoardgamePage}></Route>
          <Route path='/puzzles' exact component={PuzzlesList}></Route>
          <Route path='/puzzles/add' component={PuzzleAdd}></Route>
          <Route path='/accessories' component={AccessoriesList}></Route>
          <Route path='/accessories/add' component={AccessoryAdd}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
