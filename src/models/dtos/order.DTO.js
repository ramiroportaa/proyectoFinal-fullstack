class OrderDTO {
    constructor(id, email, productsArray){
        this._id = id;
        this.email = email;
        this.productos = [];
        productsArray.forEach(prod =>{
            this.productos.push({
                id: prod.id || prod._id,
                nombre: prod.nombre,
                descripcion: prod.descripcion,
                precio: prod.precio,
                quantity: prod.quantity,
                foto: prod.foto
            })
        })
    }
}

export default OrderDTO;