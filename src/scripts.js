// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import {apiCall} from './apiCalls';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/booking-image.png'


console.log('This is the JavaScript entry file - your code begins here.');

apiCall.getCustomers()
  .then(data => console.log(data));

apiCall.getSingleCustomer(1)
  .then(data => console.log(data));

apiCall.getRooms()
  .then(data => console.log(data));

apiCall.getBookings()
  .then(data => data.json())
  .then(data => console.log(data));

let newBooking = {
  userID: 1,
  date: '9999/09/09',
  roomNumber: 999999999
};

// apiCalls.addNewBooking(newBooking)
//   .then(booking => {
//     console.log(booking)
//     return apiCalls.getBookings();
//   })
//   .then(booking => console.log(booking));

// apiCall.deleteBooking("1642359221802")
//   .then(data => {
//     console.log(data);
//     return apiCall.getBookings();
//   })
//   .then(bookings => console.log(bookings));
