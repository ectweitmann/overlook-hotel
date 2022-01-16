import './css/base.scss';
import {domUpdates} from './domUpdates'
import {apiCall} from './apiCalls';

import './images/turing-logo.png'
import './images/booking-image.png'
import dayjs from 'dayjs';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';

let currentCustomer;
let hotel;

Promise.all([apiCall.getRooms(), apiCall.getBookings(), apiCall.getCustomers()])
  .then(data => createHotel(data))
  .catch(error => console.log(error));

const createHotel = (operationalInfo) => {
  hotel = new Hotel(
    operationalInfo[0].rooms,
    operationalInfo[1].bookings,
    operationalInfo[2].customers
  );
}

const getRandomCustomerID = () => {
  return Math.floor(Math.random() * 50);
}

const checkResponse = (response) => {
  if(!response.ok) {
    throw new Error('Unable to complete request. Please make sure the submitted input is valid');
  } else {
    return response.json();
  }
}

const displayCustomerInfo = () => {
  apiCall.getSingleCustomer(getRandomCustomerID())
    .then(response => checkResponse(response))
    .then(customer => gatherCustomerInfo(customer))
    .then(customer => domUpdates.generateCustomerDashboard(customer))
    .catch(error => console.log(error));
}

const gatherCustomerInfo = (customer) => {
  currentCustomer = new Customer(customer);
  currentCustomer.getBookings(hotel);
  currentCustomer.determineTotalCost(hotel);
  console.log(currentCustomer);
  return currentCustomer;
}

window.addEventListener('load', displayCustomerInfo);
