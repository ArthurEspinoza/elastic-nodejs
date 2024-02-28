# Elastic Demo
In this project we implement a elastic search solution for index, update, delete, get, search and make bulk index operations of documents on elasticsearch.

### Requeriments
1. NodeJs

### Environment variables
You must declare these variables inside an .env file

- ELASTIC_API_KEY: Is the api key provided by the Elastic suite
- ELASTIC_ENV: Is the Elastic endpoint of your instance
- ELASTIC_ID: Is the Elastic ID
- ELASTIC_ENCODED: Is the encoded reference of the Elastic api
- ELASTIC_EXPIRATION: Is the expiration of your api key provided by Elastic
- ELASTIC_LOGSTASH: Is the code for Elastic logstash
- ELASTIC_NAME: Is the name to reference your api key, you configure it when creating the API on Elasitc
- ELASTIC_INDEX: Is the index you create in Elastic and is the one you will use for the endpoints
- ELASTIC_ADMIN_FIELD: Is the field that will be used to check admin permissions
- ELASTIC_ADMIN_FIELD: Is the value that validates admin permissions, this value will live in the field declared in ELASTIC_ADMIN_FIELD
- PORT: This is **optional** and works to tell on which port will the app run

### Steps to run the server
1. Execute the command **npm install**
2. Execute the command *npm run dev* to run the server
3. If you do not declare a port variable by default it will run under the port 9000
4. To check API documentation go to api/v1/docs