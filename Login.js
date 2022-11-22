import React, { Component } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      correo:"",
      contrasena:"",
    };
  }

  render() {
    const btnLogin = () => {
      this.setState({spinner:true})
      var _this = this;

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              // Typical action to be performed when the document is ready:
              console.log(xhttp.responseText);
              _this.setState({spinner:false})
              if(xhttp.responseText != "0"){
                  let recibe= xhttp.responseText;
                  let datos=recibe.split(",");
                  
                  if(datos[3]=='a'){
                    cambiaPantalla("MenuAdmin",{"Nombre":datos[1]})
                  } else{
                    cambiaPantalla("Productos",{"Nombre":datos[1],"Correo":datos[2]})
                  }
              }
              else{
                Alert.alert( "Sesion no valida", "Usuario no reconocido");
              }
          }
      };
      xhttp.open("GET", "https://demonsweb.000webhostapp.com/tiendapp_login.php?Correo="+this.state.correo+"&Contrasena="+this.state.contrasena, true);
      xhttp.send(); 
    }
  const btnCrear = () => {
    cambiaPantalla("Alta_usuario",)
  };

  const cambiaPantalla = (actualizar,datos) => {
    this.props.navigation.navigate(actualizar,datos)
}

    return (
      <View style={styles.contenedor}>
        <Text> Login </Text>
        <Spinner
          visible={this.state.spinner}
          textContent={'Cargando...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Image style={styles.imagenUsuario} source={require("./image/login.png")}/>
        <TextInput style={styles.input}
          placeholder="Correo"
          placeholderTextColor="#fff"
          onChangeText={correo => this.setState({correo})}
        />
        <TextInput style={styles.input}
          placeholder="Constrasena"
          placeholderTextColor="#fff"
          secureTextEntry={true}
          onChangeText={contrasena => this.setState({contrasena})}
          
        />
        <View style={{margin: 15, height: 40}}>
            <Button title="Entrar" 
              onPress={btnLogin}
              color="#FF4E7D"
            />
        </View>
        <View style={{margin: 15, height: 40}}>
          <Button title="Crear una cuenta" 
            onPress={btnCrear}
            color="#FF4E7D"
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenedor:{
    flex: 1,
    padding: 24,
    backgroundColor: '#664C77',
  },
  imagenUsuario:{
    width:200,
    height:300,
    resizeMode:"contain",
    marginLeft:80,
  },
  input: {
      margin: 15,
      height: 40,
      borderColor: '#FF4E7D',
      borderWidth: 1
  },
  spinnerTextStyle: {
    color: '#FFF'
  },

})
