
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { NavBar } from './components/NavBar'
import { ItemListContainer } from './components/ItemListContainer';
import { ItemDetailContainer } from './components/ItemDetailContainer';
import { CheckoutPage } from './components/CheckoutPage'; 
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
    <div className="App">
      <BrowserRouter>
        <NavBar />  
          <Routes>
            <Route path='/' element={<ItemListContainer/>}/>
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path='/category/:id' element={<ItemListContainer/>}/>
            <Route path='/item/:id' element={<ItemDetailContainer/>}/>
          <Route path='*' element={404}/>          
        </Routes>                   
      </BrowserRouter>
    </div>
    </CartProvider>
  );
}

export default App;
