# App Overview
The app consists of two main screens, Home and Input. The Home screen displays the pie charts based on the data the user enters on the Input screen.

## Home Screen






## Misc. Files
### App.js
The Screens function defines the two tabs in the Bottom Navigator. This separate function is necessary in order to wrap the entire app in a Stack.Navigator to allow navigation from the Home screen to the Input Screen. The Container screen contains the bottom navigator components but is never navigated to.
### _layout.js
This file is necessary due to a bug with Expo Go 51.0.0 where navigation between screens causes a crash. The import of 'react-native-reanimated' fixes this bug.
### /node_modules
This folder contains all the imported packages. In the case of an issue with importing packages, first attempt to manually install the package with an error using `npm install 'packageName'`. If that fails, delete the node_modules folder and run `npm install` again. 
