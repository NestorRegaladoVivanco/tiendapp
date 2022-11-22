import React,{ Component } from 'react';
import { View, Text,Image, StyleSheet, Button, Alert } from 'react-native';

import MapView,{Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import PlacesInput from 'react-native-places-input';
import Spinner from 'react-native-loading-spinner-overlay';
import {GOOGLE_MAPS_KEY} from '@env';

export default class Realizar_pedido extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      origin:{  latitude: 20.6566852,
                longitude: -103.3257217},

    destination:{ latitude: 20.6566852,
                  longitude: -103.3257217,
                  latitudeDelta: 0.04,
                  longitudeDelta: 0.04 },
    };
  }

  render() {
    var _this=this;
    const btnRealizarPedido = () => {
      this.setState({spinner:true})
      var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            _this.setState({spinner:false})
            if(xhttp.responseText=='1'){
              Alert.alert( "Pedido realizado", "Recarge para ver los cambios");
            }else{
              Alert.alert( "Error", "Vuelva a intentarlo");
            }
          }
      };
      xhttp.open("GET", "https://demonsweb.000webhostapp.com/tiendapp_altaPedido.php?Correo="+this.props.route.params.Correo+"&id="+this.props.route.params.id+"&Direccion="+this.state.destination.latitude+","+this.state.destination.longitude, true);
      xhttp.send(); 
    }

    return (
      <View style={styles.contenedor}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Cargando...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Text style={{color: '#FFF'}}>
          Nombre: {this.props.route.params.Nombre}
        </Text>
          <Text style={{color: '#FFF'}}>
            Precio: {this.props.route.params.Precio}
          </Text>
          <Image 
            style={styles.producto}
            source={{uri:this.props.route.params.Foto}} 
        />
        <View style={{ }}>
          <PlacesInput
          googleApiKey={GOOGLE_MAPS_KEY}
          onSelect={ place =>  { direccion={latitude : place.result.geometry.location.lat,longitude : place.result.geometry.location.lng}
            this.setState({destination : direccion});
            console.log( this.state.destination.latitude +' , '+ this.state.destination.longitude);
          }} 
          placeHolder={"Destino"}

          />
        </View>
        <MapView style={styles.map}
           initialRegion={{ 
            latitude:20.6566852 , 
            longitude: -103.3257217,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          
          }}
        >
          <Marker 
          coordinate={{latitude:  this.state.origin.latitude, 
                      longitude:  this.state.origin.longitude}}
          pinColor="blue"
          />
          <Marker 
          draggable
          coordinate={{latitude:  this.state.destination.latitude, 
                      longitude:  this.state.destination.longitude}}
          pinColor="orange"
          onDragEnd={(direction)=>this.setState({destination:direction.nativeEvent.coordinate})}
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
            title="Realizar pedido" 
            onPress={btnRealizarPedido}
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
    margin:5,
    marginLeft:84,
    width:'50%',
    height:'15%',
    resizeMode: 'contain'
  },
  serch:{
    container:{ flex:0,
                position:"absolute",
                width:"100%",
                zIndex:1
    },
    listView:{backgroundColor:"white",}
  },
  map:{
    marginTop:70,
    width:360,
    height:360,
    resizeMode: 'contain',
    position:"relative",
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
})