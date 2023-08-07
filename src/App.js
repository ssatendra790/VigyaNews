import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {

  const pageSize = 6;

  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)


  return (
    <div>
      <BrowserRouter>
        <LoadingBar color='#f11946' progress={progress} />
        <NavBar />
        <Routes>
          <Route path='/' element={<News key="general" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="general" />} />
          <Route path='/business' element={<News key="business" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="business" />} />
          <Route path='/entertainment' element={<News key="entertainment" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="entertainment" />} />
          <Route path='/health' element={<News key="health" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="health" />} />
          <Route path='/science' element={<News key="science" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="science" />} />
          <Route path='/sports' element={<News key="sports" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="sports" />} />
          <Route path='/technology' element={<News key="technology" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="technology" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
