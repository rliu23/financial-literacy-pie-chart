# App Overview
The app consists of two main screens, Home and Input. The Home screen displays the pie charts based on the data the user enters on the Input screen.

## Home Screen
The data for the pie chart from the Input page is sent through navigation and received in the data and budget variables. When no data is entered or the expenses exceed the budget, the pie charts are not displayed and the user is directed to the Input screen to enter or edit their expenses. The data is then filtered into an overall expense, variable expense, and fixed expense variable for each of the three pie charts. The remaining budget item is then added to the overall expense pie chart data. 
The top of the screen displays the total budget, remaining budget, and expense total. 

## Input Screen
The top of the screen has the editable budget field, along with uneditable remaining budget and total expenses displays. The latter two fields are updated whenever the fields or the budget changes. When the user clicks add category, a field is created with an id based on the current time in milliseconds.
The pie charts on the Home screen are only updated when the user clicks Save and Return, as the data is sent through the navigation route between the two screens. 

## Misc. Files
### App.js
The Screens function defines the two tabs in the Bottom Navigator. This separate function is necessary in order to wrap the entire app in a Stack.Navigator to allow navigation from the Home screen to the Input Screen. The Container screen contains the bottom navigator components but is never navigated to.
### _layout.js
This file is necessary due to a bug with Expo Go 51.0.0 where navigation between screens causes a crash. The import of 'react-native-reanimated' fixes this bug.
### /node_modules
This folder contains all the imported packages. In the case of an issue with importing packages, first attempt to manually install the package with an error using `npm install 'packageName'`. If that fails, delete the node_modules folder and run `npm install` again. 

## Potential Issues
- Long category names may result in part of the category name going off the screen. This issue can only be fixed by reducing the font size of the text or the width of the pie chart, both of which may lead to reduced readability. react-native-chart-kit does not support advanced styling for the chart legend.
- This app has not been tested on Android. Due to this, some iOS-only styling that has been used may not render properly on an Android.
