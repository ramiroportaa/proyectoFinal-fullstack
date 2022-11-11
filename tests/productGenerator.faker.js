import { faker } from "@faker-js/faker";
faker.locale = "es";

const get = () => ({
    nombre: faker.commerce.productName(),
    descripcion: "probando desde mocha test usando faker",
    codigo: `xxx${faker.random.numeric(3)}`,
    precio: faker.commerce.price(1000),
    stock: faker.random.numeric(2),
    foto: faker.image.food(400,400, true)
})

export default {get};