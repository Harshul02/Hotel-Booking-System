import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Divider, Space, Tag } from 'antd';
import Adminscreen from "./Adminscreen";


const { TabPane } = Tabs;
function Profilescreen() {


  if (!localStorage.getItem("currentUser")) {
    window.location.href = "/login";
  }

  const user = JSON.parse(localStorage.getItem("currentUser"));
console.log(user);

  // useEffect(() => {
  //   if (!localStorage.getItem("currentUser")) {
  //     window.location.href = "/login";
  //   }
  // }, []);

  // function redct(){
  //   window.location.href = "/admin";
  // }

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name: {user.name}</h1>
          <h1>E-Mail: {user.email}</h1>
          <h1>isAdmin: {user.isAdmin ? "YES" : "NO"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
        {user.isAdmin ? (
          <TabPane tab="Admin" key="3">
          <Adminscreen />
        </TabPane>
        ):("")}
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  useEffect(() => {
    async function fetchData(){
    try {
      setloading(true);
      const data = await (
        await axios.post(`${process.env.REACT_APP_URL}/api/bookings/getbookingsbyuserid`, {
          userid: user._id,
        })
      ).data;
      setbookings(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(error);
    }
  }
  fetchData();
}, []);

async function cancelBooking(bookingid, roomid){
  try{
    setloading(true);
    const result =await( await axios.post(`${process.env.REACT_APP_URL}/api/bookings/cancelbooking`, {bookingid, roomid})).data;
    console.log(result);
    setloading(false);
    Swal.fire('Congrats!', 'Your booking has been cancelled', 'success').then(result=>{
      window.location.reload();
    });
  }catch(error){
    console.log(error);
    setloading(false);
    Swal.fire('Oops', 'Something went wrong', 'error');
  }
}

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs">
                  <h1>{booking.room}</h1>
                  <p>
                    <b>Booking ID:</b> {booking._id}
                  </p>
                  <p>
                    <b>Check-in Date:</b> {booking.fromdate}
                  </p>
                  <p>
                    <b>Check-out Date:</b> {booking.todate}
                  </p>
                  <p>
                    <b>Amount:</b> {booking.totalamount}
                  </p>
                  <p>
                    <b>Status</b>:{" "}
                    {/* {booking.status == "booked" ? "Confirmed" : "cancelled"} */}
                    {booking.status == 'cancelled' ? (<Tag color="red">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>)}
                  </p>
                  {booking.status !== 'cancelled' && ( 
                    <div className="text-right">
                    <button className="btn btn-primary" onClick={() => cancelBooking(booking._id, booking.roomid)}>CANCEL BOOKING</button>
                  </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
