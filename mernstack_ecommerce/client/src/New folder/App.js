import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/headers/header";
import Pages from "./components/mainpages/pages";



const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
