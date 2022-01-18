import './css/base.scss';
import './domUpdates';
import {domUpdates} from './domUpdates'
import {apiCall} from './apiCalls';

import './images/turing-logo.png'
import './images/booking-image.png'
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
import Booking from '../src/classes/Booking';
import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';

dayjs.extend(isBetween);
let currentCustomer;
let hotel;
let today = dayjs().format('YYYY/MM/DD');
let selectedRoom = null;

Promise.all([apiCall.getRooms(), apiCall.getBookings(), apiCall.getCustomers()])
  .then(responses => Promise.all(responses.map(response => checkResponse(response))))
  .then(data => createHotel(data))
  .catch(error => domUpdates.displayErrorMessage(error));

const createHotel = (operationalInfo) => {
  hotel = new Hotel(
    operationalInfo[0].rooms,
    operationalInfo[1].bookings,
    operationalInfo[2].customers
  );
}

const checkResponse = (response) => {
  if (!response.ok) {
    console.log(response);
    throw new Error(`${response.status} ${response.statusText}`);
  } else {
    return response.json();
  }
}

const displayCustomerInfo = (customerID) => {
  apiCall.getSingleCustomer(customerID)
    .then(response => checkResponse(response))
    .then(customer => getCustomerInfo(customer))
    .then(customerInfo => domUpdates.generateCustomerDashboard(customerInfo))
    .catch(error => domUpdates.displayErrorMessage(error));
}

const getCustomerInfo = (customer) => {
  currentCustomer = new Customer(customer);
  aggregateCustomerData(currentCustomer);
  return currentCustomer;
}

const aggregateCustomerData = () => {
  currentCustomer.getBookings(hotel);
  currentCustomer.determineTotalCost(hotel);
  capitalizeRoomTypes(currentCustomer.bookings);
}

const updateAvailableRoomsList = () => {
  const selectDate = dayjs(calendar.value).format('YYYY/MM/DD');
  if (!dayjs(calendar.value).isBetween(calendar.min, calendar.max, null, []) || calendar.value === '') {
    return domUpdates.showInvalidDateErrorMessages(calendar.value, today);
  }
  if (dropDown.value === '' || dropDown.value === 'any') {
    aggregateAvailableRooms(selectDate);
  } else {
    aggregateAvailableRooms(selectDate, dropDown.value);
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
    domUpdates.displayBookingsPage();
    aggregateAvailableRooms(today);
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

const determineSelectedRoom = (event) => {
  if (event.target.classList.contains('available-room')) {
    selectedRoom = event.target.id;
  }
}

const addBooking = (event) => {
  if (event.target.id === 'buttonConfirmBooking') {
    let bookingDate = dayjs(calendar.value).format('YYYY/MM/DD');
    apiCall.addNewBooking(currentCustomer.bookRoom(selectedRoom, bookingDate))
      .then(response => checkResponse(response))
      .then(data => {
        hotel.bookedRooms.push(new Booking(data.newBooking))
      })
      .catch(error => domUpdates.displayErrorMessage(error))
      .finally(() => {
        updateDataModel();
      });
  }
}

const updateDataModel = () => {
  aggregateCustomerData();
  aggregateAvailableRooms(dayjs(calendar.value).format('YYYY/MM/DD'));
}

const aggregateAvailableRooms = (date, roomType) => {
  hotel.determineAvailableRooms(date);
  roomType && hotel.filterByRoomType(roomType);
  capitalizeRoomTypes(hotel.availableRooms);
  domUpdates.generateAvailableRooms(hotel);
}

const setUpApplication = () => {
  if (domUpdates.verifyFormInput(hotel)) {
    domUpdates.hideLoginPage();
    setDefaultInputValues();
    displayCustomerInfo(parseInt(username.value.slice(8)));
  }
}

buttonSubmit.addEventListener('click', () => {
  setUpApplication();
});

navDashboard.addEventListener('click', changePages);

navBooking.addEventListener('click', changePages);

buttonDashboard.addEventListener('click', changePages);

buttonSearchRooms.addEventListener('click', (e) => {
  updateAvailableRoomsList(e);
});

scrollSection.addEventListener('click', (e) => {
  determineSelectedRoom(e);
});

window.addEventListener('click', (e) => {
  domUpdates.displayConfirmBookingPrompt(e);
});

buttonWrapper.addEventListener('click', (e) => {
  addBooking(e);
});
