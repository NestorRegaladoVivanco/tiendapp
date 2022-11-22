import React, { Component } from 'react';
import { View, Text, Button, Alert, StyleSheet} from 'react-native';

import MapView,{Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import SelectDropdown from 'react-native-select-dropdown'
import Spinner from 'react-native-loading-spinner-overlay';
import {GOOGLE_MAPS_KEY} from '@env';

export default class Gestion_pedido extends Component {
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

  componentDidMount(){  
    let _this = this;
    this.setState({spinner:true})
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                console.log(xhttp.responseText);
                _this.setState({spinner:false})
                var datos=JSON.parse(xhttp.responseText);
                _this.setState({datosServer:datos});
            }
        };
        
        xhttp.open("GET", "https://demonsweb.000webhostapp.com/tiendapp_mostrarRepartidor.php", true);
        xhttp.send(); 
  }

  render() {
    this.state.destination.latitude=parseFloat(this.state.paquete[0]);
    this.state.destination.longitude=parseFloat(this.state.paquete[1]);
    const Vendedores = this.state.datosServer

    const btnGestionarPedido = (opcion) => {
      let _this = this;
      this.setState({spinner:true})
      var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            _this.setState({spinner:false})
            if(xhttp.responseText!="0"){
              if(opcion=='A'){
                Alert.alert( "Se a Aceptado");
              }else{
                Alert.alert( "Se a Denegado");
              }
            }else{
              Alert.alert( "Error","Vuelva a intentarlo");
            }
          }
        };
        xhttp.open("GET", "https://demonsweb.000webhostapp.com/tiendapp_gestionarPedido.php?id="+this.props.route.params.idPedido+"&Estus="+opcion+"&Vendedor="+(opcion=='A'?this.state.Vendedor:'-'), true);
        xhttp.send(); 
      }

    return (
      <View style={styles.contenedor}>
        <Text> 
          Gestion_pedido 
        </Text>
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
          Direccion: {this.props.route.params.Direccion}
        </Text>
        <SelectDropdown
                data={Vendedores}
                onSelect={(selectedItem, index)=>{
                  console.log(selectedItem, index)
                  this.state.Vendedor = selectedItem; 
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                defaultButtonText={'Seleccione un vendedor'}
                buttonStyle={styles.dropdown2BtnStyle}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
              /> 
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
        <View style={{ flexDirection:"row", marginTop:20 }}>
          <View style={{height: 40, marginLeft:50, marginRight:20}}>
            <Button 
              title="Aceptar pedido" 
              onPress={() =>btnGestionarPedido('A')}
              color="#FF4E7D"
            />
          </View>
          <View >
            <Button 
              title="Denegar pedido" 
              onPress={() =>btnGestionarPedido('D')}
              color="#FF4E7D"
            />
          </View>
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
    dropdown2BtnStyle: {
      marginTop:20,
      width: '100%',
      height: 40,
      backgroundColor: '#FF4E7D',
      borderRadius: 8,
    },
    dropdown2BtnTxtStyle: {
      color: '#FFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    dropdown2DropdownStyle: {
      backgroundColor: '#FF4E7D',
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
    dropdown2RowStyle: {backgroundColor: '#FF4E7D', borderBottomColor: '#C5C5C5'},
    dropdown2RowTxtStyle: {
      color: '#FFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    spinnerTextStyle: {
      color: '#FFF'
    },
})