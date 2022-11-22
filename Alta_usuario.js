import React, { Component } from 'react';
import { View, Text,TextInput, Button, Alert, StyleSheet } from 'react-native';

import { validate, res } from "react-email-validator";
import Spinner from 'react-native-loading-spinner-overlay';

export default class Alta_usuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      nombre:"",
      correo:"",
      contrasena:"",
    };
  }

  render() {
    var _this = this;
    const btnComprobarCorreo = () => {
      validate(this.state.correo);
      if(res){
        btnCrearCuenta();
      }else{
        Alert.alert( "Correo no valido", "Ingrese uno correcto");
      }

    }

    const btnCrearCuenta = () => {
      this.setState({spinner:true})
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText)
          _this.setState({spinner:false})
          if(xhttp.responseText!=0){

            if(xhttp.responseText!=2){
              Alert.alert( "Cuenta creada");
              _this.props.navigation.navigate("Productos",{"Nombre":_this.state.nombre,"Correo":_this.state.correo});
            }else{
              Alert.alert( "Sesion no valida", "Correo utilizado anteriormente" );
            }
          }else{
            Alert.alert( "Error inesperado", "Vuelva a intentarlo" );
          }
        }
      };
      xhttp.open("GET", "https://demonsweb.000webhostapp.com/tiendapp_altaCuenta.php?Nombre="+this.state.nombre+"&Correo="+this.state.correo+"&Contrasena="+this.state.contrasena, true);
      xhttp.send(); 
    }

    return (
      <View style={styles.contenedor}>
        <Text> Alta_usuario </Text>
        <Spinner
          visible={this.state.spinner}
          textContent={'Cargando...'}
          textStyle={styles.spinnerTextStyle}
        />
        <TextInput style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#fff"
          onChangeText={nombre => this.setState({nombre})}
        />
        <TextInput style={styles.input}
          placeholder="Correo"
          placeholderTextColor="#fff"
          onChangeText={correo => this.setState({correo})}
        />
        <TextInput style={styles.input}
          placeholder="Contrasena"
          placeholderTextColor="#fff"
          secureTextEntry={true}
          onChangeText={contrasena => this.setState({contrasena})}
        />
        <View style={{margin: 15, height: 40}}>
            <Button 
              title="Crear cuenta" 
              onPress={btnComprobarCorreo}
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