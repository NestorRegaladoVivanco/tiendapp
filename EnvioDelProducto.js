import React, { Component } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

import MapView,{Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Spinner from 'react-native-loading-spinner-overlay';
import {GOOGLE_MAPS_KEY} from '@env';

export default class EnvioDelProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
        spinner: false,        
        paquete : (this.props.route.params.Direccion).split(","),

        origin:{    latitude:20.6566852,
                    longitude: -103.3257217},        
        destination:{   latitude: 20.6566852,
                        longitude: -103.3257217,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04 },
        Vendedor:'',
    };
  }

  render() {
    this.state.destination.latitude=parseFloat(this.state.paquete[0]);
    this.state.destination.longitude=parseFloat(this.state.paquete[1]);
    
    const btnProductoEntregado = () => {
        let _this = this;
        this.setState({spinner:true})
        var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              console.log(xhttp.responseText);
              _this.setState({spinner:false})
              if(xhttp.responseText!="0"){
                Alert.alert( "Esperemos que disfrute de su producto :)");
              }else{
                Alert.alert( "Error","Vuelva a intentarlo");
              }
            }
          };
          xhttp.open("GET", "https://demonsweb.000webhostapp.com/tiendapp_realzarElPedido.php?id="+this.props.route.params.idPedido, true);
          xhttp.send(); 
        }

    return (
      <View style={styles.contenedor}>
        <Text> EnvioDelProducto </Text>
        <Spinner
          visible={this.state.spinner}
          textContent={'Cargando...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Text style={{color: '#FFF'}}>
          idPedido: {this.props.route.params.idPedido}
        </Text>
        <Text style={{color: '#FFF'}}>
          Correo: {this.props.route.params.Correo}
        </Text>
        <Text style={{color: '#FFF'}}>
          ProductosId: {this.props.route.params.ProductoId}
        </Text>
        <Text style={{color: '#FFF'}}>
          Repartidor: {this.props.route.params.Vendedor}
        </Text>
        <Text style={{color: '#FFF'}}>
          Direccion: {this.props.route.params.Direccion}
        </Text>
        <MapView style={styles.map}
           initialRegion={{ 
            latitude:20.6566852 , 
            longitude: -103.3257217,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          
        }}>
        <Marker 
          coordinate={{latitude:  this.state.origin.latitude, 
                      longitude:  this.state.origin.longitude}}
          pinColor="blue"
          />
          <Marker 
          coordinate={{latitude:  this.state.destination.latitude, 
                      longitude:  this.state.destination.longitude}}
          pinColor="orange"
          />
          <MapViewDirections
              origin={this.state.origin}
              destination={this.state.destination}
              apikey={GOOGLE_MAPS_KEY}
              strokeWidth={3}
              strokeColor="red"
          />
        </MapView>
        <View style={{marginTop:20}}>
          <Button 
            title="Me a llegado mi producto" 
            onPress={btnProductoEntregado}
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
    producto:{
      width:'50%',
      height:'20%',
      resizeMode: 'contain'
    },
    map:{
      marginTop:20,
      width:360,
      height:360,
      resizeMode: 'contain',
      position:"relative",
    },
    spinnerTextStyle: {
      color: '#FFF'
    },
})