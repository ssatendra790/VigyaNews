import './App.css';
import React, { Component } from 'react'
import {NavBar} from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
  pageSize = 6;
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path='/' element = {<News pageSize = {this.pageSize} country="in" category="general"/>} />
            <Route path='/business' element = {<News pageSize = {this.pageSize} country="in" category="business"/>} />
            <Route path='/entertainment' element = {<News pageSize = {this.pageSize} country="in" category="entertainment"/>} />
            <Route path='/health' element = {<News pageSize = {this.pageSize} country="in" category="health"/>} />
            <Route path='/science' element = {<News pageSize = {this.pageSize} country="in" category="science"/>} />
            <Route path='/sports' element = {<News pageSize = {this.pageSize} country="in" category="sports"/>} />
            <Route path='/technology' element = {<News pageSize = {this.pageSize} country="in" category="technology"/>} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

