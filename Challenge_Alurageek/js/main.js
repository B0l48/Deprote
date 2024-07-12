import { getProductos, createProducto, deleteProducto } from '/js/api.js';

document.addEventListener("DOMContentLoaded", async () => {
    const productos = await getProductos();
    renderProductos(productos);
});

function renderProductos(productos) {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";
    
    if (productos.length === 0) {
        productContainer.innerHTML = "<p>No se han agregado productos.</p>";
        return;
    }

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="card-container--info">
                <p>${producto.nombre}</p>
                <div class="card-container--value">
                    <p>$ ${producto.precio}</p>
                    <img src="imagenes/trashIcon.png" alt="Eliminar" data-id="${producto.id}">
                </div>
            </div>
        `;
        productContainer.appendChild(card);
    });
}

document.getElementById("productForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const imagen = document.getElementById("imagen").value;
    
    const newProducto = {
        nombre,
        precio,
        imagen
    };
    
    await createProducto(newProducto);
    renderProductos(await getProductos());
    
    event.target.reset();
});

document.getElementById("productContainer").addEventListener("click", async (event) => {
    if (event.target.tagName === 'IMG' && event.target.alt === 'Eliminar') {
        const id = event.target.getAttribute('data-id');
        await deleteProducto(id);
        renderProductos(await getProductos());
    }
});
