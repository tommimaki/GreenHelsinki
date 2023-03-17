# GreenHelsinki

*Sustainable Travel to Helsinki* - React Native Mobile App
**This is a React Native mobile app for sustainable travel to Helsinki, built with Firebase Authentication, Google Geocoding, Firebase Realtime Database, helsinki services apis and responsive styling.
restaurant preview             |  bicycling route
:-------------------------:|:-------------------------:
![Screenshot 2023-02-24 at 12 17 55](https://user-images.githubusercontent.com/74586216/221153788-fcc38746-0863-44db-b2fb-3555f7d350a6.png) |  ![Screenshot 2023-02-24 at 12 17 23](https://user-images.githubusercontent.com/74586216/221153812-a4dd2437-5644-4792-8b9e-3fb1280a6c92.png)

## Description
The Sustainable Travel to Helsinki app is designed to help users plan sustainable trips to Helsinki by providing information on sustainable travel options, such as public transportation, biking, and walking, and suggesting eco-friendly activities and accommodations. The app uses Firebase Authentication to handle user authentication and authorization, Google Geocoding to convert addresses into latitude and longitude coordinates, and Firebase Realtime Database to store user data.

### Features
* User authentication and authorization using Firebase Authentication
* Input and locationdata of trip start and end locations using Google Geocoding api
* Calculation of the distance between trip start and end using digitransit/hsl api
* Suggestions of eco-friendly activities and accommodations in Helsinki
* Saving and retrieving locations of shops and restaurants as favorites in Firebase Realtime Database
* Responsive styling for different device sizes and orientations

### Installation
To run the app on your local machine, you need to have the following tools installed:

* Node.js
* React Native CLI
* Android Studio or Xcode (depending on whether you want to run the app on an Android or iOS device)
#### After installing the required tools, follow these steps:

* Clone the repository: git clone https://github.com/your-username/sustainable-travel-to-helsinki.git
* Install dependencies: cd sustainable-travel-to-helsinki && npm install
* Set up Firebase Authentication and Realtime Database:
* Create a Firebase project and enable Authentication and Realtime Database.
* Add the Firebase configuration to src/config/firebase.js.
* Set up Google Geocoding:
* Create a Google Cloud project and enable the Geocoding API.
* Add the Google Geocoding API key to src/config/googleMaps.js.
* Start the app: npm run android or npm run ios (depending on whether you want to run the app on an Android or iOS device)

### Usage
When you run the app, you will see a login screen where you can either create a new account or sign in with an existing one. After logging in, you will be taken to the main screen of the app, You have a screen for restaurants, some flea shops and city bike locations, and route maps where you can input your trip start and end locations and select your preferred mode of transportation (public transportation, biking, or walking). The app will then calculate the distance and estimated travel time between your trip start and end locations.  Also suggest eco-friendly activities in Helsinki based on your preferences.

You can save your trip data to Firebase Realtime Database by clicking the "Save Trip" button. To view your saved trips, click the "My Trips" button in the navigation bar. You can delete a saved trip by swiping left on the trip card and clicking the "Delete" button.

### Contributing
Contributions to the Sustainable Travel to Helsinki app are welcome. To contribute, follow these steps:

* Fork the repository: https://github.com/your-username/sustainable-travel-to-helsinki.git
* Create a new branch for your feature: git checkout -b my-new-feature
* Make your changes and commit them: git commit -m 'Add some feature'
* Push your changes to your fork: git push origin my-new-feature
* Create a pull request to the main branch of the original repository.

### License
The Sustainable Travel to Helsinki app is open source software licensed under the MIT License.
