import './App.css'
import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react'
import ProductCard from './components/ProductCard.jsx'
const ProductPage = lazy(() => import('./components/ProductPage.jsx'))
import Header from './components/Header.jsx'

function App() {
  return (
    <div className='bg-[#F7FAFE]'>
      <Header></Header>
      <Routes>
        <Route path='/' element={<ProductCard />} />
        <Route path='/product/:id' element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App