require('dotenv').config();

const {Client} = require('pg')
const csvWriter = require('csv-write-stream')

var writer = csvWriter({headers: ["from", "to", "areaid", "descr", "time"]})
var fs = require('fs')

const db = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: process.env.PSQL_PASSWORD,
    database: "cclassmessages"
})

var prettyjson = require('prettyjson'),
    StompClient = require('stomp-client').StompClient;

var destination = '/topic/TD_LNW_WMC_SIG_AREA',
    client = new StompClient('datafeeds.networkrail.co.uk', 61618, process.env.EMAIL_ADDRESS, process.env.PASSWORD, '1.0');


writer.pipe(fs.createWriteStream('out.csv'))

client.connect(function(sessionId) {
    console.log('Trying to connect...')

    client.subscribe(destination, async function(body, headers) {
            let data = JSON.parse(body)
            data.forEach(async function(message) {

                if (Object.values(message)[0].msg_type === "CA"){
                    let msg = Object.values(message)[0]
                    console.log(msg.area_id)
                    writer.write([msg.from, msg.to, msg.area_id, msg.descr, msg.time])              
                }

            })
        
    });

});

        
    
    

// await db.query(
//     `INSERT into cclassmessages(areaid, toberth, fromberth, descr, msgtime) VALUES (${msg.area_id}, ${msg.to}, ${msg.from}, ${msg.descr}, ${msg.time})`, (err, res) => {
//         if (!err){
//             console.log("Res: ")
//             console.log(res)
//         } else {
//             console.log("Error: ")
//             console.log(err)
//         }
//     }
// )
    
    

