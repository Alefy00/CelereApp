/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Preload from '../screens/controls/Preload';

import Expiring from '../screens/controls/Expiring';
import CashFlow from '../screens/controls/CashFlow';

import MainMenu from '../screens/controls/MainMenu';
import Stock from '../screens/controls/MainMenu/YourOperation/Stock/Graph';
import Product from '../screens/controls/MainMenu/YourOperation/Stock/Product';
import NProduct from '../screens/controls/MainMenu/YourOperation/NStock/Graph/Product';

import MainTab from './MainTab';
import StockTab from './StockTab';
import NStockTab from './NStockTab';
import Start from '../screens/controls/Start';
import Entries from '../screens/controls/MainMenu/YourCash/Entries';
import Exits from '../screens/controls/MainMenu/YourCash/Exits';
import NewRegisteredSale from '../screens/controls/MainMenu/YourCash/Entries/NewSale/NewRegisteredSale';

import InitialRegistration from '../screens/Start/InitialRegistration';
import InitialCode from '../screens/Start/InitialCode';
import InitialBranch from '../screens/Start/InitialBranch';

import OpeningBalance from '../screens/InitialData/OpeningBalance';
import InitialSupplier from '../screens/InitialData/InitialSupplier';
import ExpensePage from '../screens/InitialData/ExpensePage';
import SalesReceive from '../screens/InitialData/SalesReceive';
import MonthlySalesForecast from '../screens/InitialData/SalesForecast/MonthlySalesForecast';
import HowBusiness from '../screens/InitialData/SalesForecast/HowBusiness';
import DistributionSales from '../screens/InitialData/SalesForecast/DistributionSales';
import BuyPrevision from '../screens/InitialData/BuyPrevision/AveragePurchase';
import PurchaseFrequency from '../screens/InitialData/BuyPrevision/PurchaseFrequency';
import SaleDetails from '../screens/controls/MainMenu/YourCash/Entries/NewSale/SalesDetails';
import SellOnCredit from '../screens/controls/MainMenu/YourCash/Entries/NewSale/SellOnCredit';
import LooseProduct from '../screens/controls/MainMenu/YourCash/Entries/NewSale/LooseProduct';

import CashBalance from '../screens/controls/MainMenu/YourCash/CashBalance';

import CancelSale from '../screens/controls/MainMenu/YourCash/Entries/CancelSale';
import SettleCredit from '../screens/controls/MainMenu/YourCash/Entries/SettleCredit';
import Contribution from '../screens/controls/MainMenu/YourCash/Entries/Contribution';
import Loan from '../screens/controls/MainMenu/YourCash/Entries/Loan';
import Others from '../screens/controls/MainMenu/YourCash/Entries/Others';
import Report from '../screens/controls/MainMenu/YourCash/Entries/Reports';
import NewExpense from '../screens/controls/MainMenu/YourCash/Exits/NewExpense';
import CancelExpense from '../screens/controls/MainMenu/YourCash/Exits/CancelExpense';
import LiquidateExpense from '../screens/controls/MainMenu/YourCash/Exits/SettleExpense';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Preload" component={Preload} options={{title: ''}} />

    <Stack.Screen name="Expiring" component={Expiring} />

    <Stack.Screen name="CashFlow" component={CashFlow} />

    <Stack.Screen name="MainMenu" component={MainMenu} />
    <Stack.Screen name="Stock" component={Stock} />
    {/* <Stack.Screen name="Product" component={Product} /> */}
    <Stack.Screen name="NProduct" component={NProduct} />

    <Stack.Screen name="MainTab" component={MainTab} />
    <Stack.Screen name="StockTab" component={StockTab} />
    <Stack.Screen name="NStockTab" component={NStockTab} />

    <Stack.Screen name="Start" component={Start} />
    <Stack.Screen name="Entries" component={Entries} />
    <Stack.Screen name="Exits" component={Exits} />
    <Stack.Screen name="Winning" component={Winning} />

    <Stack.Screen name="NewRegisteredSale" component={NewRegisteredSale} />
    <Stack.Screen name="SaleDetails" component={SaleDetails} />
    <Stack.Screen name="SellOnCredit" component={SellOnCredit} />
    <Stack.Screen name="LooseProduct" component={LooseProduct} />

    <Stack.Screen name="CancelSale" component={CancelSale} />
    <Stack.Screen name="SettleCredit" component={SettleCredit} />
    <Stack.Screen name="Contribution" component={Contribution} />
    <Stack.Screen name="Loan" component={Loan} />
    <Stack.Screen name="Others" component={Others} />
    <Stack.Screen name="Report" component={Report} />

    <Stack.Screen name="InitialRegistration" component={InitialRegistration} />
    <Stack.Screen name="InitialCode" component={InitialCode} />
    <Stack.Screen name="InitialBranch" component={InitialBranch} />
    <Stack.Screen name="BusinessInfoScreen" component={BusinessInfoScreen} />

    <Stack.Screen name="OpeningBalance" component={OpeningBalance} />
    <Stack.Screen name="InitialSupplier" component={InitialSupplier} />
    <Stack.Screen name="ExpensePage" component={ExpensePage} />
    <Stack.Screen name="SalesReceive" component={SalesReceive} />
    <Stack.Screen name="MonthlySalesForecast" component={MonthlySalesForecast} />
    <Stack.Screen name="HowBusiness" component={HowBusiness} />
    <Stack.Screen name="DistributionSales" component={DistributionSales} />
    <Stack.Screen name="BuyPrevision" component={BuyPrevision} />
    <Stack.Screen name="PurchaseFrequency" component={PurchaseFrequency} />
    <Stack.Screen name="CashBalance" component={CashBalance} />

    <Stack.Screen name="NewExpense" component={NewExpense} />
    <Stack.Screen name="CancelExpense" component={CancelExpense} />
    <Stack.Screen name="LiquidateExpense" component={LiquidateExpense} />
    <Stack.Screen name="ConsultExpense" component={ConsultExpense} />
  </Stack.Navigator>
);
