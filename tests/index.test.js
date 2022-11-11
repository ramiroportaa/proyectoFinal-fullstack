import supertest from "supertest";
import chai from "chai";
import productGenerator from "./productGenerator.faker.js";

const expect = chai.expect;

let request;


describe("Test de productos", ()=>{
    let idChaqueta;

    before(()=>{
        request = supertest("http://localhost:8080");
    })

    describe("metodos GET", ()=>{

        it("debería traer un array con los productos en la BD y status 200", async ()=>{
            const res = await request.get("/api/productos");

            expect(res.status).to.eql(200);
            expect(res.body.data).to.be.an("array");
        })

        it("debería dar error con status 404 al traer producto con ID inexistente", async ()=>{
            const idProd = "esteIdNoExisteEnLaDB";
            const res = await request.get("/api/productos/" + idProd);

            expect(res.status).to.eql(404);
        })

        it("debería dar error con status 401 al querer hacer POST de producto sin estar logueado", async ()=>{
            const productRandom = productGenerator.get();
            const res = await request.post("/api/productos/").send(productRandom);

            expect(res.status).to.eql(401);
            expect(res.body.message).to.eql('ruta /api/productos/ método POST no autorizada');
        })

        after(()=>{
            request.get("/logout");
        })
    })

    describe("metodos POST, PUT y DELETE con logueo de ADMIN", ()=>{

        let header;
        let productDelete;
        let productUpdate;

        before(async ()=>{
            const admin = {email: "rami@mail.com", password: "rami123"};
            const res = await request.post("/login").send(admin);
            // Get cookies from response
            header = res.header;
        })

        it("debería dar status 201 al crear un nuevo producto con login de ADMIN", async ()=>{

            const productRandom = productGenerator.get();
            const res = await request.post("/api/productos/")
            .set("Cookie", [...header["set-cookie"]])
            .send(productRandom);

            productUpdate = res.body.data._id;
            
            expect(res.status).to.eql(201);
            expect(res.body.data.nombre).to.eql(productRandom.nombre);
        })

        it("repetimos test anterior para crear otro producto mas y asi poder borrarlo en el siguiente", async ()=>{

            const productRandom = productGenerator.get();
            const res = await request.post("/api/productos/")
            .set("Cookie", [...header["set-cookie"]])
            .send(productRandom);

            productDelete = res.body.data._id;
            
            expect(res.status).to.eql(201);
            expect(res.body.data.nombre).to.eql(productRandom.nombre);
        })

        it("debería dar status 201 al borrar el producto antes creado (con login de ADMIN)", async ()=>{
            const idProd = productDelete;
            const res = await request.delete("/api/productos/" + idProd)
            .set("Cookie", [...header["set-cookie"]])
            
            expect(res.status).to.eql(201);
        })

        it("debería dar status 201 al modificar un producto", async ()=>{
            const idProd = productUpdate;
            idChaqueta = idProd;
            const res = await request.put("/api/productos/" + idProd)
            .set("Cookie", [...header["set-cookie"]])
            .send({
                nombre: "Chaqueta",
                foto: "https://cdn1.iconfinder.com/data/icons/clothes-outfit-line-shop-aholic/512/Jacket-256.png"
            });
            
            expect(res.status).to.eql(201);
        })

    })

    describe("mas pruebas de GET", ()=>{

        it("debería traer un array con al menos 1 producto (en los test anteriores se crearon 2 y se borro uno)", async ()=>{
            const res = await request.get("/api/productos");

            expect(res.status).to.eql(200);
            expect(res.body.data).to.be.an("array");
            expect(res.body.data.length).to.greaterThanOrEqual(1);
        })

        it("debería traer un objeto con el producto 'chaqueta'", async ()=>{

            const res = await request.get("/api/productos/" + idChaqueta);
            const chaqueta = res.body.data;

            expect(res.status).to.eql(200);
            expect(chaqueta.nombre).to.eql("Chaqueta");
            expect(chaqueta._id).to.eql(idChaqueta);
        })

        after(()=>{
            request.get("/logout");
        })
    })

})