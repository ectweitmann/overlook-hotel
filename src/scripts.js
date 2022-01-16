// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import {
  getCustomers,
  getSingleCustomer,
  getRooms,
  getBookings,
  addNewBooking,
  deleteBooking
} from './apiCalls';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/booking-image.png'


console.log('This is the JavaScript entry file - your code begins here.');

getCustomers()
  .then(data => console.log(data));

getSingleCustomer(1)
  .then(data => console.log(data));

getRooms()
  .then(data => console.log(data));

getBookings()
  .then(data => console.log(data));

let newBooking = {
  userID: 1,
  date: '9999/09/09',
  roomNumber: 999999999
};

// addNewBooking(newBooking)
//   .then(booking => {
//     console.log(booking)
//     return getBookings();
//   })
//   .then(booking => console.log(booking));

// deleteBooking("1642356832980")
//   .then(data => {
//     console.log(data);
//     return getBookings();
//   })
//   .then(bookings => console.log(bookings));
