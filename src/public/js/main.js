const socket = io();
socket.on("products", (data) => {
  let prodCont = document.getElementById("prodCont");
  let attribute = prodCont.getAttribute("class");
  prodCont.innerHTML = "";

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
    if (attribute === "prodCont") {
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-primary mb-2";
      deleteButton.textContent = "Delete";

      deleteButton.addEventListener("click", () => {
        socket.emit("deleteProduct", element.id);
      });
      allProducts.appendChild(deleteButton);
    } else {
      const hr = document.createElement("HR");
      allProducts.appendChild(hr);
    }

    document.getElementById("prodCont").appendChild(allProducts);
  });
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
