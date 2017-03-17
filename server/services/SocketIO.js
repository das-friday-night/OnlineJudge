module.exports = function(io) {
    var debugMode = true;
    var socketIDToRoomID = {};
    var rooms = {};
    io.on("connection", function(socket) {
        // Receive: server receive a socket.
        let roomID = socket.handshake.query["problemID"];
        socketIDToRoomID[socket.id] = roomID;
        if(!rooms[roomID]){
            rooms[roomID] = {
                "members": [socket.id]
            };
            if(debugMode) console.log("***********new room open:\n" + JSON.stringify(rooms));
        } else {
            rooms[roomID].members.push(socket.id);
            if(debugMode) console.log("***********enter room:\n" + socket.id + "->" + roomID + ". " + JSON.stringify(rooms));
        }

        socket.on("text", function(delta) {
            if(debugMode) console.log("***********new change text:\n" + delta);
            let mems = rooms[socketIDToRoomID[socket.id]].members;
            if(!mems) {
                console.log("***********Server can't broadcast change text: can't find " + socket.id + " in any room!");
                return;
            }
            mems.forEach(socketID=>{
                if(socketID != socket.id) {
                    // Attention: this if condition is necessary otherwise client who made the change
                    // will rcv and perform another same change
                    io.to(socketID).emit("changeText", delta);
                }
            });
        });

        socket.on("cursor", function (cursor) {
            cursor = JSON.parse(cursor);
            cursor['socketID'] = socket.id;

            let mems = rooms[socketIDToRoomID[socket.id]].members;
            if(!mems) {
                console.log("***********Server can't broadcast change cursor: can't find " + socket.id + " in any room!");
                return;
            }
            mems.forEach(socketID=>{
                if(socketID != socket.id) {
                    // Attention: this if condition is necessary otherwise client who made the change
                    // will rcv and perform another same change
                    io.to(socketID).emit("changeCursor", JSON.stringify(cursor));
                }
            });
        });

        // io.to(socket.id).emit('message', 'hehe') // (test) Send: server send message back
    });
}
