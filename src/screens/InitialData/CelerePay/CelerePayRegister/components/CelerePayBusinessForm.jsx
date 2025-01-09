/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Buffer } from 'buffer';
import { Picker } from '@react-native-picker/picker';
global.Buffer = Buffer;

const CelerePayBusinessForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    business_address: {
      line1: '',
      line2: '',
      neighborhood: '',
      city: '',
      state: '',
      postal_code: '',
      country_code: 'BR',
    },
    owner: {
      first_name: '',
      last_name: '',
    },
    owner_address: {
      line1: '',
      line2: '',
      neighborhood: '',
      city: '',
      state: '',
      postal_code: '',
      country_code: 'BR',
    },
    business_name: '',
    business_phone: '',
    business_email: '',
    ein: '',
    mcc: '',
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

useEffect(() => {
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const credentials = 'zpk_prod_fLDQqil50te59vqiqsSJ7AZ9';
      const encodedCredentials = Buffer.from(`${credentials}:`).toString('base64');

      const response = await fetch('https://api.zoop.ws/v1/merchant_category_codes', {
        method: 'GET',
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      setCategories(data.items || []);
    } catch (error) {
      console.error('Erro no fetch:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  fetchCategories();
}, []);

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ScrollView style={styles.containerBase}>
      <View style={styles.container}>
        <View>
        <Text style={styles.subTitle}>Endereço da empresa</Text>
        <Picker
          selectedValue={formData.mcc}
          onValueChange={(value) => handleFieldChange('mcc', value)}>
          <Picker.Item label="Selecione uma categoria" value="" />
          {categories.map((category) => (
            <Picker.Item key={category.id} label={category.description} value={category.id} />
          ))}
        </Picker>

        <View style={styles.rowContainer}>
          <TextInput
            style={[styles.inputLargeComplemento, styles.input]}
            placeholder="Rua"
            value={formData.business_address.line1}
            onChangeText={(value) => handleInputChange('business_address', 'line1', value)}
          />
          <TextInput
            style={[styles.inputLargeComplemento, styles.input]}
            placeholder="Número"
            value={formData.business_address.line2}
            onChangeText={(value) => handleInputChange('business_address', 'line2', value)}
          />
        </View>

          <TextInput
            style={[ styles.input]}
            placeholder="Bairro"
            value={formData.business_address.neighborhood}
            onChangeText={(value) => handleInputChange('business_address', 'neighborhood', value)}
          />

        <View style={styles.rowContainer}>
          <TextInput
            style={[styles.input, styles.inputSmallRG]}
            placeholder="Cidade"
            value={formData.business_address.city}
            onChangeText={(value) => handleInputChange('business_address', 'city', value)}
          />

          <TextInput
            style={[styles.input, styles.inputSmall]}
            placeholder="Estado"
            value={formData.business_address.state}
            onChangeText={(value) => handleInputChange('business_address', 'state', value)}
          />
          <TextInput
            style={[styles.input, styles.inputSmall]}
            placeholder="CEP"
            value={formData.business_address.postal_code}
            onChangeText={(value) => handleInputChange('business_address', 'postal_code', value)}
          />
        </View>
        </View>

        <Text style={styles.subTitle}>Endereço do Proprietário</Text>
        <View>
        <View style={styles.rowContainer}>
          <TextInput
            style={[styles.inputLargeComplemento, styles.input]}
            placeholder="Nome"
            value={formData.owner.first_name}
            onChangeText={(value) => handleInputChange('owner', 'first_name', value)}
          />
          <TextInput
            style={[styles.inputLargeComplemento, styles.input]}
            placeholder="Sobrenome completo"
            value={formData.owner.last_name}
            onChangeText={(value) => handleInputChange('owner', 'last_name', value)}
          />

        </View>
        <View style={styles.rowContainer}>
          <TextInput
            style={[styles.inputLargeComplemento, styles.input]}
            placeholder="Rua"
            value={formData.owner_address.line1}
            onChangeText={(value) => handleInputChange('owner_address', 'line1', value)}
          />
          <TextInput
            style={[styles.inputLargeComplemento, styles.input]}
            placeholder="Número"
            value={formData.owner_address.line2}
            onChangeText={(value) => handleInputChange('owner_address', 'line2', value)}
          />

        </View>
        <View style={styles.rowContainer}>

          <TextInput
            style={[styles.inputLargeComplemento, styles.input]}
            placeholder="Bairro"
            value={formData.owner_address.neighborhood}
            onChangeText={(value) => handleInputChange('owner_address', 'neighborhood', value)}
          />
          <TextInput
            style={[styles.inputLargeComplemento, styles.input]}
            placeholder="Cidade"
            value={formData.owner_address.city}
            onChangeText={(value) => handleInputChange('owner_address', 'city', value)}
          />
        </View>
        <View style={styles.rowContainer}>

          <TextInput
            style={[styles.input, styles.inputSmallRG]}
            placeholder="Estado"
            value={formData.owner_address.state}
            onChangeText={(value) => handleInputChange('owner_address', 'state', value)}
          />
          <TextInput
            style={[styles.input, styles.inputSmall]}
            placeholder="CEP"
            value={formData.owner_address.postal_code}
            onChangeText={(value) => handleInputChange('owner_address', 'postal_code', value)}
          />
          <TextInput
            style={[styles.input, styles.inputSmall]}
            placeholder="BR"
            value={formData.owner_address.country_code}
            onChangeText={(value) => handleInputChange('owner_address', 'country_code', value)}
          />
        </View>
      </View>

        <Text style={styles.subTitle}>Informações Comerciais</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome Comercial"
          value={formData.business_name}
          onChangeText={(value) => handleFieldChange('business_name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone Comercial"
          keyboardType="phone-pad"
          value={formData.business_phone}
          onChangeText={(value) => handleFieldChange('business_phone', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Comercial"
          keyboardType="email-address"
          value={formData.business_email}
          onChangeText={(value) => handleFieldChange('business_email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="CNPJ"
          keyboardType="numeric"
          value={formData.ein}
          onChangeText={(value) => handleFieldChange('ein', value)}
        />

        <View style={styles.confirmButtonContainer}>
          <TouchableOpacity style={styles.confirmButton} onPress={() => onSubmit(formData)}>
            <Text style={styles.confirmButtonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CelerePayBusinessForm;
