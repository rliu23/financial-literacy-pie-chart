
import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Button, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Home from './home'

const FlexibleInputFields = ({  }) => {
  const [fields, setFields] = useState([{ id: Date.now(), title: '', value: '', isFixed: false }]); // State to hold text field values

  const addTextField = () => {
    setFields([...fields, { id: Date.now(), title: '', value: '', isFixed: false }]);
  };

   const handleTitleChange = (text, id) => {
    const newFields = fields.map(field => {
      if (field.id === id) {
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


  return (
    <View >
      {fields.map((field, index) => (
        <View key={index}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              value={field.title}
              onChangeText={(text) => handleTitleChange(text, index)}
              placeholder="Category"
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={field.value}
              onChangeText={(text) => handleValueChange(text, index)}
              placeholder="Amount"
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
           {/* Switch may only work on iOS */}
            <Switch
              value={field.isFixed}
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={addTextField}
        underlayColor='white'>
        <Text style={styles.addText}>Add Category</Text>
      </TouchableOpacity>
      
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
    padding: 5, // Add padding to increase size
    width: 50, // Specify width
    height: 29, // Specify height
  }
});

export default FlexibleInputFields;
