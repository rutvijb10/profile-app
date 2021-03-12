import React, {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateProfileData } from '../redux/profile/reducer';
// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import { useEffect } from 'react';

const TestScreen = (props) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    setImageUri(props.profileImageUri)
  }, [props.profileImageUri])

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const profileImageUri = response.uri;
        const profileImageUri = response.uri;
        // props.updateProfileData('profileImageUri', profileImageUri);
        setImageUri(profileImageUri);
      }
    });
    // this.saveSettings();
  };

  console.log('props.profileImageUri');
  console.log(props.profileImageUri);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>

    <View style={styles.screenTitleView}>
                <Text style={styles.screenTitleText}>
                    Upload a photo of yourself
                </Text>
            </View>
            <TouchableOpacity onPress={pickImage} style={styles.inputContainer}>
            {imageUri ? (
                      <Image
                          style={styles.profileImage}
                          source={{uri: imageUri}}
                      />
                    ) : null}
              </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}
            onPress={() => {
              console.log('updateProfileData ');
              props.updateProfileData('profileImageUri', imageUri);
              if(props.navigation.canGoBack()) {
                props.navigation.pop();
              }
            }}
            >
              <Text style={[styles.buttonText]}>Update</Text>
            </TouchableOpacity>
            </View>
  );
};


export default compose(
  connect(
    state => ({
      profileImageUri: state.profile.profileImageUri
    }),
    dispatch => ({
      updateProfileData: (...args) => dispatch(updateProfileData(...args)),
    }),
  )
)(TestScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
  buttonText: {
    fontFamily: 'Avenir-Book',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff'
  },
  buttonContainer: {
    backgroundColor: "#000",
    width: '80%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5, // iOS
    elevation: 3, // Android
    shadowOffset: { width: 0, height: 0 }
  },
  screenTitleView: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
},
screenTitleText: {
  fontFamily: 'Avenir-Book',
  fontSize: 24,
  fontWeight: '800',
  color: '#000',
},
profileImage: {
  width: 300,
  height: 300,
  backgroundColor: 'black'
},
inputContainer: {
  marginTop: 20,
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '80%',
  flexDirection: 'row',
  minHeight: 250,
  marginBottom: 50,
},
});