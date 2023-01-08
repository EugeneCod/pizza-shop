import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components';
import { Home, Cart, NotFound } from './pages';
import { AppContext } from './context'


function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <AppContext.Provider
      value={{searchValue, setSearchValue}}>
      <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
    </AppContext.Provider>
    
  );
}

export default App;
