const productosHTML = document.getElementById("productos");
const perfilUsuario = document.getElementById("perfilUsuario");
const categorias = document.getElementById("categories");

const renderCategories = (categoriesArray)=>{
    categorias.innerHTML = "";
    categoriesArray.forEach(category => {
        let contenedor = document.createElement("div");
        contenedor.id = category;
        contenedor.className = "py-2 px-4 bg-dark text-white mb-3 categorias";
        contenedor.innerHTML = `<strong class="small text-uppercase font-weight-bold">${category}</strong>`;

        contenedor.addEventListener("click", async (e)=>{
            const category = e.target.textContent;
            const products = await getProductsByCategory(category);
            escribirProductosHTML(products);
            escribirModalesHTML(products);
        });

        categorias.appendChild(contenedor);
    });

    let contenedor = document.createElement("a");
    contenedor.innerText = "Ver todos los productos";
    contenedor.className = "reset-anchor text-uppercase categorias";
    contenedor.addEventListener("click", async ()=>{
        await getProductsFromAPI();
        escribirProductosHTML(productos);
        escribirModalesHTML(productos);
    });

    categorias.appendChild(contenedor);
}

const getCategories = async()=>{
    const categoriesArray = [];
    let res = await fetch("/api/categories");
    res = await res.json();
    res.data.forEach(data =>{
        categoriesArray.push(data._id);
    });
    return categoriesArray;
}

const getProductsByCategory = async (category)=>{
    let res = await fetch("/api/productos/categoria/" + category);
    res = await res.json();
    return res.data;
}

const initial = async ()=>{
    await getUserDataFromAPI();
    renderPerfilUsuario(currentUser);
    await getProductsCartFromAPI();
    await getProductsFromAPI();
    escribirProductosHTML(productos);
    escribirModalesHTML(productos);
    const categoriesArray = await getCategories();
    renderCategories(categoriesArray);
}
initial();
