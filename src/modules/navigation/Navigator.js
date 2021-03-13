import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import InputScreen from '../../screens/InputScreen';
import ImageScreen from '../../screens/ImageScreen';
import ProfileScreen from './../../screens/ProfileScreen';

const AppStack = createStackNavigator();

const AppNavigation = () => (
  <AppStack.Navigator 
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' }
    }}
    initialRouteName={'Profile'}
  >
    <AppStack.Screen name="Image" component={ImageScreen} 
    options={{
      headerShown: true,
      headerLeft: (props) => {
        console.log('header left props');
        // console.log(;
        return (
          <Icon onPress={props.onPress} name="md-arrow-back" size={35} style={{paddingLeft: 20}}/>
        )
      },
        
      // header: () => (null)
      headerTitle: null
    }} 
    />
    <AppStack.Screen name="Profile" component={ProfileScreen} />
    <AppStack.Screen name="Input" component={InputScreen}
      options={{
        headerShown: true,
        headerLeft: (props) => {
          console.log('header left props');
          // console.log(;
          return (
            <Icon onPress={props.onPress} name="md-arrow-back" size={35} style={{paddingLeft: 20}}/>
          )
        },
          
        // header: () => (null)
        headerTitle: null
      }} 
    />
  </AppStack.Navigator>
)
export default function App() {
  return (
    <AppNavigation />
  );
}

const styles = StyleSheet.create({
  menuTitle: {
    marginLeft: 10,
    color: '#fff'
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  userName: {
    color: '#fff',
    fontSize: 18
  },
  divider: {
    borderBottomColor: 'white',
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10
  },
});