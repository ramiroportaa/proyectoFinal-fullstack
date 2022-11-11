class DAO {
    async getAll(){
        throw {message: "Method GetAll() not implemented in subClass", status: 500};
    }
    async getById(){
        throw {message: "Method getById() not implemented in subClass", status: 500};
    }
    async add(){
        throw {message: "Method add() not implemented in subClass", status: 500};
    }
    async updateOne(){
        throw {message: "Method updateOne() not implemented in subClass", status: 500};
    }
    async deleteById(){
        throw {message: "Method deleteById() not implemented in subClass", status: 500};
    }

    static getInstance(){
        throw {message: "Method getInstance() not implemented in subClass", status: 500};
    }
}

export default DAO;