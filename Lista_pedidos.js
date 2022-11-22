import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

export default class Lista_pedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      datosServer:"",
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
        
        xhttp.open("GET", "https://demonsweb.000webhostapp.com/tiendapp_mostarPedidosPendientes.php", true);
        xhttp.send(); 
  }

  render() {
    const getIteam=(idPedido,Correo,ProductoId,Direccion,Vendedor,Estatus)=>{
      console.log(idPedido);
      //Ir a la siguiente ventana con variables
      this.props.navigation.navigate("Gestion_pedido",{"idPedido":idPedido,"Correo":Correo,"ProductoId":ProductoId,"Direccion":Direccion,"Vendedor":Vendedor,"Estatus":Estatus})
    }
    //creacion de la celda
    const celda=({item})=>{
      return(
      <View style = {{margin:10,borderWidth:1, borderColor: '#FF4E7D', backgroundColor:'#B684D7'}}>
        <TouchableOpacity onPress={()=>getIteam(item.id,item.Correo,item.ProductosId,item.Direccion,item.Vendedor,item.Estus)}>
          <View style = {{margin:10}}>
            <Text style={{color: '#FFF'}}>
              idPedido: {item.id}
            </Text>
            <Text style={{color: '#FFF'}}>
              Correo: {item.Correo}
            </Text>
            <Text style={{color: '#FFF'}}>
              ProductosId: {item.ProductosId}
            </Text>
            <Text style={{color: '#FFF'}}>
              Direccion: {item.Direccion}
            </Text>
            <Text style={{color: '#FFF'}}>
              Vendedor: {item.Vendedor}
            </Text>
            <Text style={{color: '#FFF'}}>
              Estus: {item.Estus}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      )
    }

    return (
      <View style={styles.contenedor}>
        <Text> Lista_pedidos </Text>
        <Spinner
          visible={this.state.spinner}
          textContent={'Cargando...'}
          textStyle={styles.spinnerTextStyle}
        />
        <FlatList
          data={this.state.datosServer}
          renderItem={celda}
          keyExtractor={(item,index)=>index.toString()}
        />
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
  spinnerTextStyle: {
    color: '#FFF'
  },

})