const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname,"users.json");
const mappingPath = path.join(__dirname,"mapping.json");

class Users {

    async getAccessGroup(userId){
        try{
            let data = fs.readFileSync(usersPath,{encoding: "utf-8"});
            data = JSON.parse(data);
            let user = data.users.find((user) => user.user_id === userId);
            return user[process.env.VITE_ELASTIC_ADMIN_FIELD];
        }catch (error) {
            return {"message": "Exception was raised",error};   
        }
    }

    async getMapping(userId){
        try{
            let file = fs.readFileSync(mappingPath,{encoding: "utf-8"});
            file = JSON.parse(file);
            let data = fs.readFileSync(usersPath,{encoding: "utf-8"});
            data = JSON.parse(data);
            let user = data.users.find((user) => user.user_id === userId);
            let mapping = [];
            file.forEach(function(data) {
                mapping.push({
                    "searchField": data.searchField,
                    "searchValue": user[data.userAttribute]
                });
            });
            return mapping;
        }catch (error) {
            return {"message": "Exception was raised",error};   
        }
    }
   
}
const client = new Users();
Object.freeze(client);
module.exports = client;
