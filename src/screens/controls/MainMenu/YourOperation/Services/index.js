/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import BarTop2 from '../../../../../components/BarTop2';
import styles from './styles';
import { COLORS } from '../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

// Importação correta dos ícones
import IconProduct from '../../../../../assets/images/svg/Service/ProductIcon.svg';
import IconService from '../../../../../assets/images/svg/Service/ProductIcon.svg';
import IconCategories from '../../../../../assets/images/svg/Service/CategoryIcon.svg';
import IconBudget from '../../../../../assets/images/svg/Service/BugetsIcon.svg';
import IconSchedule from '../../../../../assets/images/svg/Service/AgendIcon.svg';
import IconWorkOrder from '../../../../../assets/images/svg/Service/OrderServiceIcon.svg';
import IconPMOC from '../../../../../assets/images/svg/Service/PMOCIcon.svg';
import IconReports from '../../../../../assets/images/svg/Service/ReportIcon.svg';

const ServicesMenu = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);


  const menuItems = [
    { title: 'Produtos', screen: 'AddProductScreen', description: 'Consulte ou cadastre um novo produto', icon: <IconProduct width={40} height={40} /> },
    { title: 'Serviços', screen: 'RegisteredServices', description: 'Consulte ou cadastre um novo serviço', icon: <IconService width={40} height={40} /> },
    { title: 'Categorias', screen: '', description: 'Veja ou cadastre categorias de serviço', icon: <IconCategories width={40} height={40} />, action: () => setIsModalVisible(true) }, // Chama o modal
    { title: 'Orçamento', screen: 'Budget', description: 'Faça um orçamento de um serviço', icon: <IconBudget width={40} height={40} /> },
    { title: 'Agendar serviço', screen: 'ScheduleService', description: 'Agende um serviço para um membro da sua equipe', icon: <IconSchedule width={40} height={40} /> },
    { title: 'Ordem de Serviço', screen: 'WorkOrder', description: 'Gerencie ou inclua ordens de serviço', icon: <IconWorkOrder width={40} height={40} /> },
    { title: 'PMOC', screen: 'PMOC', description: 'Plano de Manutenção, Operação e Controle', icon: <IconPMOC width={40} height={40} /> },
    { title: 'Relatórios', screen: 'Reports', description: 'Veja os relatórios de suas saídas', icon: <IconReports width={40} height={40} /> },
  ];

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.barTop}>
        <BarTop2
          titulo={'Produtos e Serviços'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      <Text style={styles.headerText}>Gerencie os serviços que seu negócio opera.</Text>

      {/* Menu de ícones */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              if (item.action) {
                item.action();
              } else {
                navigation.navigate(item.screen);
              }
            }}
          >
            {item.icon}
            <Text style={styles.menuItemTitle}>{item.title}</Text>
            <Text style={styles.menuItemDescription}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal de seleção */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.modalCloseButton}>
              <Icon name="close" size={24} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Selecione uma opção abaixo:</Text>

            <TouchableOpacity style={styles.modalButtonYellow} onPress={() => {
              closeModal();
              navigation.navigate('AddCategory');
            }}>
              <Text style={styles.modalButtonText}>Produtos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButtonWhite} onPress={() => {
              closeModal();
              navigation.navigate('AddCategoryService');
            }}>
              <Text style={styles.modalButtonText}>Serviços</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Botão de Nova Venda */}
      <TouchableOpacity style={styles.newSaleButton} onPress={() => navigation.navigate('NewSale')}>
        <Text style={styles.newSaleButtonText}> <Icon name="add" size={24} color="black" /> Nova venda</Text>
        <Text style={styles.newSaleButtonSubText}>Registre uma nova venda</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ServicesMenu;
