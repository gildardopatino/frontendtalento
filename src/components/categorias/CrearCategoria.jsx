import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import endpoints from '../../config/apiRoutes';

const CrearCategoria = () => {
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [alerta, setAlerta] = useState({mensaje: '', tipo:''});

    const guardarCategoria = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await fetch(endpoints.crearCategoria, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre: nombreCategoria })
            });
            if (!respuesta.ok) {
                setAlerta({mensaje: 'asshh, no pude insertar la categoría', tipo: 'danger'});
                throw new Error('Ocurrio un error al intentar crear la categoría');
            }
            setAlerta({mensaje: 'Super, la categoria se inserto', tipo: 'success'});
            setNombreCategoria('');
        } catch (error) {
            setAlerta({mensaje: 'asshh, no pude insertar la categoría', tipo: 'danger'});
            throw new Error('Ocurrio un error al intentar crear la categoría');
        } finally {
            setTimeout(() => {
                setAlerta({mensaje:'', tipo:''})
            }, 2000);
        }
    }

    return (
        <div className='card'>
            <div className='card-header'>
                Registrar nueva categoría
            </div>
            <div className='card-body'>
                {alerta.mensaje && 
                    <div className={`alert alert-${alerta.tipo}`}>{alerta.mensaje}</div>
                }
                <form onSubmit={guardarCategoria}>
                    <div>
                        <label htmlFor="nombre" className='form-label'>Nombre Categoría</label>
                        <input value={nombreCategoria} type="text"
                            className='form-control' id="nombre" required
                            onChange={(e) => setNombreCategoria(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success mt-2'>Guardar</button>
                    <NavLink to="/categorias" className="btn btn-info ms-2 mt-2">Volver</NavLink>
                </form>
            </div>
        </div>
    )
}

export default CrearCategoria
