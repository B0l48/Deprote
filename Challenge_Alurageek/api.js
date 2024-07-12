const API_URL = "http://localhost:3000/productos";

export async function getProductos() {
    const response = await fetch(API_URL);
    const productos = await response.json();
    return productos;
}

export async function createProducto(producto) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    });
    const newProducto = await response.json();
    return newProducto;
}

export async function deleteProducto(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
}
