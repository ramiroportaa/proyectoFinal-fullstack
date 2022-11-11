class DBClient {
    async connect() {
      throw {message: "Method connect() not implemented in subClass", status: 500};
    }
  
    async disconnect() {
        throw {message: "Method disconnect() not implemented in subClass", status: 500};
    }
  }
  
  export default DBClient;