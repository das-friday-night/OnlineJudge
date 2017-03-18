// socketIDToRoomID: {socketID : roomID}
// rooms:  { roomID : {
//                      changeRecords: [changes],
//                      members: [sockerID]
//                    }
//         }

var redisService = require("./redisService");

module.exports = function(io) {
    const debugMode = true;
    const verboseMode = false;
    var socketIDToRoomID = {};
    var rooms = {};
    io.on("connection", function(socket) {

        // things to do at socket first connection
        let roomID = socket.handshake.query["problemID"];
        socketIDToRoomID[socket.id] = roomID;
        if(!rooms[roomID]){
            redisService.get("roomID", function(changeRecords){
                if(changeRecords){
                    if(debugMode) console.log("***********load change records from redis:\n");
                    if(verboseMode) console.log(changeRecords);
                    rooms[roomID] = {
                        "changeRecords": JSON.parse(changeRecords),
                        "members": [socket.id]
                    };

                    // TODO send sequence change make socket.id up to date
                } else {
                    if(debugMode) console.log("***********redis change records not found");
                    rooms[roomID] = {
                        "changeRecords": [],
                        "members": [socket.id]
                    };
                }
                if(debugMode) console.log("***********new room open:\n" + JSON.stringify(rooms));
            });
        } else {
            rooms[roomID].members.push(socket.id);
            // TODO send sequence change make socket.id up to date
            if(debugMode) console.log("***********enter room:\n" + socket.id + "->" + roomID + ".\n" + rooms[roomID].members);
            if(verboseMode) console.log(JSON.stringify(rooms));
        }
        // ---------------------------------------------

        socket.on("text", function(delta) {
            if(debugMode) console.log("***********new change text: "+socket.id+"\n"+delta);
            rooms[socketIDToRoomID[socket.id]].changeRecords.push(delta);
            if(verboseMode) console.log("***********changeRecords:\n"+rooms[socketIDToRoomID[socket.id]].changeRecords);
            broadcast("changeText", delta);
        });

        socket.on("cursor", function (cursor) {
            cursor = JSON.parse(cursor);
            cursor['socketID'] = socket.id;
            broadcast("changeCursor", JSON.stringify(cursor));
        });

        socket.on("loadRecords", function () {
            let changeRecords = rooms[socketIDToRoomID[socket.id]].changeRecords;
            if(debugMode) console.log("***********load records: "+socket.id);
            changeRecords.forEach(record => {
                if(verboseMode) console.log("***********load record:\n" + record);
                socket.emit("changeText", record);
            });
        });

        function broadcast(eventName, dataStr){
            // INPUT: **********
            // eventName: [string] reply mode, "text" or "cursor"
            // dataStr: [string] data to be transmitted.
            let mems = rooms[socketIDToRoomID[socket.id]].members;
            if(!mems) {
                console.log("***********Server can't broadcast " + eventName +": can't find "
                    + socket.id + " in any room!");
                return;
            }
            mems.forEach(socketID=>{
                if(socketID != socket.id) {
                    // !!!IMPORTANT:
                    // this if condition is necessary otherwise client who made the change
                    // will rcv and perform another same change
                    if(debugMode) console.log("***********broadcast to: "+socketID+"\n"+eventName);
                    if(verboseMode) console.log(dataStr);
                    io.to(socketID).emit(eventName, dataStr);
                }
            });
        }

        // io.to(socket.id).emit('message', 'hehe') // (test) Send: server send message back
    });
}
