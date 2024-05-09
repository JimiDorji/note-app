// App.js
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './store';
import NoteListScreen from './screens/NoteListScreen';
import AddNoteScreen from './screens/AddNoteScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="NoteList"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="NoteList"
            component={NoteListScreen}
            options={{title: 'Notes'}}
          />
          <Stack.Screen
            name="AddNote"
            component={AddNoteScreen}
            options={{title: 'Add Note'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Navigation;
