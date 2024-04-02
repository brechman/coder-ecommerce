
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { NavBar } from './components/NavBar'
import { ItemListContainer } from './components/ItemListContainer';
import { ItemDetailContainer } from './components/ItemDetailContainer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />  
          <Routes>
            <Route path='/' element={<ItemListContainer/>}/>
            <Route path='/products' element={<ItemListContainer/>}/>
            <Route path='/item/:id' element={<ItemDetailContainer/>}/>
          <Route path='*' element={404}/>          
        </Routes>                   
      </BrowserRouter>
    </div>
  );
}

export default App;
