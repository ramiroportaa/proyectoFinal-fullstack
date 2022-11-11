const productosHTML = document.getElementById("productos");
const perfilUsuario = document.getElementById("perfilUsuario");

const initial = async ()=>{
    await getUserDataFromAPI();
    renderPerfilUsuario(currentUser);
    await getProductsCartFromAPI();
    await getProductsFromAPI();
    escribirProductosHTML(productos);
    escribirModalesHTML(productos);
}
initial();
