import React, { useState } from 'react';
import styled from 'styled-components';
import BottomBar from './components/BottomBar';
import DataPage from './components/DataPage';
import MainPage from './components/MainPage';
import Navbar from "./components/Navbar"
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import ResultsPage from './components/ResultsPage';
import ScrollToTop from './components/ScrollToTop';


const Wrapper = styled.div`
overflow-x: hidden;
`

function App() {
  const location = useLocation();
  const [lang, setLang] = useState(false);
  const [query, setQuery] = useState({});
  const handleLangChange = () => {
    setLang(!lang);
  }
  return (
    <Wrapper>
      <Navbar lang={lang} handleLangChange={handleLangChange}/>
      <ScrollToTop>
      <AnimatePresence exitBeforeEnter>
        
      <Switch location={location} key={location.key}>
        <Route exact path="/fuell/">
          <MainPage lang={lang} />
        </Route>
        <Route path="/fuell/data">
          <DataPage lang={lang} setQuery={setQuery} query={query}/>
        </Route>
        <Route path="/fuell/results">
          <ResultsPage lang={lang} query={query} />
        </Route>
      </Switch>
      </AnimatePresence>
      </ScrollToTop>
      <BottomBar lang={lang} />
    </Wrapper>
  );
}

export default App;
