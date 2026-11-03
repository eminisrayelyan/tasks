import './App.css'
import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react'
import ProductCard from './components/ProductCard.jsx'
import Header from './components/Header.jsx'
const ProductPage = lazy(() => import('./components/ProductPage.jsx'))

function App() {
  return (
    <div className='bg-[#F7FAFE] pb-[50px]'>
      <Header></Header>
      <Routes>
        <Route path='/' element={<ProductCard />} />
        <Route path='/product/:id' element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App