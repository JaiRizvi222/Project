import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  const discardPhoto = () => {
    setPhoto(null);
  };

  const identifyPhoto = () => {
      console.log(photo.uri);
      setPhoto(null);

  };

  if (!hasCameraPermission) {
    return <Text style={styles.noPermission}>Permission for camera not granted. Please change this in settings.</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
  <FontAwesome5 name="dragon" size={24} color = '#FFFCAF'  style={styles.icon} />
  <Text style={styles.title}>Lunar Cam</Text>
  <FontAwesome5 name="dragon" size={24} color = '#FFFCAF' style={styles.icon} />
</View>

      {photo ?
        <View style={styles.camButtonContainer}>
          <Image style={styles.previewImage} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
          <View style={styles.info}>
        <Text style={styles.infoText}>Click the Magnifying Glass button to learn more about your item. Click the Redo button to take another photo. </Text>
      </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={discardPhoto}>
                <View style={styles.adjacentButtonLeft}>
                    <FontAwesome5 name="redo" size={28} color = '#FFFCAF' style={styles.icon}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={identifyPhoto}>
                <View style={styles.adjacentButtonRight}>
                    <FontAwesome5 name="search" size={28} color = '#FFFCAF' style={styles.icon}/>
                </View>
            </TouchableOpacity>

          </View>
        </View>
        :
        <Camera style={styles.camera} ref={cameraRef}>
          
        </Camera>
      }
      {photo ? null :
      <View style={styles.info}>
        <Text style={styles.infoText}>Click the button below to take a photo of the Lunar New Year item you want to learn more about. </Text>
      </View>
      }
      {photo ? null :
        <View style={styles.camButtonContainer}>
            <TouchableOpacity onPress={takePic}>
                <View style={styles.rectangularButton}>
                      <AntDesign name="camera" size={39} color="#FFFCAF" />
                </View>
            </TouchableOpacity>
        </View>
}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CE2029',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  rectangularButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    backgroundColor: '#EE3C46',
    height: 80,
    paddingHorizontal: 10,
    borderRadius: 14,
    marginTop: 40,
    paddingBottom: 7,
  },  
  adjacentButtonLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 170,
    backgroundColor: '#EE3C46',
    height: 80,
    paddingHorizontal: 10,
    borderRadius: 14,
    paddingBottom: 7,
    paddingTop: 1,
    marginLeft: 20,
  },  
  adjacentButtonRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 170,
    backgroundColor: '#EE3C46',
    height: 80,
    paddingHorizontal: 10,
    borderRadius: 14,
    paddingBottom: 7,
    marginLeft: 10,
  },  
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#FFE17C',
  },
  camera: {
    width: '90%',
    height: '50%',
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#FFFCAF',
  },
  previewImage: {
    width: 350,
    height: 383,
    marginBottom: 20,
    borderRadius: 20,
    marginLeft: 12,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#FFFCAF',
  },
  preview: {
    flex: 1,
    borderRadius: 1,
    overflow: 'hidden',
  },
  camButtonContainer: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '100%',
    // backgroundColor: '#EE3C46',
    // height: 80,
    // width: '90%',
    // paddingHorizontal: 10,
    // borderRadius: 14,
    // marginTop: 40,
    // paddingBottom: 7,

    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 80,
    width: '90%',
    paddingHorizontal: 10,
    borderRadius: 14,
    marginTop: 40,
    paddingBottom: 7,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textTransform: 'uppercase',
  },
  discardButton: {
    backgroundColor: '#CE2029',
  },
  identifyButton: {
    backgroundColor: '#CE2029',
  },
  buttonTextDisabled: {
    color: '#A9A9A9',
  },
  info: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
  },
  infoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFE17C',
    marginRight: 12,
    marginLeft: 12,
  }
});
