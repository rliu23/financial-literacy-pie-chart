
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Text, TouchableOpacity, StyleSheet, View, TextInput, Button, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Home from './home'
import "react-native-reanimated"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const DismissKeyboard = ({ children }) => (
  // Dismiss keyboard when tapping anywhere
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={{}}>{children}</View>
  </TouchableWithoutFeedback>
);

const Input = ({  }) => {
  const navigation = useNavigation();
  const [budget, setBudget] = useState('');
  const [fields, setFields] = useState([{ id: Date.now(), title: '', value: '', isFixed: false }]); // State to hold text field values
  const [expenses, setExpenses] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);

  // Update expenses and remaining budget display.
  const calculateExpenses = () => {
    let total = 0;
    fields.forEach(field => {
      if (!isNaN(parseFloat(field.value))) {
        total += parseFloat(field.value);
      }
    });
    setExpenses(total);
    setRemainingBudget(budget - total);
  };

  // Triggers whenever budget or fields change.
  useEffect(() => {
    calculateExpenses();
  }, [budget, fields]);

  const addTextField = () => {
    setFields([...fields, { id: Date.now(), title: '', value: '', isFixed: false }]);
  };

  const handleBudgetChange = (text) => {
    setBudget(text);
  };

  const handleTitleChange = (text, id) => {
    const newFields = fields.map(field => {
      if (field.id === id) {
        // If category is empty, replace with empty string.
        const value = text.trim() === "" ? "" : text;
        return { ...field, title: text };
      }
      return field;
    });
    setFields(newFields);
  };

  const handleValueChange = (text, id) => {
    const newFields = fields.map(field => {
      if (field.id === id) {
        return { ...field, value: text };
      }
      return field;
    });
    setFields(newFields);
  };

  const handleIsFixedChange = (value, id) => {
    const newFields = fields.map(field => {
      if (field.id === id) {
        return { ...field, isFixed: JSON.parse(value) };
      }
      return field;
    });
    setFields(newFields);
  };

  const removeTextField = (id) => {
    const newFields = fields.filter(field => field.id !== id);
    setFields(newFields);
  };

  const handlePress = () => {
    // Send data from input to home and navigate.
    navigation.navigate('Home', { data: fields, budget: budget });
  };

  return (
    <View styles={{marginTop: 0}}>
    <ScrollView 
      styles={{flex: 1, keyboardShouldPersistTaps: "handled", }}
      stickyHeaderIndices={[0]}
      bounces='false'>
    <View>
      <View style={{backgroundColor:'white', alignItems:'center',flexDirection: 'row',alignContent: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize:19, paddingVertical: 20, paddingRight: 10,}}>
              Budget
            </Text>
            <TextInput
              value={budget}
              onChangeText={(text) => handleBudgetChange(text)}
              placeholder="Enter budget ($)"
              style={{fontSize: 19,
                      height: 40,
                      borderColor: 'rgba(200,200,200,5)',
                      borderWidth: 1,
                      paddingHorizontal: 5,
                      borderRadius: 2,
                      width: '45%',
                      textAlign:'center',}}
              keyboardType= 'numeric'
            />
      </View>
      <View style={{backgroundColor:'white', 
                    alignItems:'center',
                    flexDirection: 'row',
                    alignContent: 'center', 
                    justifyContent: 'center',}}>
        <Text style={styles.dataHeaders}>Total Expenses</Text>
        <Text style={styles.dataHeaders}>Remaining Budget</Text>

      </View>
      <View style={{backgroundColor:'white', 
                    flexDirection: 'row', 
                    justifyContent: 'center',
                    paddingHorizontal: '10'}}>
        <TextInput
          value={expenses.toString()}
          placeholder="Total Amount"
          editable={false}
          style={{
            fontSize: 19,
            height: 40,
            borderColor: 'rgba(200,200,200,.2)',
            borderWidth: 1,
            paddingHorizontal: 0,
            marginRight: 65,
            borderRadius: 2,
            width: '25%',
            textAlign: 'center',
          }}
        />
        <TextInput
          value={remainingBudget.toString()}
          placeholder="Remaining Budget"
          editable={false}
          style={[
            styles.normalBudget,
            remainingBudget <= 0 ? styles.zeroBudget : null
          ]}
        />
      </View>

    </View>

    <View>
    <DismissKeyboard>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="position" keyboardVerticalOffset={100}>
    
    <View>
      <View
        style={{
          paddingVertical: 8,
          backgroundColor: 'white',
          borderBottomColor: 'rgba(0,0,0,0.2)',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      {fields.map((field, index) => (
        <View key={index}>
        <View style={{backgroundColor: 'white',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomColor: 'rgba(0,0,0,0.2)',
                      borderBottomWidth: StyleSheet.hairlineWidth,}}>
          <View style={styles.inputContainer}>
            <TextInput
              value={field.title}
              onChangeText={(text) => handleTitleChange(text, field.id)}
              placeholder="Category"
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={field.value}
              keyboardType="numeric"
              onChangeText={(text) => handleValueChange(text, field.id)}
              placeholder="Amount"
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
           {/* Switch may only work on iOS */}
            <Switch
              value={field.isFixed}
              trackColor={{true: 'mediumslateblue', false: 'deepskyblue'}}
              ios_backgroundColor={'deepskyblue'}
              //onValueChange={(value) => handleIsFixedChange(value, index)}
              onValueChange={(value) => handleIsFixedChange(value, field.id)}
            />
            <Text>{field.isFixed ? 'Variable' : 'Fixed'}</Text>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeTextField(field.id)}
            underlayColor='white'>
            <Text style={styles.removeText}>x</Text>
          </TouchableOpacity>
        </View>
        </View>
        
      ))}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={addTextField}
          underlayColor='white'>
          <Text style={styles.addText}>Add Category</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handlePress}
          underlayColor='white'>
          <Text style={styles.saveText}>Save and Return</Text>
        </TouchableOpacity>
      </View>
      
    </View>
    </KeyboardAvoidingView>
    </DismissKeyboard>
    </View>
    </ScrollView>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    flex: 1,
  },
  dataHeaders: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingTop: 3,
    paddingBottom: 12,
  },
  normalBudget: {
    marginLeft: 0,
    marginRight: 10,
    fontSize: 19,
    height: 40,
    borderColor: 'rgba(200,200,200,.2)',
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 4,
    width: '25%',
    textAlign: 'center',

  },
  zeroBudget: {
    marginLeft: 0,
    marginRight: 10,
    color: 'red',
    fontWeight: '700',
  },
  input: {
    fontSize: 20,
    height: 40,
    borderColor: 'rgba(200,200,200,5)',
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  addText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
  },
  addButton: {
    margin: 10,
    alignSelf: 'center',
    backgroundColor: 'dodgerblue',
    borderRadius: 15,
    width: '30%',
  },
  removeText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 1,
  },
  removeButton: {
    margin: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,0,0,0.8)',
    borderRadius: 22,
    flex: 0.22,
    padding: 5, 
    width: 50, 
    height: 29, 
  },
  saveText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
  },
  saveButton: {
    margin: 10,
    alignSelf: 'center',
    backgroundColor: 'dodgerblue',
    borderRadius: 15,
    width: '35%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
  }
});

export default Input;
