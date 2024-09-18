import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { NavLink } from 'react-router-dom';
import endpoints from '../../config/apiRoutes';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const alerta = withReactContent(Swal);

const getCategorias = async () => {
  const response = await fetch(endpoints.listarCategorias);
  if (!response.ok) {
    throw new Error('Error en la conexion');
  }
  return response.json();
}


const Categoria = () => {
 
  const { data, error, isLoading } = useQuery({
    queryKey: ['categorias'],
    queryFn: getCategorias
  });

  const eliminarCategoria = (id) => {
    alerta.fire({
      title: 'Eliminación de categoría',
      text: 'Esta seguro que desea eliminar esta categoría?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminalo',
      cancelButtonText: 'No, cancelalo'
    }).then(async (resultado) => {
      if(resultado.isConfirmed){
        const respuesta = await fetch(`${endpoints.eliminarCategoria}/${id}`, {
          method: 'DELETE'
        });
        if(!respuesta.ok){
          console.log("Error al eliminar la categoria");
        }
        alerta.fire({
          title:'Mensaje del sistema',
          text: 'La categoría ha sido eliminada correctamente',
          icon: 'success'
        });
      }
    });
  }

  if (isLoading) return <div>Aun estoy Cargando la info</div>
  if (error) return <div> Oppsss, no me pude conectar</div>

  return (
    <div className='card'>
      <div className="card-header">
        <div className='d-flex justify-content-between'>
          <h2>Lista de categorias</h2>
          <NavLink to="/crear-categoria" className='btn btn-info ms-2'>Crear Categoria</NavLink>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-bordered table-hover" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(categoria => (
                <tr key={categoria.categoria_id}>
                  <td>{categoria.categoria_id}</td>
                  <td>{categoria.nombre}</td>
                  <td>
                    <div>
                      <NavLink to={`/editar-categoria/${categoria.categoria_id}`} className="btn btn-info">Editar</NavLink>
                      <button onClick={() => eliminarCategoria(categoria.categoria_id)} className='btn btn-danger ms-2'>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Categoria
