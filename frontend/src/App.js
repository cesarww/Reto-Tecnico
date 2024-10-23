import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmpresaLista from './components/EmpresaLista';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmpresaLista />} />
      </Routes>
    </Router>
  );
};

export default App;
