import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  let pagesize = 5;
  let api = process.env.REACT_APP_API_KEY

  const [prog, setProg] = useState(0);

  const setProgress = (prog)=>{
    setProg(prog)
  }

    return (
      <div>
      <Router>
      <Navbar/>
      <LoadingBar
        color='blue'
        progress={prog}
        height={2}
      />
      <Routes>
          <Route exact path="/" element=<News setProgress = {setProgress} api={api} key="general"  pagesize={pagesize} country="in" category='general' />></Route>
          <Route exact path="/buisness" element=<News setProgress = {setProgress} api={api} key="buisness"  pagesize={pagesize} country="in" category='buisness'/>></Route>
          <Route exact path="/entertainment" element=<News setProgress = {setProgress} api={api} key="entertainment"  pagesize={pagesize} country="in" category='entertainment'/>></Route>
          <Route exact path="/health" element=<News setProgress = {setProgress} api={api} key="health"  pagesize={pagesize} country="in" category='health'/>></Route>
          <Route exact path="/science" element=<News setProgress = {setProgress} api={api} key="science"  pagesize={pagesize} country="in" category='science'/>></Route>
          <Route exact path="/sports" element=<News setProgress = {setProgress} api={api} key="sports"  pagesize={pagesize} country="in" category='sports'/>></Route>
          <Route exact path="/technology" element=<News setProgress = {setProgress} api={api}  key="technology" pagesize={pagesize} country="in" category='technology'/>></Route>
        </Routes>
      </Router>
      </div>
    );
}

export default App