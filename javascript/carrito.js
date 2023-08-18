$(document).ready(function() {
  const carrito = [];
  const productos = [
    { id: 1, nombre: "Producto 1", precio: 10, imagen: "img/1.jpeg" },
    { id: 2, nombre: "Producto 2", precio: 20, imagen: "img/2.jpeg" },
    { id: 3, nombre: "Producto 3", precio: 30, imagen: "img/3.jpeg" }
  ];
  
  mostrarResultados(productos);
  $("#cargarProductos").click(function() {
    $("#productos").show();
  });

  $("#buscar").keyup(function() {
    const searchTerm = $(this).val().toLowerCase();
    const resultados = productos.filter(producto => producto.nombre.toLowerCase().includes(searchTerm));
    mostrarResultados(resultados);
  });

  function mostrarResultados(resultados) {
    $("#productos").empty();
    resultados.forEach(producto => {
      $("#productos").append(`
        <li data-id="${producto.id}">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <span>${producto.nombre} - $${producto.precio}</span>
          <button class="agregar">Agregar</button>
        </li>
      `);
    });
    $(".agregar").click(function() {
      const idProducto = $(this).parent().data("id");
      const producto = productos.find(item => item.id === idProducto);
      carrito.push(producto);
      actualizarCarrito();
    });
  }

  function actualizarCarrito() {
    $("#carrito").empty();
    let total = 0;

    carrito.forEach(producto => {
      $("#carrito").append(`<li><img src="${producto.imagen}" alt="${producto.nombre}">${producto.nombre} - $${producto.precio} <button class="eliminar" data-id="${producto.id}">Eliminar</button></li>`);
      total += producto.precio;
    });

    $("#total").text(total);

    $(".eliminar").click(function() {
      const idProducto = $(this).data("id");
      const index = carrito.findIndex(item => item.id === idProducto);
      if (index !== -1) {
        carrito.splice(index, 1);
        actualizarCarrito();
      }
    });
    }

$("#realizarPedido").click(function() {
  if (carrito.length === 0) {
    alert("El carrito está vacío. Agregue productos antes de realizar un pedido.");
  } else {
    const productosPedido = [...carrito]; // Almacena los productos del carrito en una constante
    
    carrito.length = 0;
    actualizarCarrito();
    $("#productos").empty();
    $("#cargarProductos").text("Cargar Productos");
    localStorage.setItem("productosPedido", JSON.stringify(productosPedido)); // Guarda los productos en el caché
    alert("Pedido realizado con éxito. ¡Gracias por tu compra!");
  }
});

  });
