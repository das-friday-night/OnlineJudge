// Data Structure:
// socketIDToRoomID: {socketID : roomID}
// rooms:  { roomID : {
//                      changeRecords: [changes],
//                      members: [sockerID]
//                    }
//         }

var redisService = require("./redisService");
const DEBUGMODE = true;
const VERBOSEMODE = false;
const EXPIRED_IN_SEC = 60;

module.exports = function(io) {
    var socketIDToRoomID = {};
    var rooms = {};
    io.on("connection", function(socket) {

        // on ENTER
        // things to do at socket first connection
        let roomID = socket.handshake.query["problemID"];
        socketIDToRoomID[socket.id] = roomID;
        if(!rooms[roomID]){
            redisService.get(roomID, function(changeRecords){
                if(changeRecords){
                    if(DEBUGMODE) console.log("***********Load Redis records");
                    if(VERBOSEMODE) console.log(changeRecords);
                    rooms[roomID] = {
                        "changeRecords": JSON.parse(changeRecords),
                        "members": [socket.id]
                    };

                    // TODO send sequence change make socket.id up to date
                } else {
                    if(DEBUGMODE) console.log("***********Load ZERO Redis records");
                    rooms[roomID] = {
                        "changeRecords": [],
                        "members": [socket.id]
                    };
                }
                if(DEBUGMODE) console.log("***********OPEN new room: ["+roomID+"]\n"+rooms[roomID].members);
            });
        } else {
            rooms[roomID].members.push(socket.id);
            // TODO send sequence change make socket.id up to date
            if(DEBUGMODE) console.log("***********Enter room:\n" + socket.id + "->" + roomID + ".\n" + rooms[roomID].members);
            if(VERBOSEMODE) console.log(JSON.stringify(rooms));
        }
        // ---------------------------------------------

        // on LEAVE
        socket.on("disconnect", function () {
            let roomID = socketIDToRoomID[socket.id];
            let members = rooms[socketIDToRoomID[socket.id]].members;
            let index = members.indexOf(socket.id);
            if(index>=0){
                if(DEBUGMODE) console.log("***********DELETE member: " + socket.id);
                members.splice(index,1);
                if(members.length == 0){
                    // no one in room, save change records to redis and delete room
                    let val = JSON.stringify(rooms[roomID].changeRecords);
                    //redisService.set(roomID, val, redisService.redisPrint);
                    redisService.set(roomID, val, null);
                    redisService.expire(roomID, EXPIRED_IN_SEC);
                    delete rooms[roomID];
                    if(DEBUGMODE) console.log("***********BACKUP records to Redis & DELETE room"+roomID);
                }
            }
            delete socketIDToRoomID[socket.id];
        });
        // ---------------------------------------------


        socket.on("text", function(delta) {
            if(DEBUGMODE) console.log("***********new change text: "+socket.id+"\n"+delta);
            rooms[socketIDToRoomID[socket.id]].changeRecords.push(delta);
            if(VERBOSEMODE) console.log("***********changeRecords:\n"+rooms[socketIDToRoomID[socket.id]].changeRecords);
            broadcast("changeText", delta);
        });

        socket.on("cursor", function (cursor) {
            cursor = JSON.parse(cursor);
            cursor['socketID'] = socket.id;
            broadcast("changeCursor", JSON.stringify(cursor));
        });

        socket.on("loadRecords", function () {
            let changeRecords = rooms[socketIDToRoomID[socket.id]].changeRecords;
            if(DEBUGMODE) console.log("***********Load records to: "+socket.id);
            changeRecords.forEach(record => {
                if(VERBOSEMODE) console.log("****Send:\n" + record);
                socket.emit("changeText", record);
            });
        });

        function broadcast(eventName, dataStr){
            // INPUT: **********
            // eventName: [string] reply mode, "text" or "cursor"
            // dataStr: [string] data to be transmitted.
            let mems = rooms[socketIDToRoomID[socket.id]].members;
            if(!mems) {
                console.log("***********Server CANNOT broadcast "+eventName+": CANNOT find "+socket.id);
                return;
            }
            mems.forEach(socketID=>{
                if(socketID != socket.id) {
                    // !!!IMPORTANT:
                    // this if condition is necessary otherwise client who made the change
                    // will rcv and perform another same change
                    if(DEBUGMODE) console.log("***********Broadcast "+eventName+" to: "+socketID);
                    if(VERBOSEMODE) console.log(dataStr);
                    io.to(socketID).emit(eventName, dataStr);
                }
            });
        }

        // io.to(socket.id).emit('message', 'hehe') // (test) Send: server send message back
    });
}
