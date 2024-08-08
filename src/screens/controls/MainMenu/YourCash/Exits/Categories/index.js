/* eslint-disable prettier/prettier */
import COLORS from '../../../../../../constants';
import BarTop2 from '../../../../../../components/BarTop2';
import styles from './styles';
import { Text, TextInput, View } from 'react-native';

const Categories = ({navigation}) => {
    return (
        <View style={styles.container}>
            <BarTop2
            titulo={'Saídas'}
            backColor={COLORS.primary}
            foreColor={COLORS.black}
            routeCalculator={''}
            routeMailer={''}
            />
            <Text style={styles.label}>CCategorias</Text>
            <TextInput
            placeholder='Categoria'
            style={styles.input}
            />
        </View>
        
    )
}
