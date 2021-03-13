import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateProfileData } from '../redux/profile/reducer';
import { PROFILE_ITEMS_INPUTS, PROFILE_ITEMS_METADATA } from '../constants';
import { useState } from 'react';
import { useEffect } from 'react';

const INPUT_NUMBER_WIDTH_MAP = {
  1: '100%',
  2: '50%',
};
const InputScreen = props => {
  const { key } = props?.route?.params;
  const inputData = PROFILE_ITEMS_INPUTS[key];
  const keyMetadata = PROFILE_ITEMS_METADATA[key];
  const [inputStates, setInputStates] = useState([]);
  useEffect(() => {
    const defaultStates = inputData.inputs.map(input => props[input.inputKey]);
    setInputStates(defaultStates);
  }, [inputData]);
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.screenTitleView}>
        <Text style={styles.screenTitleText}>{keyMetadata?.title}</Text>
      </View>
      <View style={styles.inputContainer}>
        {inputData.inputs.map((input, index) => {
          return (
            <View
              key={index}
              style={[
                styles.inputView,
                { width: INPUT_NUMBER_WIDTH_MAP[inputData.inputs.length] },
              ]}
            >
              {input.label ? (
                <Text style={styles.label}>{input.label}</Text>
              ) : null}
              <TextInput
                placeholderTextColor={'#808080'}
                placeholder={input.placeholder}
                keyboardType={input.keyboardType}
                style={[
                  styles.inputContent,
                  input.multiline ? { minHeight: 180 } : {},
                ]}
                maxLength={input.maxLength}
                autoFocus={index === 0}
                value={inputStates[index]}
                onChangeText={text => {
                  const newInputStates = [...inputStates];
                  newInputStates[index] = text;
                  setInputStates(newInputStates);
                }}
                onSubmitEditing={props.onSubmit}
                multiline={input.multiline}
                textAlignVertical={'top'}
              />
            </View>
          );
        })}
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          console.log('updateProfileData ');
          inputData.inputs.forEach((input, index) => {
            console.log('dispatching action');
            console.log(input.inputKey, inputStates[index]);
            props.updateProfileData(input.inputKey, inputStates[index]);
            if (props.navigation.canGoBack()) {
              props.navigation.pop();
            }
          });
        }}
      >
        <Text style={[styles.buttonText]}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    paddingBottom: 200,
  },
  pickersView: {
    paddingHorizontal: 40,
    paddingTop: 50,
  },
  title: {
    color: '#808080',
  },
  inputContent: {
    fontFamily: 'Avenir-Book',
    fontSize: 20,
    color: '#000',
    width: '100%',
  },
  profileRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    marginBottom: 20,
  },
  moreIcon: {
    color: '#d6d7da',
  },
  profileItemContainer: {
    justifyContent: 'center',
    minHeight: 40,
  },
  profileItemText: {
    fontFamily: 'Avenir-Book',
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
  },
  profileItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    minHeight: 40,
    paddingBottom: 10,
  },
  profileItemNameView: {
    justifyContent: 'center',
    width: '40%',
    alignItems: 'flex-start',
  },
  profileItemValueView: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
  },
  profileItemValueText: {
    fontFamily: 'Avenir-Book',
    fontSize: 14,
    fontWeight: '800',
    color: '#808080',
    paddingRight: 10,
  },
  profileItemDefaultValueText: {
    fontFamily: 'Avenir-Book',
    fontSize: 14,
    fontWeight: '800',
    color: '#808080',
    paddingRight: 10,
  },
  titleView: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  screenTitleView: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  screenTitleText: {
    fontFamily: 'Avenir-Book',
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
  },
  imagePickerContainer: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#006aff',
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    // backgroundColor: 'red'
  },
  inputView: {
    borderWidth: 2,
    borderColor: '#f2f2f2',
    minHeight: 55,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '80%',
    flexDirection: 'row',
    minHeight: 250,
  },
  buttonText: {
    fontFamily: 'Avenir-Book',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#000',
    width: '80%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5, // iOS
    elevation: 3, // Android
    shadowOffset: { width: 0, height: 0 },
  },
  label: {
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    color: '#808080',
    fontWeight: '600',
    marginBottom: 10,
  },
});

export default compose(
  connect(
    state => ({
      firstName: state.profile.firstName,
      lastName: state.profile.lastName,
      email: state.profile.email,
      phone: state.profile.phone,
      summary: state.profile.summary,
    }),
    dispatch => ({
      updateProfileData: (...args) => dispatch(updateProfileData(...args)),
    }),
  ),
)(InputScreen);
