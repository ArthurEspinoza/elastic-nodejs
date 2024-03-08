const elastic = require("../utils/elastic");

const getAllDocuments = async() => {
    try {
        let documents = await elastic.client.search({index: process.env.ELASTIC_INDEX});
        return { data: documents}
    } catch (error) {
        return { error }
    }
}
const getDocumentById = async(id) => {
    try {
        let document = await elastic.client.get({index: process.env.ELASTIC_INDEX, id});
        return {data: document}
    } catch (error) {
        return { error }
    }
}

const getIndexMapping = async() => {
    try {
        let mapping = await elastic.client.indices.getMapping({index: process.env.ELASTIC_INDEX});
        return {data: mapping}
    } catch (error) {
        return { error }
    }
}

const createDocument = async(body) => {
    try {
        let document = await elastic.client.index({index: process.env.ELASTIC_INDEX, document: body});
        return { data: document }
    } catch (error) {
        return { error }
    }
}

const createDocumentWithId = async(id, body) => {
    try {
        let document = await elastic.client.index({id, index: process.env.ELASTIC_INDEX, document: body});
        return { data: document }
    } catch (error) {
        return { error }
    }
}

const bulkOperation = async(operations) => {
    try {
        let result = await elastic.client.bulk({operations});
        return { data: result}
    } catch (error) {
        return { error }
    }
}

const searchDocuments = async(queryBody) => {
    try {
        let documents = await elastic.client.search(queryBody);
        return { ...documents }
    } catch (error) {
        return { error }
    }
}

const updateDocument = async(id, body) => {
    try {
        let document = await elastic.client.update({id,index: process.env.ELASTIC_INDEX, doc: body});
        return { data: document }
    } catch (error) {
        return { error }
    }
}
const deleteDocument = async(id) => {
    try {
        let result = await elastic.client.delete({id,index: process.env.ELASTIC_INDEX});
        return { data: result }
    } catch (error) {
        return { error }
    }
}

module.exports = {
    getAllDocuments,
    getDocumentById,
    getIndexMapping,
    createDocument,
    createDocumentWithId,
    bulkOperation,
    searchDocuments,
    updateDocument,
    deleteDocument
}