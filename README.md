<h1>App Overview</h1>
The app consists of two main screens, Home and Input. The Home screen displays the pie charts based on the data the user enters on the Input screen.

<h3>Home Screen</h3>






<h3>Misc. Files</h3>
<h4>App.js</h4>
The Screens function defines the two tabs in the Bottom Navigator. This separate function is necessary in order to wrap the entire app in a Stack.Navigator to allow navigation from the Home screen to the Input Screen. The Container screen contains the bottom navigator components but is never navigated to.
<h4>_layout.js</h4>
This file is necessary due to a bug with Expo Go 51.0.0 where navigation between screens causes a crash. The import of 'react-native-reanimated' fixes this bug.
<h4>/node_modules</h4>
This folder contains all the imported packages. In the case of an issue with importing packages, first attempt to manually install the package with an error using npm install 'packageName'. If that does not work, delete the node_modules folder and run npm install. 
