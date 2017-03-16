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
            if(debugMode) console.log("enter room: \n" + socket.id + "->" + roomID + ". " + JSON.stringify(rooms));
        }

        socket.on("change", function(delta) {
            if(debugMode) console.log("***********new change:\n" + delta);
            let mems = rooms[socketIDToRoomID[socket.id]].members;
            if(!mems) {
                console.log("***********Server can't broadcast change: can't find " + socket.id + " in any room!");
                return;
            }
            mems.forEach(socketID=>{
                io.to(socketID).emit("change", delta);
            });
        });

        // io.to(socket.id).emit('message', 'hehe') // (test) Send: server send message back
    });
}
