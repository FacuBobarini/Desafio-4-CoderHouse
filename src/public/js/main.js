const socket = io();
socket.on("products", (data) => {
  data.forEach((element) => {
    const allProducts = document.createElement("ul");
    allProducts.className = "list-group";
    allProducts.id = `producto-${element.id}`;
    allProducts.innerHTML = `
          <li class="list-group-item">Title: ${element.title}</li>
          <li class="list-group-item">Description: ${element.description}</li>
          <li class="list-group-item">Code: ${element.code}</li>
          <li class="list-group-item">Price: ${element.price}</li>
          <li class="list-group-item">Status: ${element.status}</li>
          <li class="list-group-item">Stock: ${element.stock}</li>
          <li class="list-group-item">Thumbnails: ${element.thumbnails}</li>
        `;

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-primary mb-2";
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => {
      deleteProducto(element.id);
    });
    allProducts.appendChild(deleteButton);

    document.getElementById("prodCont").appendChild(allProducts);
  });

  function deleteProducto(id) {
    socket.emit("deleteProduct", id);
  }
});

const form = document.getElementById("addProduct");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("titulo").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").value;
  const status = document.getElementById("status").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  const thumbnails = document.getElementById("thumbnails").value;
  const newProduct = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };
  socket.emit("addProducts", newProduct);
});
