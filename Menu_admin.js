import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default class Menu_admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const btnSubirProducto = () => {
      cambiaPantalla("Subir_producto",)
    };

    const btnAltaVendedor = () => {
      cambiaPantalla("Lista_vendedores",)
    };

    const btnListaPedidos = () => {
      cambiaPantalla("Lista_pedidos",)
    };
  
    const cambiaPantalla = (actualizar,datos) => {
      this.props.navigation.navigate(actualizar,datos)
  }

    return (
      <View style={styles.contenedor}>
        <Text> Menu_admin </Text>
        <View style={{margin: 50, height: 40}}>
            <Button title="Subir producto" 
              onPress={btnSubirProducto}
              color="#FF4E7D"
            />
        </View>
        <View style={{margin: 50, height: 40}}>
            <Button title="Lista Vendedores" 
              onPress={btnAltaVendedor}
              color="#FF4E7D"
            />
        </View>
        <View style={{margin: 50, height: 40}}>
            <Button title="Lista de pedidos" 
              onPress={btnListaPedidos}
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


})