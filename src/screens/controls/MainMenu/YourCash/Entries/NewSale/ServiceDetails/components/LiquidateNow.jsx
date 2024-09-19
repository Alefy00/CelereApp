/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import PixIcon from "../../../../../../../../assets/images/svg/iconPix.svg";
import { COLORS } from '../../../../../../../../constants';

const LiquidateNow = ({ service, navigation, totalPrice }) => {
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(service.preco_venda || 0);
    const [discountType, setDiscountType] = useState('%');
    const [discount, setDiscount] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('PIX');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [paymentMethod2, setPaymentMethod2] = useState('CelerePay');
    const [paymentType, setPaymentType] = useState('À vista');
    const [installments, setInstallments] = useState(1);  // Default to 1 (À vista)
    const [taxRate, setTaxRate] = useState(0.01);  // 1% for now
    const [liquidValue, setLiquidValue] = useState(price);  // Inicializamos com `price`
    const [isPaymentDropdownVisible, setIsPaymentDropdownVisible] = useState(false);

     // Obtém a data atual
    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        });
        setCurrentDate(formattedDate);
    }, []);
    
    const clients = [
      { id: 1, name: 'Cliente 1' },
      { id: 2, name: 'Cliente 2' },
      { id: 3, name: 'Cliente 3' },
      { id: 4, name: 'Cliente 4' },
      { id: 5, name: 'Cliente 5' },
      { id: 6, name: 'Cliente 6' },
    ]; // Clientes fictícios
  
    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };
  
    const selectClient = (client) => {
      setSelectedClient(client);
      setDropdownVisible(false); // Fecha o dropdown após a seleção
    };
  
    const navigateToAddClient = () => {
      navigation.navigate('IncludeClient');
    };

    const handleCloseModal = () => {
      setIsModalVisible(false);
    };
  
    const handleNewRegistered = () => {
      setIsModalVisible(false);
      navigation.navigate('NewRegisteredSale');
    };
    const handleConfirm = () => {
      if (paymentMethod2 === 'CelerePay') {
        // Se o método de pagamento for CélerePay, navega para a tela de confirmação
        navigation.navigate('CelerePayConfirmation', {
          totalPrice: price * quantity,
          onConfirm: () => setIsModalVisible(true),  // Exibe o modal após confirmação
        });
      } else {
        // Caso contrário, exibe o modal diretamente
        setIsModalVisible(true);
      }
    };
    const paymentOptions = ['À vista', '2x', '3x', '4x'];

  const togglePaymentDropdown = () => {
    setIsPaymentDropdownVisible(!isPaymentDropdownVisible);
  };

  const selectPaymentOption = (option) => {
    setPaymentType(option);
    setInstallments(option === 'À vista' ? 1 : parseInt(option));  // Define as parcelas com base na escolha
    setIsPaymentDropdownVisible(false);
  };
   // UseCallback to memoize the calculateLiquidValue function
   const calculateLiquidValue = useCallback(() => {
    const calculatedTotalPrice = price * quantity;
    const taxAmount = calculatedTotalPrice * taxRate;
    setLiquidValue(calculatedTotalPrice - taxAmount);
  }, [price, quantity, taxRate]);
  
  useEffect(() => {
    calculateLiquidValue();
  }, [price, quantity, taxRate, calculateLiquidValue]);
  
  
    return (
      <ScrollView style={styles.containerBase}>
      <Text style={styles.title}>Detalhes da venda</Text>
      <Text style={styles.dateText2}>
        Data da Venda: <Text style={styles.boldText}>Hoje, {currentDate}</Text>
      </Text>
        {/* Campo para associar cliente */}
        <View style={styles.clientContainer}>
          <TouchableOpacity style={styles.clientPicker} onPress={toggleDropdown}>
            <Text style={styles.clientText}>
              {selectedClient ? selectedClient.name : "Associar a um cliente..."}
            </Text>
            <Icon name={isDropdownVisible ? "arrow-up" : "arrow-down"} size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addClientButton} onPress={navigateToAddClient}>
            <Icon name="add" size={30} color="black" />
          </TouchableOpacity>
        </View>
  
        {/* Lista de opções que aparece logo abaixo do campo com scroll interno */}
        {isDropdownVisible && (
          <View style={[styles.dropdownContainer, { maxHeight: 150 }]}>
            <ScrollView nestedScrollEnabled={true}>
              {clients.map((client) => (
                <TouchableOpacity
                  key={client.id}
                  style={styles.dropdownItem}
                  onPress={() => selectClient(client)}
                >
                  <Text style={styles.dropdownItemText}>{client.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
  
        {/* Carrinho - Exibindo o serviço selecionado */}
        <Text style={styles.Carrinho}>Carrinho</Text>
        <View style={styles.cartSection}>
          <View style={styles.cartItem}>
            <Image source={{ uri: service.imagem }} style={styles.productImage} />
            <View style={styles.containerServiço}>
              <Text style={styles.cartItemTitle}>{service.nome}</Text>
              <Text style={styles.cartItemSubtitle}>Unid. de medida{'\n'}{service.unidade_medida || 'Por manutenção'}</Text>
            </View>
          </View>
        </View>
  
        {/* Quantidade e Preço */}
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Qtd.</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={() => setQuantity(prev => Math.max(prev - 1, 1))} style={styles.quantBottom}>
              <Icon name="remove" size={25} color="black" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(prev => prev + 1)} style={styles.quantBottom}>
              <Icon name="add" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.priceInput}
            keyboardType="numeric"
            value={(price ? price.toFixed(2) : '0.00')}  // Garantimos que price seja numérico
            onChangeText={text => setPrice(parseFloat(text) || 0)}  // Garante que o valor sempre seja um número
            placeholder="Preço de venda (R$)"
          />

        </View>
  
        <TextInput
          style={styles.additionalCostsInput}
          placeholder="Adicionar gastos envolvidos se houver (R$) - Opcional"
          keyboardType="numeric"
        />
        {/* Descontos */}
        <Text style={styles.Desconto}>Descontos</Text>
        <View style={styles.discountSection}>
          <TouchableOpacity
            style={[styles.discountButton, discountType === '%' && styles.activeDiscountButton]}
            onPress={() => setDiscountType('%')}
          >
            <Text style={styles.discountButtonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.discountButton, discountType === 'R$' && styles.activeDiscountButton]}
            onPress={() => setDiscountType('R$')}
          >
            <Text style={styles.discountButtonText}>R$</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.discountInput}
            placeholder={`Inserir Desconto em ${discountType}`}
            keyboardType="numeric"
            value={discount}
            onChangeText={setDiscount}
          />
        </View>
    {/* Botão de Adicionar Produtos */}
      <TouchableOpacity style={styles.addProductButton}>
        <Icon name="add" size={24} color="black" />
        <Text style={styles.addProductButtonText}>Adicionar produtos do estoque</Text>
      </TouchableOpacity>
  
  
        {/* Forma de Pagamento */}
        <Text style={styles.paymentTitle}>Forma de Pagamento</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.paymentSection}>
            <TouchableOpacity
              style={[styles.paymentButton, selectedPayment === 'PIX' && styles.paymentButtonSelected]}
              onPress={() => setSelectedPayment('PIX')}
            >
              <PixIcon name="cash-outline" size={20} color={selectedPayment === 'PIX' ? 'black' : 'grey'} />
              <Text style={styles.paymentButtonText}>PIX</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.paymentButton, selectedPayment === 'Dinheiro' && styles.paymentButtonSelected]}
              onPress={() => setSelectedPayment('Dinheiro')}
            >
              <Icon name="cash" size={20} color={selectedPayment === 'Dinheiro' ? 'black' : 'grey'} />
              <Text style={styles.paymentButtonText}>Dinheiro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.paymentButton, selectedPayment === 'Cartão de Crédito' && styles.paymentButtonSelected]}
              onPress={() => setSelectedPayment('Cartão de Crédito')}
            >
              <Icon name="card-outline" size={20} color={selectedPayment === 'Cartão de Crédito' ? 'black' : 'grey'} />
              <Text style={styles.paymentButtonText}>Cartão de Crédito</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.paymentButton, selectedPayment === 'Cartão de Débito' && styles.paymentButtonSelected]}
              onPress={() => setSelectedPayment('Cartão de Débito')}
            >
              <Icon name="card" size={20} color={selectedPayment === 'Cartão de Débito' ? 'black' : 'grey'} />
              <Text style={styles.paymentButtonText}>Cartão de Débito</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      {/* Botões de seleção: CélerePay e Maquininha */}
      <View style={styles.paymentSelectionContainer}>
        <TouchableOpacity
          style={[
            styles.paymentOptionButton,
            paymentMethod2 === 'CelerePay' && styles.selectedPaymentOptionButton
          ]}
          onPress={() => setPaymentMethod2('CelerePay')}
        >
          <Text style={paymentMethod2 === 'CelerePay' ? styles.selectedPaymentOptionText : styles.paymentOptionText}>
            CélerePay
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOptionButton,
            paymentMethod2 === 'Maquininha' && styles.selectedPaymentOptionButton
          ]}
          onPress={() => setPaymentMethod2('Maquininha')}
        >
          <Text style={paymentMethod2 === 'Maquininha' ? styles.selectedPaymentOptionText : styles.paymentOptionText}>
            Maquininha
          </Text>
        </TouchableOpacity>
      </View>

       {/* Seleção de tipo de pagamento */}
      <TouchableOpacity style={styles.clientPicker} onPress={togglePaymentDropdown}>
        <Text style={styles.clientText}>{paymentType}</Text>
        <Icon name={isPaymentDropdownVisible ? "arrow-up" : "arrow-down"} size={24} color="black" />
      </TouchableOpacity>

      {isPaymentDropdownVisible && (
        <View style={[styles.dropdownContainerPag, { maxHeight: 150 }]}>
          <ScrollView nestedScrollEnabled={true}>
            {paymentOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => selectPaymentOption(option)}
              >
                <Text style={styles.dropdownItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Campos para mostrar Valor Bruto, Taxa, e Valor Líquido */}
      <View style={styles.valueSummaryContainer}>
        <View style={styles.valueItem}>
          <Text style={styles.valueLabel}>Valor Bruto <Icon name="alert-circle" size={18} color={COLORS.lightGray} /></Text>
          <Text style={styles.valueAmount2}>R$ {price ? (price * quantity).toFixed(2) : '0.00'}</Text> 
        </View>

        <View style={styles.valueItem}>
          <Text style={styles.valueLabel}>Taxa do cartão <Icon name="alert-circle" size={18} color={COLORS.lightGray} /></Text>
          <Text style={styles.valueAmountTaxa}>({(taxRate * 100).toFixed(0)}%) R$ {(price * quantity * taxRate).toFixed(2)}</Text>
        </View>

        <View style={styles.valueItem}>
          <Text style={styles.valueLabel}>Valor Líquido a Receber Amanhã <Icon name="alert-circle" size={18} color={COLORS.lightGray} /></Text>
          <Text style={styles.valueAmount}>R$ {liquidValue.toFixed(2)}</Text> 
        </View>
      </View>
  
        {/* Botão de Concluir Venda */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.concludeButton} onPress={handleConfirm}>
            <Icon name="checkmark-circle" size={24} color="black" />
            <Text style={styles.concludeButtonText}>Concluir esta venda</Text>
          </TouchableOpacity>
        </View>
        <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="checkmark-circle" size={100} color={COLORS.green} />
            <Text style={styles.modalText}>Sua venda foi concluída</Text>
            <TouchableOpacity style={styles.modalPrimaryButton} onPress={handleNewRegistered}>
              <Icon name="cart" size={20} color={COLORS.black} />
              <Text style={styles.modalPrimaryButtonText}>Registrar outra venda</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBackButton} onPress={handleCloseModal}>
              <Icon name="arrow-back" size={20} color={COLORS.black} />
              <Text style={styles.modalBackButtonText}>Voltar ao resumo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </ScrollView>
    );
  };

  export default LiquidateNow;
