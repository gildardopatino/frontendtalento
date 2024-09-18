import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import endpoints from '../../config/apiRoutes';

const buscarCategoria = async (id) => {

    const respuesta = await fetch(`${endpoints.buscarCategoria}/${id}`);
    if (!respuesta.ok) {
        throw new Error('Error al buscar la categoría');
    }
    const categoria = await respuesta.json();
    return categoria;
}

const EditarCategoria = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [alerta, setAlerta] = useState({ mensaje: '', tipo: '' });

    useEffect(() => {
        const buscar = async () => {
            try {
                const categoria = await buscarCategoria(id);
                setNombre(categoria.nombre)
            } catch (error) {
                setNombre('');
                console.log('Error en la categoria: ' + error);
            }
        }
        buscar();
    }, [id]);

    const actualizarCategoria = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await fetch(`${endpoints.actualizarCategoria}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre })
            });
            if (!respuesta.ok) {
                setAlerta({ mensaje: 'asshh, no pude actualizar la categoría', tipo: 'danger' });
                throw new Error('Ocurrio un error al intentar actualizar la categoría');
            }
           
            setAlerta({ mensaje: 'Super, la categoria se actualizó', tipo: 'success' });
            setTimeout(() => {
                setAlerta({ mensaje: '', tipo: '' });
                navigate('/categorias');
            }, 2000);
            //setNombre('');

        } catch (error) {
            setAlerta({ mensaje: 'asshh, no pude actualizar la categoría', tipo: 'danger' });
            throw new Error('Ocurrio un error al intentar actualizar la categoría: ' + error);
        } finally {
            setTimeout(() => {
                setAlerta({ mensaje: '', tipo: '' })
            }, 2000);
        }
    }

    return (
        <div className='card'>
            <div className='card-header'>
                Actualizar Categoría
            </div>
            <div className='card-body'>
                {alerta.mensaje &&
                    <div className={`alert alert-${alerta.tipo}`}>{alerta.mensaje}</div>
                }
                <form onSubmit={actualizarCategoria}>
                    <div>
                        <label htmlFor="nombre" className='form-label'>Nombre Categoría</label>
                        <input value={nombre} type="text"
                            className='form-control' id="nombre" required
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success mt-2'>Actualizar</button>
                    <NavLink to="/categorias" className="btn btn-info ms-2 mt-2">Volver</NavLink>
                </form>
            </div>
        </div>
    )
}

export default EditarCategoria
