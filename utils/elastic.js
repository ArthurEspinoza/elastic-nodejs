const { Client } = require('@elastic/elasticsearch');

class Elastic {
    constructor(){
        if(Elastic.instance == null){
            this.client = new Client({
                node: process.env.ELASTIC_ENV, // Elasticsearch endpoint
                auth: {
                    apiKey: { 
                        id: process.env.ELASTIC_ID,
                        api_key: process.env.ELASTIC_API_KEY,
                        name: process.env.ELASTIC_NAME,
                        expiration: process.env.ELASTIC_EXPIRATION,
                        encoded: process.env.ELASTIC_ENCODED,
                        beats_logstash_format: process.env.ELASTIC_LOGSTASH
                    }
                }
            })
        }
        return Elastic.instance;
    }
    async getAllDocsByIndex(index){
        try {
            let data = await this.client.search({
                index: index,
            })
            if(data.hits && data.hits.hits && data.hits.hits.length > 0){
                let docs = data.hits.hits;
                return docs;
            }
        } catch (error) {
            return {"message": "There are no documents"};   
        }
    }

    async createDocument(id,index,body){
        try {
            this.client.create({
                id,
                index,
                document: body
            })
            return "OK"
        } catch (error) {
            console.log("Error on created: ", error);
        }
    }
}
const client = new Elastic();
Object.freeze(client);
module.exports = client;