/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles'; // Importando o arquivo de estilo separado
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../../../assets/images/svg/logo 2.svg';
import Forward from '../../../assets/images/svg/initial/forward.svg' 
import PresentationImage from '../../../assets/images/svg/mocap.svg';

const LoginScreen = ({ navigation }) => {

    const handleNext = () => {
        navigation.navigate("InitialRegistration");
    }
  return (
    <View style={styles.container}>
      <Logo width={120} height={55} style={styles.logo} />
      <PresentationImage width="100%" height={300} style={styles.presentationImage} />

      <Text style={styles.description}>
        Seu negócio na palma da sua mão. {'\n'}
        É mamão com açúcar!
      </Text>

      <TouchableOpacity style={styles.createAccountButton} onPress={handleNext}>
        <Icon name="add" size={23} color="#fff" />
        <Text style={styles.createAccountButtonText}>Criar uma conta rapidinho</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleNext}>
      <Forward />
        <Text style={styles.loginButtonText}>Já tenho uma conta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton}>
      <Icon name="link" size={23} color="#000" />
        <Text style={styles.linkButtonText}>Recebi um link com meu cadastro</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;