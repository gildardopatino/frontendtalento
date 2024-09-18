const apiBase  = "https://talento-tech-backend.vercel.app/api";
const endpoints = {
    listarCategorias: `${apiBase}/categorias/listar`,
    crearCategoria: `${apiBase}/categorias/crear`,
    actualizarCategoria: `${apiBase}/categorias/actualizar`,
    buscarCategoria: `${apiBase}/categorias/buscar`,
    eliminarCategoria: `${apiBase}/categorias/eliminar`
}

export default endpoints;