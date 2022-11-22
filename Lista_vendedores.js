import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Image } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

export default class Lista_vendedores extends Component {
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
        
        xhttp.open("GET", "https://demonsweb.000webhostapp.com/tiendapp_mostrarVendedores.php", true);
        xhttp.send(); 
  }

  render() {
    //creacion de la celda
     //creacion de la celda
     const celda=({item})=>{
        return(
        <View style = {{margin:10,borderWidth:1, borderColor: '#FF4E7D', backgroundColor:'#B684D7'}}>
            <View style = {{margin:10}}>
              <Text style={{color: '#FFF'}}>
                Nombre: {item.Nombre}
              </Text>

              <Image 
                style={styles.foto}
                source={{uri:item.Foto}} 
              />
            </View>
        </View>
        )
      }
      const btnMisPedidos = () => {
        this.props.navigation.navigate("Alta_vendedor",);
      };
  
      return (
        <View style={styles.contenedor}>
          <Text> Lista_vendedores </Text>
          <Spinner
          visible={this.state.spinner}
          textContent={'Cargando...'}
          textStyle={styles.spinnerTextStyle}
          />
          <View style={{margin: 15, height: 40}}>
            <Button 
              title="Alta vendedor" 
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
    foto:{
      marginLeft:10,
      width:300,
      height:400,
      resizeMode: 'contain'
    },
    spinnerTextStyle: {
      color: '#FFF'
    },
  })