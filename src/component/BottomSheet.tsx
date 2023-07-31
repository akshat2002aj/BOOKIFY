import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Alert
} from 'react-native';
import React from 'react';

import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';

type Props = {
  isVisibel: boolean;
  setIsVisible: any;
  setImage: any;
  setImageData:any;
};

const BottomSheet = (props: Props) => {
  const [hasCameraPermission, setCameraPermission] = React.useState(false);
  const [hasFilePermission, setFilePermission] = React.useState(false);

  React.useEffect(()=>{
    requestCameraPermission();
  },[])

  React.useEffect(()=>{
    requestFilePermission();
  },[])

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'BOOKIFY App Camera Permission',
          message:
            'BOOKIGY App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setCameraPermission(true);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestFilePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'BOOKIFY App File Permission',
          message:
            'BOOKIGY App needs access to your library ' +
            'so you can take to library.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setFilePermission(true);
      } else {
        console.log('File permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const takePhotoFromCamera = () => {
    if(hasCameraPermission){
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7,
          }).then(image => {
            
            console.log(image)
            props.setImage(image.path);
            props.setIsVisible(false);
            props.setImageData(image)
          });
    }else{
        Alert.alert(
            'Camera Alert',
            'Allow camera permission from settings, so that you can take awesome pictures. ',
        );
    }
  };

  const choosePhotoFromLibrary = () => {
    if(hasFilePermission){
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7,
          }).then(image => {
            console.log(image)
              props.setImage(image.path);
              props.setIsVisible(false);
              props.setImageData(image)
          });
    }else{
        Alert.alert(
            'Photos and Videos Alert',
            'Allow photos and videos permission from settings, so that you can pick awesome pictures. ',
        );
    }
  };

  return (
    <Modal isVisible={props.isVisibel} hasBackdrop={true} style={{margin: 0}}>
      <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
        </View>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={takePhotoFromCamera}>
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={choosePhotoFromLibrary}>
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => {
            props.setIsVisible(false);
          }}>
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    color: '#000',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#AD40AF',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
