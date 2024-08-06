/* eslint-disable prettier/prettier */
import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import BarTop2 from "../../../../../components/BarTop2";
import { COLORS } from "../../../../../constants";
import styles from './styles';
import { Text, TouchableOpacity, View } from "react-native";


const menuItems = [
    { name: 'Nova Despesa', screen: 'NewExpense' },
    { name: 'Cancelar Despesa', screen: 'CancelExpense' },
    { name: 'Categorias', screen: 'Categorias' },
    { name: 'Liquidar despesa', screen: 'LiquidateExpense' },
    { name: 'Consultar', screen: 'ConsultExpense' },
    { name: 'Relatório', screen: 'RelatorioDesabilitar', disabled: true },
];

const Exits = ({navigation}) => {
    return (
        <View style={styles.container}>
            <BarTop2
            titulo={'Menu'}
            backColor={COLORS.primary}
            foreColor={COLORS.black}
            routeMailer={''}
            routeCalculator={''}
            style={{height: 50}}
            />
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) =>(
                    <TouchableOpacity
                    key={index}
                    style={[styles.menuItem, item.disabled && styles.menuItemDisabled]}
                    onPress={() => !item.disabled && navigation.navigate(item.screen)}
                    disabled={item.disabled}
                    >
                        <Text style={[styles.menuText, item.disabled && styles.menuTextDisabled]}>
                            {item.name}
                        </Text>
                        <Icon name="chevron-forward-outline" size={20} color={item.disabled ? COLORS.gray :COLORS.black} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default Exits;