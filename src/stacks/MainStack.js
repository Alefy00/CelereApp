/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Preload from '../screens/controls/Preload';

import Expiring from '../screens/controls/Expiring';
import CashFlow from '../screens/controls/CashFlow';
import StockInfo from '../screens/controls/MainMenu/YourOperation/Stock';
import AddProductScreen from '../screens/controls/MainMenu/YourOperation/Stock/AddProductScreen';
import AddCategory from '../screens/controls/MainMenu/YourOperation/Stock/AddCategory';
import IncludeCategoryProducts from '../screens/controls/MainMenu/YourOperation/Stock/IncludeCategoryProducts';

import MainMenu from '../screens/controls/MainMenu';

import MainTab from './MainTab';
import Start from '../screens/controls/Start';
import Entries from '../screens/controls/MainMenu/YourCash/Entries';
import Exits from '../screens/controls/MainMenu/YourCash/Exits';
import NewRegisteredSale from '../screens/controls/MainMenu/YourCash/Entries/NewSale/NewRegisteredSale';

import LoginScreen from '../screens/Start/Login';
import InitialRegistration from '../screens/Start/InitialRegistration';
import InitialCode from '../screens/Start/InitialCode';
import InitialBranch from '../screens/Start/InitialBranch';
import VarejoScreen from '../screens/Start/InitialBranch/VarejoScreen';
import AlimentosScreen from '../screens/Start/InitialBranch/AlimentosScreen';
import ServicosScreen from '../screens/Start/InitialBranch/ServicosScreen';
import FabricacaoScreen from '../screens/Start/InitialBranch/FabricacaoScreen';


import OpeningBalance from '../screens/InitialData/OpeningBalance';

import MonthlySalesForecast from '../screens/InitialData/SalesForecast/MonthlySalesForecast';
import HowBusiness from '../screens/InitialData/SalesForecast/HowBusiness';
import DistributionSales from '../screens/InitialData/SalesForecast/DistributionSales';
import SaleDetails from '../screens/controls/MainMenu/YourCash/Entries/NewSale/SalesDetails';
import ServiceDetails from '../screens/controls/MainMenu/YourCash/Entries/NewSale/ServiceDetails';
import CustomerSupplierScreen from '../screens/InitialData/CustomerSupplierScreen';
import SingleSale from '../screens/controls/MainMenu/YourCash/Entries/NewSale/SingleSale';
import IncludeSupplier from '../screens/InitialData/CustomerSupplierScreen/IncludeSupplier';
import IncludeClient from '../screens/InitialData/CustomerSupplierScreen/IncludeClient';
import ConsultClient from '../screens/InitialData/CustomerSupplierScreen/ConsultClient';
import ConsultSupplier from '../screens/InitialData/CustomerSupplierScreen/ConsultSupplier';

import CashBalance from '../screens/controls/MainMenu/YourCash/CashBalance';

import CancelSale from '../screens/controls/MainMenu/YourCash/Entries/CancelSale';
import SettleCredit from '../screens/controls/MainMenu/YourCash/Entries/SettleCredit';
import Contribution from '../screens/controls/MainMenu/YourCash/Entries/Contribution';
import Loan from '../screens/controls/MainMenu/YourCash/Entries/Loan';
import Others from '../screens/controls/MainMenu/YourCash/Entries/Others';
import Report from '../screens/controls/MainMenu/YourCash/Entries/Reports';
import NewExpense from '../screens/controls/MainMenu/YourCash/Exits/NewExpense';
import AccountsPayable from '../screens/controls/MainMenu/YourCash/Exits/NewExpense/components/AccountsPayable';
import CategoriesScreen from '../screens/controls/MainMenu/YourCash/Exits/Categories';
import LiquidateExpense from '../screens/controls/MainMenu/YourCash/Exits/SettleExpense';
import Winning from '../screens/controls/CashFlow';
import BusinessInfoScreen from '../screens/Start/InitialBusiness';
import ConsultExpense from '../screens/controls/MainMenu/YourCash/Exits/ConsultExpense';
import ServicesMenu from '../screens/controls/MainMenu/YourOperation/Services';
import AddService from '../screens/controls/MainMenu/YourOperation/Services/ServiceRegistration';
import RegisteredServices from '../screens/controls/MainMenu/YourOperation/Services/RegisteredServices';
import ExpenseDetails from '../screens/controls/MainMenu/YourCash/Exits/ExpenseDetails';
import TaxRegime from '../screens/InitialData/TaxRegime';
import CelerePay from '../screens/InitialData/CelerePay';
import MaxTransparency from '../screens/InitialData/CelerePay/MaxTransparency';
import CelerePayRegister from '../screens/InitialData/CelerePay/CelerePayRegister';
import CelerePayBank from '../screens/InitialData/CelerePay/CelerePayBank';
import CelerePayConfirmation from '../screens/controls/MainMenu/YourCash/Entries/NewSale/CelerePayConfirmation';

import Budget from '../screens/controls/MainMenu/YourOperation/ReceiptsBudgets/Budgets';
import Receipts from '../screens/controls/MainMenu/YourOperation/ReceiptsBudgets/Receipts';
import NewBudgets from '../screens/controls/MainMenu/YourOperation/ReceiptsBudgets/Newbudgets';
import DetailsBudgets from '../screens/controls/MainMenu/YourOperation/ReceiptsBudgets/DetailsBudgets';
import AddCategoryService from '../screens/controls/MainMenu/YourOperation/Services/Category';
import IncludeCategoriesExpense from '../screens/controls/MainMenu/YourCash/Exits/IncludeCategoriesExpense';


