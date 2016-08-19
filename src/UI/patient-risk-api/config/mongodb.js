/**
 * Created by prokarma on 8/18/2016.
 */

/*
* 'VCAP_SERVICES':{
 "mongodb30": [
      {
         "name": "patient-readmission",
         "label": "mongodb30",
         "tags": ["mongodb30"],
         "plan": "free",
         "credentials": {
             "hostname": "10.0.4.4",
             "ports": {
                 "27017/tcp": "32869",
                 "28017/tcp": "32870"
                 },
              "port": "32869",
              "username": "h2saxjj0fcj37oiq",
              "password": "e9syw6r4wtpoa6cd",
              "dbname": "7y14zotonpz6i98x",
              "uri": "mongodb://h2saxjj0fcj37oiq:e9syw6r4wtpoa6cd@10.0.4.4:32869/7y14zotonpz6i98x"
            } <--credentials
       }
    ]
 }
*/
module.exports = function(){
    var mongoDbConfig = JSON.parse(process.env.VCAP_SERVICES).mongodb30[0];

/*    console.log('MongoDB Configuration');
    console.log('---------------------');
    console.log(process.env.VCAP_SERVICES);
    console.log(mongoDbConfig.mongodb30);
    //'mongodb://localhost:27017/PatientReadmission'*/

    return{
      connectionString: mongoDbConfig.credentials.uri
    };
}