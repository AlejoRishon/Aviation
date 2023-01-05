/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, useState, useEffect, useContext, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  NativeModules,
  NativeEventEmitter,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  PermissionsAndroid,
  StatusBar,
  BackHandler,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import { UserContext } from './context/userContext';
import { UserDetails } from './context/userDetailsContext';
const {width, height} = Dimensions.get('window');
import NotifService from '../components/methods/notifService'
// const MrzScanner = NativeModules.RNMrzscannerlib;
// // import MrzScanner from 'react-native-mrzscannerlib';
// MrzScanner.registerWithLicenseKey(
//   '43DC619CB9444C24D6BEDA0C0F9DF5E5932D7421B0244D435A14D76F41461655C2ACC8134E3D1A8DFE6EA62107A31AA9',
// );
// const EventEmitter = new NativeEventEmitter(MrzScanner);


const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

export default function Home({navigation}) {
  const nf=useRef(null);

  const [prompt,setprompt]=useState(false);
  const [details, setdetails] = useState(null);
  const {loggedIn,setloggedIn}=useContext(UserContext)
  const {user, setUser} = useContext(UserDetails);

  const onRegister=(token)=> {
    console.log("OKOK")
    console.log('tok',token);
    //setonReg({registerToken: token.token, fcmRegistered: true});
  }

  const onNotif=(notif)=> {
    console.log('RECIEVED NOTI',notif);
  }

  const logOut=()=>{
   
  
    return  auth()
     .signOut()
       .then(() => {
        setloggedIn(false);
       });
   }
   
  useEffect(() => {
    nf.current=new NotifService(onRegister,onNotif);
    console.log(nf.current)
    //console.log('asdsd',nf.current);
    requestCameraPermission();
    // var subscription;
    // subscription = EventEmitter.addListener(
    //   'successfulScanEmittedEvent',
    //   (body) => {
    //     setdetails({
    //       surname: body.surname,
    //       'given name': body.given_names_readable,
    //       'document number': body.document_number,
    //       'issuing country': body.issuing_country,
    //       nationality: body.nationality,
    //       'date of birth': body.dob_readable,
    //       sex: body.sex,
    //       'estimated issuing date': body.est_issuing_date_readable,
    //       'expiration date': body.expiration_date_readable,
    //       'passport image': body.passportImage,
    //       'passport sign': body.signature,
    //       'passport portrait': body.portrait,
    //     });
    //     console.log('Results', body);
    //   },
    // );
    // subscription = EventEmitter.addListener(
    //   'successfulDocumentScanEmittedEvent',
    //   (body) => {
    //     console.log('doc success');
    //   },
    // );
    // subscription = EventEmitter.addListener(
    //   'scannerWasDismissedEmittedEvent',
    //   (body) => {
    //     console.log('onBackPressed' + body + 'back pressed');
    //   },
    // );
    // return () => subscription.remove();
  }, []);

  const onChange = (key, value) => {
    var detailsData = {...details};
    console.log(detailsData);

    detailsData[key] = value;
    console.log(detailsData);
    setdetails({...detailsData});
  };
  return (
    <ScrollView
      contentContainerStyle={{minHeight: Dimensions.get('window').height}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={{flexDirection:"row",justifyContent:'flex-start'}}>
          <View  style={{flex:1,justifyContent:'center'}}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: width / 15,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Aviation 
          </Text>
          </View>
          <View style={{flex:1,justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end'}}>
          <TouchableOpacity
            onPress={() => setprompt(true)}
            style={{
              width:55,height:55,borderRadius:parseInt(55/2),backgroundColor:'#d3d3d3',
              justifyContent:'center',
              alignContent:'center',
              alignItems:'center'
            }}
            >
            <Text style={{color: 'black',fontSize:28}}>
            {
             typeof user==='object' &&  user.email!=undefined && user.email.charAt(0).toUpperCase()
            }
            </Text>
          </TouchableOpacity>
          </View>
          </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{backgroundColor: 'black', height: 5, flex: 1}}></View>
          <Image
            source={require('../assets/airplane.png')}
            style={{height: 40, width: 40}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-start',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Scanner')}
            style={[styles.card, {marginRight: 10}]}>
            <Icons color="white" name="qr-code-scanner" size={50} />
            <Text style={{color: 'white'}}>Scan passport</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('GroundHandling')}
            style={styles.card}>
            <Icons color="white" name="flight-land" size={50} />
            <Text style={{color: 'white'}}>Ground Handling</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Calendar')}
          style={{position: 'absolute', top: 10, right: 10}}>
          <Icons name="calendar-month" size={50} color="#3b5998" />
        </TouchableOpacity>
        <Icons.Button
          onPress={() => {
            MrzScanner.setMaxThreads(2);
            MrzScanner.setPassportActive(true);
            MrzScanner.setScannerType(0);
            MrzScanner.toggleFlash(false);
            MrzScanner.startScanner();
          }}
          backgroundColor="#3b5998"
          name="credit-card-scan"
          size={30}
          color="white">
          <Text style={{fontSize: 15, color: 'white'}}>Scan passportsdsds</Text>
        </Icons.Button>
        {details && Object.keys(details).length > 0 && (
          <View
            style={{
              width: '90%',
              marginHorizontal: 20,
              marginBottom: 10,
              marginTop: 10,
              backgroundColor: '#002e71',
              // borderRadius: 15,
              padding: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                textAlign: 'center',
                marginBottom: 10,
              }}>
              Click to edit
            </Text>
            {Object.keys(details).map((value, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    display:
                      (value == 'passport image' ||
                        value == 'passport sign' ||
                        value == 'passport portrait') &&
                      !details['passport image']
                        ? 'none'
                        : 'flex',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      padding: 10,
                      paddingRight: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'right',
                        color: 'white',
                        fontSize: Dimensions.get('window').width / 25,
                      }}>
                      {value.toUpperCase() + ':'}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      // borderTopStartRadius: index > 0 ? 0 : 10,
                      // borderTopEndRadius: index > 0 ? 0 : 10,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      padding: 10,
                      paddingHorizontal: 10,
                    }}>
                    {(value == 'passport image' ||
                      value == 'passport sign' ||
                      value == 'passport portrait') &&
                    details['passport image'] ? (
                      <Image
                        style={{width: '100%', height: 150}}
                        resizeMode="contain"
                        source={{
                          uri: `data:image/png;base64,${details[value]}`,
                        }}
                      />
                    ) : (
                      <TextInput
                        style={{
                          fontSize: Dimensions.get('window').width / 25,
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          padding: 0,
                          paddingHorizontal: 5,
                          margin: 0,
                        }}
                        value={details[value]}
                        onChangeText={(text) => onChange(value, text)}
                      />
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View> */}
      {prompt &&
        
      <View style={{
        position:'absolute',
        width:width,
        height:(height+100),
        backgroundColor:"#40404034",
        justifyContent:'center',
        paddingHorizontal:20
      }}>
        
        <View style={{
          width:width-40,
          height:200,
          backgroundColor:'#FFF',
          padding:10
        }}>
          <Text style={{color:"#000",fontSize:25,fontWeight:'600'}}>Logout</Text>
          <Text style={{color:"#808080",fontSize:16,fontWeight:'500',marginTop:20}}>Are you sure you want to logout ?</Text>
          <View style={{marginTop:'auto',marginBottom:10,marginRight:20,flexDirection:'row',justifyContent:'flex-end'}}>
            <TouchableOpacity onPress={()=>{
              logOut();
              setprompt(false);
            }} style={{marginRight:60}}>
              <Text style={{color:"cornflowerblue",fontSize:20,fontWeight:'600'}}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              setprompt(false);
            }} style={{}}>
              <Text style={{color:"cornflowerblue",fontSize:20,fontWeight:'600'}}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#3b7dfc',
    borderRadius: 10,
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    elevation: 10,
    shadowOffset: {width: 0, height: 3},
  },
});
