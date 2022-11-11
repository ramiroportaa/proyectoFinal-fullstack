import admin from "firebase-admin";
import logger from "../../../utils/logger.js";
import DAO from "./DAO.class.js";
import config from "../../../config/config.js";

let db;

if (config.DATABASE == "firebase"){
    admin.initializeApp({
        credential: admin.credential.cert(config.firebase)
    });
    db = admin.firestore();
}

export class FirebaseContainer extends DAO {
    constructor(collectionName){
        super();
        this.collectionName = collectionName;
        this.collection = db.collection(collectionName);
    }
    async getAll(){
        try {
            const snapshot  = await this.collection.get();
            const data = []
            snapshot.forEach(doc => {
                let obj = {}
                obj = doc.data();
                obj._id = doc.id
                data.push(obj)
            });
            return data;
        } catch (error) {
            logger.warn(`error in getting ${this.collectionName}: ${error}`);
            return {error: {message: `error in getting ${this.collectionName}`, status: 500}};
        }
    }
    async getById(id){
        try {
            const doc = await this.collection.doc(id).get();
            const data = doc.data();
            data._id = id;
            if (data) return data;
            return {error: {message: `no ${this.collectionName} with ID: ${id}`, status: 404}};
        } catch (error) {
            logger.warn(`error in getting ${this.collectionName}: ${error}`);
            return {error: {message: `error in getting ${this.collectionName}`, status: 500}};
        }
    }
    async add(data){
        try {
            data.timestamp = Date.now();
            const res = await this.collection.add(data);
            return {_id: res.id}
        } catch (error) {
            logger.warn(`error in adding ${this.collectionName}: ${error}`);
            return {error: {message: `error in adding ${this.collectionName}`, status: 500}};
        }
    }
    async updateOne(id, NewDataObj){
        try {
            const doc = this.collection.doc(id);
            await doc.update(NewDataObj);
        } catch (error) {
            logger.warn(`error in updating ${this.collectionName}: ${error}`);
            return {error: {message: `error in updating ${this.collectionName}`, status: 500}};
        }
    }
    async deleteById(id){
        try {
            const doc = this.collection.doc(id);
            await doc.delete();
        } catch (error) {
            logger.warn(`error in deleting ${this.collectionName}: ${error}`);
            return {error: {message: `error in deleting ${this.collectionName}`, status: 500}};
        }
    }
}