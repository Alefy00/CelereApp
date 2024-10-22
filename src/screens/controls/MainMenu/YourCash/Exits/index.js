/* eslint-disable prettier/prettier */
import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import BarTop2 from "../../../../../components/BarTop2";
import { COLORS } from "../../../../../constants";
import styles from './styles';
import IconConsultar from "../../../../../assets/images/svg/Exits/IconConsultar.svg";
import IconCadastrar from "../../../../../assets/images/svg/Exits/IconConsultar.svg";
import IconCategorias from "../../../../../assets/images/svg/Exits/IconCategorias.svg";
import IconLiquidar from "../../../../../assets/images/svg/Exits/IconLiquidar.svg";
import IconLiquidarParcial from "../../../../../assets/images/svg/Exits/IconLiquidarParcial.svg";
import IconRelatorio from "../../../../../assets/images/svg/Exits/IconRelatorios.svg";

const menuItems = [
    { name: 'Consultar', screen: 'ConsultExpense', icon: IconConsultar, description: 'Consulte suas despesas' },
    { name: 'Cadastrar', screen: 'NewExpense', icon: IconCadastrar, description: 'Cadastre uma nova despesa' },
    { name: 'Categorias', screen: 'CategoriesScreen', icon: IconCategorias, description: 'Cadastre e gerencie suas categorias de despesa' },
    { name: 'Liquidar', screen: 'LiquidateExpense', icon: IconLiquidar, description: 'Liquidar valor total de uma despesa' },
    { name: 'Relatórios', screen: 'RelatorioDesabilitar', icon: IconRelatorio, description: 'Veja os relatórios de suas saídas', disabled: true },
];

const Exits = ({navigation}) => {
    return (
        <View style={styles.container}>
            {/* Barra Superior */}
            <BarTop2
                titulo={'Voltar'}
                backColor={COLORS.primary}
                foreColor={COLORS.black}
                routeMailer={''}
                routeCalculator={''}
                style={{ height: 50 }}
            />

            {/* Cabeçalho do Menu */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Suas saídas</Text>
                <Text style={styles.headerSubtitle}>Gerencie as saídas financeiras do seu negócio.</Text>
            </View>

            {/* Menu Container */}
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.menuItem, item.disabled && styles.menuItemDisabled]}
                        onPress={() => !item.disabled && navigation.navigate(item.screen)}
                        disabled={item.disabled}
                    >
                        <item.icon width={50} height={50} style={styles.menuIcon} />
                        <Text style={[styles.menuText, item.disabled && styles.menuTextDisabled]}>
                            {item.name}
                        </Text>
                        <Text style={styles.menuDescription}>{item.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default Exits;