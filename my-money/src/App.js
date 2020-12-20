import React from "react";
import Header from "./elements/Header";
import Home from "./pages/Home";
import Movimentacoes from "./pages/Movimentacoes";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route
          path="/movimentacoes/:data"
          exact
          component={Movimentacoes}
        ></Route>
      </div>
    </Router>
  );
}

export default App;
