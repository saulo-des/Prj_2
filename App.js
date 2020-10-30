import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert,BackHandler } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';



export default function App() {
  let [selectedImage, setSelectedImage] = React.useState(null);
  const Separator = () => {
    return <View style={Platform.OS === "android" ? styles.separator : null} />;
  }

  async function sair() {
    Alert.alert('Atenção', 'Você deseja sair do App?',
      [
        { text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Sim', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false });
    return true;
  }

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('É necessária permissão para acessar as imagens da câmera!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Opa, o compartilhamento não está disponível em sua plataforma`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.miniatura} />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Compartilhe esta foto</Text>
        </TouchableOpacity>
        <Separator />
        <View style={styles.ViewSair2}>
          <TouchableOpacity style={styles.ButtonSair}
            onPress={() => sair()}>
            <Ionicons name="ios-exit" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <Separator />

        <View>
          <Text style={styles.Text}>Desenvolvimento Fatec Itu</Text>
          <Text style={styles.Text}>Saulo Camargo</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require("./assets/fatec.jpg")} style={styles.logo} />
      <Text style={styles.instructions}>
        Para compartilhar uma foto do seu celular com um amigo, basta pressionar o botão abaixo!
      </Text>
      <Separator />

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>
          Escolha uma foto
        </Text>
      </TouchableOpacity>
      <Separator />
      <View style={styles.ViewSair}>
        <TouchableOpacity style={styles.ButtonSair}
          onPress={() => sair()}>
          <Ionicons name="ios-exit" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      <Separator />

      <View>
        <Text style={styles.Text}>Desenvolvimento Fatec Itu</Text>
        <Text style={styles.Text}>Saulo Camargo</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewSair: {
    flexDirection: 'row-reverse',
    left: 68,
  },
  ViewSair2: {
    flexDirection: 'row-reverse',
    left: 90,
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  miniatura: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  ButtonSair: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 4,
    marginLeft: 10
  },

  Text: {
    marginTop: 150,
    fontSize: 12,
    color: "#9E9E9E",
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center"
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
