import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet  } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

export default class Subir_producto extends Component {
  constructor(props) {
    super(props);
    this.state = {
        spinner: false,
        nombre:"",
        precio:"",
        foto:"",
    };
  }

  render() {
    var _this=this;

    const btnSubirProducto = () => {
      this.setState({spinner:true})
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText)
          _this.setState({spinner:false})
        }
      };
      if(xhttp.responseText != "0"){
        Alert.alert( "Alta realizada", "Recarga para actualizar");
      }else{
        Alert.alert( "Error subir producto", "Vuelta a intentar");
      }
      xhttp.open("GET", "https://demonsweb.000webhostapp.com/tiendapp_altaProducto.php?Nombre="+this.state.nombre+"&Precio="+this.state.precio+"&Foto="+this.state.foto, true);
      xhttp.send(); 
    }

    return (
      <View style={styles.contenedor}>
        <Text> Subir_producto </Text>
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
          placeholder="Precio"
          placeholderTextColor="#fff"
          keyboardType='numeric'
          onChangeText={precio => this.setState({precio})}
        />
        <TextInput style={styles.input}
          placeholder="Foto"
          placeholderTextColor="#fff"
          onChangeText={foto => this.setState({foto})}
        />
        <View style={{margin: 15, height: 40}}> 
          <Button title="Subir producto" 
            onPress={btnSubirProducto}
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