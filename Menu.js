import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
//npm install @react-navigation/native @react-navigation/native-stack
//npm install react-native-screens react-native-safe-area-context

import LOGIN  from "./Login";
import ALTA_USUARIO from "./Alta_usuario";
import MENU_ADMIN from "./Menu_admin";
import PRODUCTOS from "./Productos"
import SUBIR_PRODUCTO from "./Subir_producto";
import ALTA_VENDEDOR from "./Alta_vendedor";
import LISTA_PEDIDOS from "./Lista_pedidos";
import REALIZAR_PEDIDO from "./Realizar_pedido";
import GESTION_PEDIDO from "./Gestion_pedido";
import PEDIDOS_USUARIO from "./Pedidos_usuario";
import LISTA_VENDEDORES from "./Lista_vendedores";
import ENVIODELPRODUCTO from "./EnvioDelProducto";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >

        <Stack.Screen name="Login" component={LOGIN} />
        <Stack.Screen name="Alta_usuario" component={ALTA_USUARIO} />

        <Stack.Screen name="Productos" component={PRODUCTOS} />
        <Stack.Screen name="Realizar_pedido" component={REALIZAR_PEDIDO} />
        <Stack.Screen name="Pedidos_usuario" component={PEDIDOS_USUARIO} />
        <Stack.Screen name="Envio_producto" component={ENVIODELPRODUCTO} />


        <Stack.Screen name="MenuAdmin" component={MENU_ADMIN} />
        <Stack.Screen name="Subir_producto" component={SUBIR_PRODUCTO} />
        <Stack.Screen name="Lista_vendedores" component={LISTA_VENDEDORES} />
        <Stack.Screen name="Alta_vendedor" component={ALTA_VENDEDOR} />
        <Stack.Screen name="Lista_pedidos" component={LISTA_PEDIDOS} />
        <Stack.Screen name="Gestion_pedido" component={GESTION_PEDIDO} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;