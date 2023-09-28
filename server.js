const express = require('express');
var cors = require('cors');
const app = express();
const db = require('./db');
const roomsRoute = require('./routers/roomsRoute');
const usersRoute = require('./routers/usersRoute');
const bookingsRoute = require('./routers/bookingsRoute');

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the origin of your frontend application
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);



const port = process.env.PORT || 5000;





app.listen(port, ()=>{console.log(`Server running on port ${port}`)});