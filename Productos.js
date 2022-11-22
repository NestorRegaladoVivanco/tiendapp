import React, { Component } from 'react';
import { View, Text, FlatList,Button, TouchableOpacity, Image, StyleSheet } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

export default class Productos extends Component {
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
                //console.log(xhttp.responseText);
                _this.setState({spinner:false})
                var datos=JSON.parse(xhttp.responseText);
                _this.setState({datosServer:datos});

            }
        };
        
        xhttp.open("GET", "https://demonsweb.000webhostapp.com/tiendapp_mostrarProductos.php", true);
        xhttp.send(); 
  }

  render() {
    const getIteam=(correoDelUsuario,numeroCelda,nombreDelPrducto,precioDelPrducto,fotoDelPrducto)=>{
      console.log(numeroCelda);
      //Ir a la siguiente ventana con variables
      this.props.navigation.navigate("Realizar_pedido",{"Correo":correoDelUsuario,"id":numeroCelda,"Nombre":nombreDelPrducto,"Precio":precioDelPrducto,"Foto":fotoDelPrducto})
    }
    //creacion de la celda
    const celda=({item})=>{
      return(
      <View style = {{margin:10,borderWidth:1, borderColor: '#FF4E7D', backgroundColor:'#B684D7'}}>
        <TouchableOpacity onPress={()=>getIteam(this.props.route.params.Correo,item.id,item.Nombre,item.Precio,item.Foto)}>
          <View style = {{margin:10}}>
            <Text style={{color: '#FFF'}}>
              Nombre: {item.Nombre}
            </Text>
            <Text style={{color: '#FFF'}}>
              Precio: {item.Precio}
            </Text>
            <Image 
              style={styles.producto}
              source={{uri:item.Foto}} 
            />
          </View>
        </TouchableOpacity>
      </View>
      )
    }
    const btnMisPedidos = () => {
      this.props.navigation.navigate("Pedidos_usuario",{"Correo":this.props.route.params.Correo});
    };

    return (
      <View style={styles.contenedor}>
        <Text> Productos </Text>
        <Spinner
          visible={this.state.spinner}
          textContent={'Cargando...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Text style={{color: '#FFF'}}> 
          Bienvenido: {this.props.route.params.Nombre} 
        </Text>
        <View style={{margin: 15, height: 40}}>
          <Button 
            title="Mis pedidos" 
            onPress={btnMisPedidos}
            color="#FF4E7D"
          />
        </View>
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
  producto:{
    marginLeft:10,
    width:300,
    height:400,
    resizeMode: 'contain'
  },
  spinnerTextStyle: {
    color: '#FFF'
  },

})