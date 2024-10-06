/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { COLORS } from '../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop2 from '../../../../../components/BarTop2';

const teamMembers = [
    { id: '1', name: 'Rodrigo Silva (você)', role: 'Proprietário', avatar: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Letícia de Souza', role: 'Gerente', avatar: 'https://via.placeholder.com/150' },
    // Adicione mais membros aqui para testar o scroll
  ];
  
  const TeamScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <View style={{height:50}}>
        <BarTop2
          titulo="Sua equipe"
          backColor={COLORS.primary}
          foreColor={'#000000'}
          onBackPress={() => navigation.goBack()}
        />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Sua equipe</Text>
            <Text style={styles.subtitle}>
              Aqui estão todos os funcionários registrados na sua equipe no momento.
            </Text>
          </View>
  
          {teamMembers.map((item) => (
            <View key={item.id} style={styles.memberContainer}>
              <View style={styles.memberInfo}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <Text style={styles.memberName}>{item.name}</Text>
              </View>
              <View style={styles.roleContainer}>
                <Text style={styles.memberRole}>{item.role}</Text>
              </View>
            </View>
          ))}
  
          <TouchableOpacity style={styles.inviteButton}>
            <Icon name="add-outline" size={20} color="#000" />
            <Text style={styles.inviteButtonText}>Convidar Colaboradores</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };
  
  export default TeamScreen;
