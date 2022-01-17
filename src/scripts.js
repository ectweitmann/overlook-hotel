import './css/base.scss';
import './domUpdates';
import {domUpdates} from './domUpdates'
import {apiCall} from './apiCalls';

import './images/turing-logo.png'
import './images/booking-image.png'
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween);
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';

let currentCustomer;
let hotel;
let today = dayjs().format('YYYY/MM/DD');

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

const updateAvailableRoomsList = () => {
  if (!dayjs(calendar.value).isBetween(calendar.min, calendar.max, null, [])) {
    return domUpdates.showInvalidDateErrorMessages();
  } else if (dropDown.value === '' || dropDown.value === 'any') {
    const selectedDate = dayjs(calendar.value).format('YYYY/MM/DD');
    hotel.determineAvailableRooms(selectedDate);
    capitalizeRoomTypes(hotel.availableRooms);
    domUpdates.generateAvailableRooms(hotel);
  } else {
    const selectedDate = dayjs(calendar.value).format('YYYY/MM/DD');
    hotel.determineAvailableRooms(selectedDate);
    hotel.filterByRoomType(dropDown.value);
    capitalizeRoomTypes(hotel.availableRooms);
    domUpdates.generateAvailableRooms(hotel);
  }
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
    setDefaultInputValues();
  }
}

const setDefaultInputValues = () => {
  calendar.value = dayjs().format('YYYY-MM-DD');
  calendar.min = dayjs().format('YYYY-MM-DD');
  calendar.max = dayjs('2023-12-31').format('YYYY-MM-DD');
  dropDown.selectedIndex = 0;
}

const setUpApplication = (event) => {
  setDefaultInputValues();
  displayCustomerInfo();
}

window.addEventListener('load', setUpApplication);

navDashboard.addEventListener('click', changePages);

navBooking.addEventListener('click', changePages);

buttonDashboard.addEventListener('click', changePages);

buttonSearchRooms.addEventListener('click', (e) => {
  updateAvailableRoomsList(e);
});