import TeamScreen from '../screens/controls/MainMenu/YourControls/Users';
import ReceiptScreen from '../screens/controls/MainMenu/YourCash/Entries/SettleCredit/components/ReceiptScreen';
import BudgetsScreen from '../screens/controls/MainMenu/YourOperation/ReceiptsBudgets/components/BudgetsScreen';
import LiquidateNow from '../screens/controls/MainMenu/YourCash/Entries/NewSale/SalesDetails/components/LiquidateNow';
import PaymentScreen from '../screens/InitialData/CelerePay/Payment/PaymentScreen';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Preload" component={Preload} options={{title: ''}} />

    <Stack.Screen name="Expiring" component={Expiring} />
    <Stack.Screen name="CashFlow" component={CashFlow} />
    <Stack.Screen name="StockInfo" component={StockInfo} />
    <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
    <Stack.Screen name="AddCategory" component={AddCategory} />
    <Stack.Screen name="IncludeCategoryProducts" component={IncludeCategoryProducts} />
    <Stack.Screen name="AddCategoryService" component={AddCategoryService} />

    <Stack.Screen name="MainMenu" component={MainMenu} />


    <Stack.Screen name="MainTab" component={MainTab} />

    <Stack.Screen name="Start" component={Start} />
    <Stack.Screen name="Entries" component={Entries} />
    <Stack.Screen name="Exits" component={Exits} />
    <Stack.Screen name="Winning" component={Winning} />
    <Stack.Screen name="ServicesMenu" component={ServicesMenu} />
    <Stack.Screen name="RegisteredServices" component={RegisteredServices} />

    <Stack.Screen name="SingleSale" component={SingleSale} />
    <Stack.Screen name="NewRegisteredSale" component={NewRegisteredSale} />
    <Stack.Screen name="SaleDetails" component={SaleDetails} />
    <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
    <Stack.Screen name="CustomerSupplierScreen" component={CustomerSupplierScreen} />
    <Stack.Screen name="IncludeSupplier" component={IncludeSupplier} />
    <Stack.Screen name="IncludeClient" component={IncludeClient} />
    <Stack.Screen name="ConsultClient" component={ConsultClient} />
    <Stack.Screen name="ConsultSupplier" component={ConsultSupplier} />
    <Stack.Screen name="IncludeCategoriesExpense" component={IncludeCategoriesExpense} />

    <Stack.Screen name="CancelSale" component={CancelSale} />
    <Stack.Screen name="SettleCredit" component={SettleCredit} />
    <Stack.Screen name="Contribution" component={Contribution} />
    <Stack.Screen name="Loan" component={Loan} />
    <Stack.Screen name="Others" component={Others} />
    <Stack.Screen name="Report" component={Report} />

    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="InitialRegistration" component={InitialRegistration} />
    <Stack.Screen name="InitialCode" component={InitialCode} />
    <Stack.Screen name="InitialBranch" component={InitialBranch} />
    <Stack.Screen name="BusinessInfoScreen" component={BusinessInfoScreen} />
    <Stack.Screen name="VarejoScreen" component={VarejoScreen} />
    <Stack.Screen name="AlimentosScreen" component={AlimentosScreen} />
    <Stack.Screen name="ServicosScreen" component={ServicosScreen} />
    <Stack.Screen name="FabricacaoScreen" component={FabricacaoScreen} />

    <Stack.Screen name="OpeningBalance" component={OpeningBalance} />
    <Stack.Screen name="MonthlySalesForecast" component={MonthlySalesForecast} />
    <Stack.Screen name="HowBusiness" component={HowBusiness} />
    <Stack.Screen name="DistributionSales" component={DistributionSales} />
    <Stack.Screen name="CashBalance" component={CashBalance} />
    <Stack.Screen name="TaxRegime" component={TaxRegime} />
    <Stack.Screen name="CelerePay" component={CelerePay} />
    <Stack.Screen name="MaxTransparency" component={MaxTransparency} />
    <Stack.Screen name="CelerePayRegister" component={CelerePayRegister} />
    <Stack.Screen name="CelerePayBank" component={CelerePayBank} />
    <Stack.Screen name="CelerePayConfirmation" component={CelerePayConfirmation} />
    <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    <Stack.Screen name="Budget" component={Budget} />
    <Stack.Screen name="Receipts" component={Receipts} />
    <Stack.Screen name="NewBudgets" component={NewBudgets} />
    <Stack.Screen name="DetailsBudgets" component={DetailsBudgets} />
    
    <Stack.Screen name="NewExpense" component={NewExpense} />
    <Stack.Screen name="AccountsPayable" component={AccountsPayable} />
   
    <Stack.Screen name="LiquidateExpense" component={LiquidateExpense} />

    <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
    <Stack.Screen name="ConsultExpense" component={ConsultExpense} />
    <Stack.Screen name="ExpenseDetails" component={ExpenseDetails} />
    <Stack.Screen name="AddService" component={AddService} />
    <Stack.Screen name="TeamScreen" component={TeamScreen} />
    <Stack.Screen name="ReceiptScreen" component={ReceiptScreen} />
    <Stack.Screen name="BudgetsScreen" component={BudgetsScreen} />


  </Stack.Navigator>
);
