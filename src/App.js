import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import Boardgameslist from './components/boardgames-list';
import BoardgameAdd from './components/boardgame-add';
import BoardgamePage from './components/boardgame-page';
import BoardgameUpdate from './components/boardgame-update';
import PuzzlesList from './components/puzzles-list';
import PuzzleAdd from './components/puzzle-add';
import PuzzlePage from './components/puzzle-page';
import PuzzleUpdate from './components/puzzle-update';
import AccessoriesList from './components/accessories-list';
import AccessoryAdd from './components/accessory-add';
import AccessoryPage from './components/accessory-page';
import AccessoryUpdate from './components/accessory-update';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <div className='container-fluid'>
        <Switch>
          <Route path='/' exact component={Homepage}></Route>
          <Route path='/boardgames' exact component={Boardgameslist}></Route>
          <Route path='/boardgames/add' component={BoardgameAdd}></Route>
          <Route path='/boardgames/list/:id' component={BoardgamePage}></Route>
          <Route
            path='/boardgames/edit/:id'
            component={BoardgameUpdate}
          ></Route>
          <Route path='/puzzles' exact component={PuzzlesList}></Route>
          <Route path='/puzzles/add' component={PuzzleAdd}></Route>
          <Route path='/puzzles/list/:id' component={PuzzlePage}></Route>
          <Route path='/puzzles/edit/:id' component={PuzzleUpdate}></Route>
          <Route path='/accessories' exact component={AccessoriesList}></Route>
          <Route path='/accessories/add' component={AccessoryAdd}></Route>
          <Route path='/accessories/list/:id' component={AccessoryPage}></Route>
          <Route
            path='/accessories/edit/:id'
            component={AccessoryUpdate}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
