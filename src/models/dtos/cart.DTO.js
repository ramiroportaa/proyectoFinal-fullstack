class cartDTO {
    constructor(cartData, productsArray){
        this.id = cartData._id;
        this.timestamp = cartData.timestamp || 0;
        this.productos = productsArray || [];
    }
}

export default cartDTO;