import * as React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { PROFILE_ITEMS_INPUTS, PROFILE_ITEMS_METADATA } from '../constants';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateProfileData } from '../redux/profile/reducer';
import { useEffect } from 'react';
import { useState } from 'react';


const EDIT_ICON_SIZE = 25;
const PROFILE_IMAGE_SIZE = 150;

const ProfileItem = props => (
    <TouchableOpacity
      style={[styles.profileRow]}
      onPress={props.onPress}
    >
      <View style={styles.titleView}>
      <Text style={[styles.title, props.titleStyle]}>
          {props.title}
        </Text>
      </View>
      <View style={styles.profileItemRow}>
        <View style={styles.profileItemNameView}>
            <Text style={styles.profileItemText}>
              {props.value}
            </Text>
        </View>
        <View style={styles.profileItemValueView}>
            <Icon name="chevron-right" size={25} style={styles.moreIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );

const ProfileScreen = (props) => {

  useEffect(() => {
    console.log('use effect called');
    console.log(props.profileImageUri);
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
            props.updateProfileData('profileImageUri', profileImageUri);
          }
        });
        // this.saveSettings();
      };

    const navigateToInputScreen = (key) => {
      props.navigation.navigate('Input', {
        key
      });
    };

    const navigateToImageScreen = (key) => {
      props.navigation.navigate('Image');
    };

    return (
        <View>
            <View style={styles.screenTitleView}>
                <Text style={styles.screenTitleText}>
                    Edit Profile
                </Text>
            </View>
            <View style={styles.profileImageView}>
                <TouchableOpacity
                    onPress={navigateToImageScreen}
                    style={styles.profileImageContainer}
                >
                  <TouchableOpacity onPress={pickImage} style={[styles.editIconContainer, props.profileImageUri ? {}: {borderColor: '#006aff', borderWidth: 1}]}>
                      <Icon name="pencil" size={EDIT_ICON_SIZE} color='#006aff' />
                  </TouchableOpacity>
                    {props.profileImageUri ? (
                      <Image
                          style={styles.profileImage}
                          source={{uri: props.profileImageUri}}
                      />
                    ) : (
                      <View style={[styles.imagePickerContainer]}>
                          <Icon name="user" size={100} style={{color: '#fff'}} />
                      </View>
                    )}
                  
                    {/* <EditIcon /> */}
                    
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                contentContainerStyle={styles.settingsContainer}
                style={styles.settings}
            >
                <View style={styles.pickersView}>
                    <ProfileItem
                        value={`${props.firstName} ${props.lastName}`}
                        title="Name"
                        onPress={() => {
                          navigateToInputScreen(PROFILE_ITEMS_METADATA['name'].key);
                        }}
                    />
                    <ProfileItem
                        value={props.phone}
                        title={'Phone'}
                        onPress={() => {
                          navigateToInputScreen(PROFILE_ITEMS_METADATA['phone'].key);
                        }}
                    />
                    <ProfileItem
                        value={props.email}
                        title={'Email'}
                        onPress={() => {
                          navigateToInputScreen(PROFILE_ITEMS_METADATA['email'].key);
                        }}
                    />
                    <ProfileItem
                        value={props.summary}
                        title={'Tell us about yourself'}
                        onPress={() => {
                          navigateToInputScreen(PROFILE_ITEMS_METADATA['summary'].key);
                        }}
                    />
                </View>
            </ScrollView>
      </View>
    );  
  }

  const styles = StyleSheet.create({
    settings: {
      marginTop: 30
    },
    settingsContainer: {
      paddingBottom: 500
    },
    pickersView: {
      paddingHorizontal: 40,
      paddingTop: 50
    },
    title: {
      color: '#808080',
    },
    input: {
      fontFamily: 'Avenir-Book',
      fontSize: 38,
      color: '#000',
      width: '100%'
    },
    profileRow: {
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      marginBottom: 20
    },
    moreIcon: {
      color: "#d6d7da",
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
      paddingBottom: 10
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
      alignSelf: 'center'
    },
    profileItemValueText: {
      fontFamily: 'Avenir-Book',
      fontSize: 14,
      fontWeight: '800',
      color: '#808080',
      paddingRight: 10
    },
    profileItemDefaultValueText: {
      fontFamily: 'Avenir-Book',
      fontSize: 14,
      fontWeight: '800',
      color: '#808080',
      paddingRight: 10
    },
    titleView: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    screenTitleView: {
        marginTop: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenTitleText: {
        fontFamily: 'Avenir-Book',
      fontSize: 30,
      fontWeight: '800',
      color: '#006aff',
    },
    imagePickerContainer: {
        width: PROFILE_IMAGE_SIZE,
        height: PROFILE_IMAGE_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#006aff',
        overflow: 'hidden',
        borderRadius: 75,
        borderWidth: 4,
        borderColor: '#006aff'
      },
      profileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginTop: 10,
        // backgroundColor: 'red'
      },
      profileImageView: {
          marginTop: 10,
          justifyContent: 'center',
        alignItems: 'center',
      },
      editIconContainer: {
        marginBottom: -EDIT_ICON_SIZE- (5 * 3),
        marginLeft: PROFILE_IMAGE_SIZE - (EDIT_ICON_SIZE * 2),
        alignItems: 'center',
        justifyContent: 'center',
        width: EDIT_ICON_SIZE + 10,
        height: EDIT_ICON_SIZE + 10,
        borderRadius: EDIT_ICON_SIZE + 5,
        backgroundColor: 'white',
        zIndex: 4,
      },
      profileImage: {
        width: PROFILE_IMAGE_SIZE,
        height: PROFILE_IMAGE_SIZE,
        borderRadius: PROFILE_IMAGE_SIZE,
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
        profileImageUri: state.profile.profileImageUri
      }),
      dispatch => ({
        updateProfileData: (...args) => dispatch(updateProfileData(...args)),
      }),
    )
  )(ProfileScreen);