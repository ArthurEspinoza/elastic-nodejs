const elasticService = require("../services/elasticServices");
const { buildQuery } = require("../utils/query-utils");
const users = require("../utils/users");

const getAllDocuments = async (req, res) => {
    let complete = req.query.complete;
    try {
        const result = await elasticService.getAllDocuments();
        let items = [];
        if(complete && complete ==="true"){
            items = result.data.hits.hits ? result.data.hits.hits : [];
        }else{
            if(result.data.hits.hits){
                items = result.data.hits.hits.map(function(item){
                    return item._source.componentData;
                });
            }
        }
        res.json({
            status: "OK",
            data: {
                items,
                total: items.length
            }
        })
    } catch (error) {
        res.status(402).json({
            status: "Failed",
            message: error
        })
    }
}

const getDocumentById = async(req, res) => {
    const {id} = req.params;
    const complete = req.query.complete
    try {
        const document = await elasticService.getDocumentById(id);
        let data = {};
        if(complete && complete === "true"){
            data = document.data ? document.data : {};
        }else {
            data = document.data._source.componentData ? document.data._source.componentData : {}
        }
        res.json({
            status: "OK",
            data: data
        })
    } catch (error) {
        res.status(402).json({
            status: "Failed",
            message: error
        })
    }
}

const getAllDocumentsInfo = async (req, res) => {
    try {
        const result = await elasticService.getAllDocuments();
        let items = result.data.hits.hits ? result.data.hits.hits : [];
        res.json({
            status: "OK",
            data: {
                items,
                total: items.length
            }
        })
    } catch (error) {
        res.status(402).json({
            status: "Failed",
            message: error
        })
    }
}

const getIndexMapping = async(req, res) => {
    try {
        const result = await elasticService.getIndexMapping();
        res.json({
            status: "OK",
            data: result.data
        })
    } catch (error) {
        res.status(402).json({
            status: "Failed",
            message: error
        })
    }
}

const createDocument = async(req, res) => {
    const body = req.body;
    try {
        const document = await elasticService.createDocument(body);
        res.json({
            status: "OK",
            data: document.data
        })
    } catch (error) {
        res.status(402).json({
            status: "Failed",
            message: error
        })
    }
}

const createDocumentWithId = async(req, res) => {
    const body = req.body;
    const {id} = req.params;
    try {
        const document = await elasticService.createDocumentWithId(id, body);
        res.json({
            status: "OK",
            data: document.data
        })
    } catch (error) {
        res.status(402).json({
            status: "Failed",
            message: error
        })
    }
}

const bulkOperation = async(req, res) => {
    let {operations} = req.body;
    operations = operations.flatMap(doc => [{ index: { _index: 'content' } }, doc]);
    try {
        const result = await elasticService.bulkOperation(operations);
        res.json({
            status: "OK",
            data: result.data
        })
    } catch (error) {
        res.status(402).json({
            status: "Failed",
            message: error
        })
    }
}

const searchDocuments = async(req, res) => {
    let complete = req.query.complete;
    let {userid} = req.headers;
    if(!userid) {
        res.status(400).json({
            status: "Failed",
            message: "Missing userId on the request headers"
        });
        return;
    }
    const { andQuery, orQuery } = req.body;
    let boolQuery = {};
    if(andQuery){
      boolQuery.must = buildQuery(andQuery);
    }
    if(orQuery){
      boolQuery.should = buildQuery(orQuery);
    }
    if((boolQuery.must && boolQuery.must.length > 0) ||
      (boolQuery.should && boolQuery.should.length > 0)){
        try {
            let mapping = await users.getMapping(userid);
            let accessGroup = await users.getAccessGroup(userid);
            let accessQuery = [];
            accessQuery =
                mapping.map(function(item){
                return {
                    match:{
                    [item.searchField]: item.searchValue
                    }
                }
                });
            if(boolQuery.hasOwnProperty("must")){
                boolQuery.must = [...boolQuery.must, ...accessQuery];
            }else{
                boolQuery.must = [...accessQuery];
            }
            if(accessGroup !== process.env.VITE_ELASTIC_ADMIN_VALUE) boolQuery.must.push({match:{"accessGroup": accessGroup}});
            let queryBody = {
                index: process.env.VITE_ELASTIC_INDEX,
                query: {
                bool: boolQuery
                }
            };
            const documents = await elasticService.searchDocuments(queryBody);
            let items = [];
            if(documents.hits && documents.hits.hits){
                if(complete && complete === "true") items = documents.hits.hits;
                else {
                    items = documents.hits.hits.map(item => {
                        return item._source.componentData || {};
                    })
                }
            }
            res.json({
                status: "OK",
                data: items
            })
        } catch (error) {
            console.log(error);
            res.status(404).json({"status": "Failed", "error": error})
        }
    }else{
        res.status(404).json({
            status: "Failed",
            message: "To search, please send a body within an andQuery or orQuery"
        })
    }
}
const searchDocumentsForApp = async(req, res) => {
    let {userid} = req.headers;
    if(!userid) {
        res.status(400).json({
            status: "Failed",
            message: "Missing userId on the request headers"
        });
        return;
    }
    const { andQuery, orQuery } = req.body;
    let boolQuery = {};
    if(andQuery){
      boolQuery.must = buildQuery(andQuery);
    }
    if(orQuery){
      boolQuery.should = buildQuery(orQuery);
    }
    if((boolQuery.must && boolQuery.must.length > 0) ||
      (boolQuery.should && boolQuery.should.length > 0)){
        try {
            let mapping = await users.getMapping(userid);
            let accessGroup = await users.getAccessGroup(userid);
            let accessQuery = [];
            accessQuery =
                mapping.map(function(item){
                return {
                    match:{
                    [item.searchField]: item.searchValue
                    }
                }
                });
            if(boolQuery.hasOwnProperty("must")){
                boolQuery.must = [...boolQuery.must, ...accessQuery];
            }else{
                boolQuery.must = [...accessQuery];
            }
            if(accessGroup !== process.env.VITE_ELASTIC_ADMIN_VALUE) boolQuery.must.push({match:{"accessGroup": accessGroup}});
            let queryBody = {
                index: process.env.VITE_ELASTIC_INDEX,
                query: {
                bool: boolQuery
                }
            };
            const documents = await elasticService.searchDocuments(queryBody);
            let items = [];
            if(documents.hits && documents.hits.hits){
                items = documents.hits.hits;
            }
            res.json({
                status: "OK",
                data: items
            })
        } catch (error) {
            console.log(error);
            res.status(404).json({"status": "Failed", "error": error})
        }
    }else{
        res.status(404).json({
            status: "Failed",
            message: "To search, please send a body within an andQuery or orQuery"
        })
    }
}

const updateDocument = async(req, res) => {
    const {id} = req.params;
    const body = req.body;
    try {
        let document = await elasticService.updateDocument(id, body);
        res.json({
            status: "OK",
            data: document.data
        })    
    } catch (error) {
        res.status(402).json({
            status: "Failed",
            message: error
        })
    }
}

const deleteDocument = async(req, res) => {
    const {id} = req.params;
    try {
        let document = await elasticService.deleteDocument(id);
        res.json({
            status: "OK",
            data: document.data
        })    
    } catch (error) {
        res.status(402).json({
            status: "Failed",
            message: error
        })
    }
}

module.exports = {
    getAllDocuments,
    getDocumentById,
    getAllDocumentsInfo,
    getIndexMapping,
    createDocument,
    createDocumentWithId,
    bulkOperation,
    searchDocuments,
    searchDocumentsForApp,
    updateDocument,
    deleteDocument
}