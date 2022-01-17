import './css/base.scss';
import './domUpdates';
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

let today = dayjs().format('YYYY-MM-DD');
calendar.value = today;
calendar.min = dayjs().format('YYYY-MM-DD');
calendar.max = dayjs('2023-12-31').format('YYYY-MM-DD');

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
    .then(customer => getCustomerInfo(customer))
    .then(customerInfo => domUpdates.generateCustomerDashboard(customerInfo))
    .catch(error => console.log(error));
}

const getCustomerInfo = (customer) => {
  currentCustomer = new Customer(customer);
  currentCustomer.getBookings(hotel);
  currentCustomer.determineTotalCost(hotel);
  capitalizeRoomTypes(currentCustomer.bookings);
  return currentCustomer;
}

const capitalizeRoomTypes = (roomList) => {
  roomList.forEach((room, i) => {
    roomList[i].roomType = room.roomType.split(' ')
      .map(name => name[0].toUpperCase() + name.slice(1))
      .join(' ');
  });
}

const changePages = (event) => {
  if (event.target.id === 'navBooking' || event.target.id === 'buttonDashboard') {
    hotel.determineAvailableRooms(today);
    capitalizeRoomTypes(hotel.availableRooms)
    domUpdates.displayBookingsPage(hotel)
  } else {
    domUpdates.displayDashboard(currentCustomer);
  }
}

window.addEventListener('load', displayCustomerInfo);

navDashboard.addEventListener('click', changePages);

navBooking.addEventListener('click', changePages);

buttonDashboard.addEventListener('click', changePages);
