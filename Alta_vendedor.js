import React, { Component } from 'react';
import { View, Text,TextInput, Button, StyleSheet, Alert } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

export default class Alta_vendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      nombre:"",
      foto:"",
    };
  }

  render() {
    var _this=this;
    
    const btnAltaVendedor = () => {
      this.setState({spinner:true})
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText)
          _this.setState({spinner:false})
          if( xhttp.responseText=='1'){
            Alert.alert( "Alta vendedor", "Recarge para ver los cambios");
          }else{
            Alert.alert( "Error", "Vuelva a intentarlo");
          }
        }
      };
      xhttp.open("GET", "https://demonsweb.000webhostapp.com/tiendapp_altaVendedor.php?Nombre="+this.state.nombre+"&Foto="+this.state.foto, true);
      xhttp.send(); 
    }

    return (
      <View style={styles.contenedor}>
        <Text> Alta_vendedor </Text>
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
          placeholder="Foto"
          placeholderTextColor="#fff"
          onChangeText={foto => this.setState({foto})}
        />
        <View style={{margin: 50, height: 40}}>
          <Button title="Dar de alta" 
            onPress={btnAltaVendedor}
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