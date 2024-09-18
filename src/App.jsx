import { Route,  Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Usuario from './components/Usuario'
import Categoria from './components/categorias/Categoria'
import CrearCategoria from './components/categorias/CrearCategoria'
import EditarCategoria from './components/categorias/EditarCategoria'

function App() {


  return (
    <div className="app">
       <Sidebar />
      <div className="content-wrapper">
        
        <div className='content p-4'>
          <Routes>
            <Route path="/usuarios" element={<Usuario />}></Route>
            <Route path="/categorias" element={<Categoria />}></Route>
            <Route path="/crear-categoria" element={<CrearCategoria />}></Route>
            <Route path="/editar-categoria/:id" element={<EditarCategoria />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
