# Overlook Hotel

## Project Overview
A hotel bookings management tool for guests to be able to track the total cost of their previous/upcoming bookings and reserve available rooms for future stays.

On page load the user is met with a login page, asking them to login.
The login credentials for the customers are as follows:
- Username: customer# (# = any number 1 through 50)
- Password: overlook2021
![Login Page](https://media.giphy.com/media/SLBzf6VBaZseUwOtXC/giphy.gif)

Upon login the user is met with the dashboard page. Here they can find all their previous and upcoming bookings as well as the total cost of these bookings. From here they can navigate to the bookings page by clicking either the Book Now button or the 'Booking' link in the navigation bar in the top right corner.
![Dashboard Page](https://media.giphy.com/media/8CrkUr49aMqwaOfBtq/giphy-downsized-large.gif)

On the bookings page the user is met with all of today's available rooms. From here they can filter the list by their desired room type. If no rooms are available that match their search criteria the user will be notified and prompted to try a new search.
![Dashboard-Page Searching by Room Type](https://media.giphy.com/media/7C8zBJhhDmupateV7Y/giphy.gif)

The user can click on any of the available rooms on the list at which point they'll be asked if they want to book this room. If they decline they can continue searching for a room to book. If they confirm the room will be removed from the list because it is now booked and therefore no longer available to book on the specified date.
![Booking a Room](https://media.giphy.com/media/7AYemERKWAGQGkatY6/giphy.gif)

If the user returns to the dashboard page they will find that their list of bookings has been updated with the newest booking and their total cost has also increased. From here they are free to go back to the bookings page and repeat the process over again.
![Show updated dashboard page](https://media.giphy.com/media/UQUKL59KChvXqg4Otr/giphy-downsized-large.gif)

## Setup
1. Fork the repo
1. Clone down the repo: `git clone [remote-address]`
1. `cd` into it. Then run: `npm install`
1. Next, `cd` out of the repo and clone down [this repo](https://github.com/turingschool-examples/overlook-api)
1. `cd` into it. Then run: `npm install` and then `npm start`
1. After that navigate back into the first repo you cloned down. Then run `npm start`
1. Go to `http://localhost:8080/`  

Enter `control + c` in your terminal to stop the server at any time.

## Technologies Used
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![SASS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white)
![Chai](https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

![Atom](https://img.shields.io/badge/Atom-%2366595C.svg?style=for-the-badge&logo=atom&logoColor=white)

## Future Features
Implement Manager class functionality.
A manager would have their own:
- Login credentials and Dashboard page displaying:
  - Total rooms available today
  - The percentage of rooms occupied today
  - Today's total revenue
A manager would be able to:
- Search for any user by name and:
  - View their name, a list of all of their bookings, and the total amount they’ve spent
  - Add a room booking for that user
  - Delete any upcoming room bookings for that user (they cannot delete a booking from the past)
---
## Creator
Ethan Tweitmann

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ethantweitmann/)
