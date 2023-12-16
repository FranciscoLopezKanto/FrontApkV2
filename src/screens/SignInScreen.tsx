import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ImageBackground, Picker } from 'react-native';
import axios from 'axios';

const showPasswordIcon = require('../public/MostrarContra.png');
const backgroundImage = require('../public/fondo.png');

const RegisterScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (
    name: string,
    email: string,
    rol: string,
    password: string
  ) => {
    setError(false);

    if (password.length < 6) {
      setError(true);
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/v1/auth/register`, {
        name: name,
        email: email,
        password: password,
        role: rol,
      });
      console.log(response);
      setTimeout(() => {
        navigation.navigate('Login' as never);
      }, 1000);
      console.log('usuario registrado');
    } catch (e: any) {
      setError(true);
      console.error('Error al registrar usuario:', e);
      setErrorMessage('Ocurrió un error al registrar usuario.');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={require('../public/icon.png')} style={styles.logo} />
        <View style={styles.container2}>
          <Text style={[styles.title, styles.titleWithOutline]}>Bienvenido Piletero</Text>
          <TextInput
            placeholder="Pile User"
            value={username}
            onChangeText={(text: string) => setUsername(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Pile Email"
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            style={styles.input}
          />
          {/* Agregado: Lista seleccionable de roles */}
          <Picker
            selectedValue={rol}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setRol(itemValue)}
          >
            <Picker.Item label="Selecciona un rol" value="" />
            <Picker.Item label="Programador" value="programador" />
            <Picker.Item label="Rol2" value="rol2" />
            <Picker.Item label="Rol3" value="rol3" />
          </Picker>
          {/* Fin de la lista seleccionable de roles */}
          <View style={styles.passwordInputContainer}>
            <View style={styles.passwordInput}>
              <TextInput
                placeholder="Pile Contra"
                value={password}
                onChangeText={(text: string) => setPassword(text)}
                secureTextEntry={!showPassword}
                style={styles.passwordTextInput}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.passwordVisibilityButton}
              >
                <Image source={showPasswordIcon} style={styles.passwordVisibilityIcon} />
              </TouchableOpacity>
            </View>
          </View>
          {error && <Text style={styles.errorText}>{errorMessage}</Text>}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleRegister(username, email, rol, password)}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
            ¿Ya tienes una cuenta? Inicia Sesión.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderRadius: 5,
  },
  titleWithOutline: {
    textShadowColor: 'rgba(255, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  title: {
    fontSize: 24,
    padding: 16,
    color: '#000',
  },
  input: {
    backgroundColor: '#ffffff',
    width: 240,
    marginBottom: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  picker: {
    height: 40,
    width: 240,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 16,
  },
  link: {
    marginTop: 16,
    color: 'blue',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0052cc',
    borderRadius: 15,
    alignItems: 'center',
    height: 40,
    width: 150,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 240,
    marginBottom: 15,
  },
  passwordInput: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    padding: 1,
  },
  passwordTextInput: {
    flex: 1,
    padding: 0,
  },
  passwordVisibilityButton: {
    padding: 5,
  },
  passwordVisibilityIcon: {
    width: 25,
    height: 25,
  },
});

export default RegisterScreen;
