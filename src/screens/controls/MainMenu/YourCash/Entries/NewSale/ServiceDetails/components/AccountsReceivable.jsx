/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import PixIcon from "../../../../../../../../assets/images/svg/iconPix.svg";
import { COLORS } from '../../../../../../../../constants';
import DateTimePicker from '@react-native-community/datetimepicker';

const AccountsReceivable = ({ route, navigation }) => {
    // Recebendo produtos e serviços
    const { services: receivedServices = [], products: receivedProducts = [] } = route.params;

    // Estado para controlar produtos e serviços
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [discountType, setDiscountType] = useState('%');
    const [discount, setDiscount] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('Fiado');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [paymentDate, setPaymentDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [additionalCosts, setAdditionalCosts] = useState('');


    const [currentDate, setCurrentDate] = useState('');

    // Filtrar e separar produtos de serviços
    useEffect(() => {
        const produtosFiltrados = [];
        const servicosFiltrados = [];

        receivedServices.forEach(item => {
            if (item.categoria && item.categoria === 'Serviços') {
                servicosFiltrados.push(item);
            } else {
                produtosFiltrados.push(item);
            }
        });

        setProducts(produtosFiltrados);
        setServices(servicosFiltrados);
    }, [receivedServices]);

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
    ];

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
      // Reseta o carrinho, produtos, serviços, etc.
      resetCart();  // Método que limpa o estado do carrinho
    
      // Fecha o modal e navega para a tela de nova venda
      setIsModalVisible(false);
      navigation.navigate('NewRegisteredSale', { resetCart: true });
    };
    
    // Adiciona uma função que reseta o carrinho
const resetCart = () => {
  setProducts([]);
  setServices([]);
};
    
    const handleConfirm = () => {
        setIsModalVisible(true);
    };

    const showDatePickerModal = () => {
        setShowDatePicker(true);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || paymentDate;
        setShowDatePicker(Platform.OS === 'ios');
        setPaymentDate(currentDate);
    };
    const handleAddProduct = () => {
      navigation.navigate('NewRegisteredSale'); // Substitua com a navegação ou função que desejar.
    };
    

    return (
        <ScrollView style={styles.containerBase}>
            <Text style={styles.title}>Detalhes da venda</Text>

            {/* Data do pagamento */}
            <View style={styles.dateContainer}>
                <TouchableOpacity onPress={showDatePickerModal} style={styles.datePicker}>
                    <Text style={styles.dateText}>
                        {`Data do pagamento: ${paymentDate.toLocaleDateString('pt-BR')}`}
                    </Text>
                    <Icon name="calendar" size={24} color={COLORS.lightGray} />
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={paymentDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
            </View>

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

            {/* Exibe os serviços separadamente */}
            {services.length > 0 && (
                <>
                    <Text style={styles.sectionTitle}>Serviços</Text>
                    <View style={styles.cartSection}>
                        {services.map((service, index) => (
                            <View key={index} style={styles.cartItem}>
                                <Image source={{ uri: service.imagem }} style={styles.productImage} />
                                <View style={styles.containerServiço}>
                                    <Text style={styles.cartItemTitle}>{service.nome}</Text>
                                    <Text style={styles.cartItemSubtitle}>
                                        Unid. de medida:{'\n'}{service.unidade_medida || 'Por manutenção'}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </>
            )}


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
                    value={price.toFixed(2)}
                    onChangeText={text => setPrice(parseFloat(text))}
                    placeholder="Preço de venda (R$)"
                    />
            </View>


            <TextInput
    style={styles.additionalCostsInput}
    placeholder="Adicionar gastos envolvidos se houver (R$) - Opcional"
    keyboardType="numeric"
    value={additionalCosts}
    onChangeText={setAdditionalCosts}
/>
    {/* Exibe os produtos separadamente */}
    {products.length > 0 && (
        <>
            <Text style={styles.sectionTitle}>Produtos</Text>
            <View style={styles.cartContainer}>
                {products.map((product, index) => (
                    <View key={index} style={styles.productDetail}>
                        <Image source={{ uri: product.imagem }} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productText}>{product.nome}</Text>
                            <Text style={styles.productAmount}>Quantidade: {product.amount}</Text>
                        </View>
                        <Text style={styles.productTotal}>
                            R$ {product.total.toFixed(2)}
                        </Text>
                    </View>
                ))}
            </View>
        </>
    )}

{/* Botão de Adicionar Produtos */}
<TouchableOpacity style={styles.addProductButton} onPress={handleAddProduct}>
    <Icon name="add" size={24} color="black" />
    <Text style={styles.addProductButtonText}>Adicionar produtos do estoque</Text>
</TouchableOpacity>

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

{/* Forma de Pagamento */}
<Text style={styles.paymentTitle}>Forma de Pagamento</Text>
<View style={styles.paymentSection2}>
    <TouchableOpacity
        style={[styles.paymentButton2, selectedPayment === 'Fiado' && styles.paymentButtonSelected]}
        onPress={() => setSelectedPayment('Fiado')}
    >
        <Text style={styles.paymentButtonText2}>Fiado</Text>
    </TouchableOpacity>
    <TouchableOpacity
        style={[styles.paymentButton2, selectedPayment === 'Boleto' && styles.paymentButtonSelected]}
        onPress={() => setSelectedPayment('Boleto')}
    >
        <Text style={styles.paymentButtonText2}>Boleto</Text>
    </TouchableOpacity>
</View>


            {/* Botão de Concluir Venda */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.concludeButton} onPress={handleConfirm}>
                    <Icon name="checkmark-circle" size={24} color="black" />
                    <Text style={styles.concludeButtonText}>Concluir esta venda</Text>
                </TouchableOpacity>
            </View>

            {/* Modal de confirmação */}
            <Modal transparent={true} animationType="slide" visible={isModalVisible} onRequestClose={handleCloseModal}>
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

export default AccountsReceivable;
