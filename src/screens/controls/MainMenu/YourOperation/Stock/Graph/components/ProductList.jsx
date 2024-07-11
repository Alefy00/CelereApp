/* #############################################################################################
#                                        C E L E R E A P P
#
# Author....: Alexandre Soares de Almeida
# Object....: Apresentar uma seção com a lista de produtos
# Create by.: 2024/05/27
# References: https://withfra.me/components/stats
#
# #############################################################################################
#             (C) Copyright 2024. Allright reserved solutions to CelereApp.
# #############################################################################################*/
import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

// import FeatherIcon from 'react-native-vector-icons/Feather';
import IconRightSign from '../../../../../../../assets/images/svg/iconRightSign.svg';
import IconSearch from '../../../../../../../assets/images/svg/iconSearch.svg';
import {useTranslation} from 'react-i18next';
import '../../../../../../../translation';

const users = [
  {
    id: 1,
    img: 'https://www.apptek.com.br/comercial/2024/celereapp/img/products/coca-cola.jpg',
    super_categ: 'Bebida Não Alcoólica',
    categoria: 'Refrigerante',
    name: 'Coca-Cola 300ml garrafa',
    estoque: 18,
    valor_venda: 3.5,
  },
  {
    id: 2,
    img: 'https://www.apptek.com.br/comercial/2024/celereapp/img/products/guarana.jpg',
    super_categ: 'Bebida Não Alcoólica',
    categoria: 'Refrigerante',
    name: 'Guaraná 300ml lata',
    estoque: 22,
    valor_venda: 3.3,
  },
];

export default function Example() {
  const {t} = useTranslation();
  const [input, setInput] = useState('');
  const filteredRows = useMemo(() => {
    const rows = [];
    const query = ''; // input.toLowerCase();

    for (const item of users) {
      const nameIndex = ''; // item.name.toLowerCase().search(query);

      if (nameIndex !== -1) {
        rows.push({
          ...item,
          index: nameIndex,
        });
      }
    }

    return rows.sort((a, b) => a.index - b.index);
  }, [input]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <View style={styles.search}>
            <View style={styles.searchIcon}>
              <IconSearch width={17} height={17} />
            </View>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={val => setInput(val)}
              placeholder={t('search_something')}
              placeholderTextColor="#848484"
              returnKeyType="done"
              style={styles.searchControl}
              value={input}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.searchContent}>
          {filteredRows.length ? (
            filteredRows.map(
              (
                {id, img, name, super_categ, categoria, estoque, valor_venda},
                index,
              ) => {
                return (
                  <View key={index} style={styles.cardWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}>
                      <View style={styles.card}>
                        {img ? (
                          <Image
                            alt=""
                            resizeMode="cover"
                            source={{uri: img}}
                            style={styles.cardImg}
                          />
                        ) : (
                          <View style={[styles.cardImg, styles.cardAvatar]}>
                            <Text style={styles.cardAvatarText}>{name[0]}</Text>
                          </View>
                        )}

                        <View style={styles.cardBody}>
                          <Text style={styles.cardTitle}>{name}</Text>

                          <Text style={styles.cardPhone}>
                            {super_categ} {'>'} {categoria}
                          </Text>

                          <Text style={styles.cardPhone}>
                            Qtd.: {estoque} | Preço: R$ {valor_venda}
                          </Text>
                        </View>

                        <View style={styles.cardAction}>
                          <IconRightSign width={22} height={22} />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              },
            )
          ) : (
            <Text style={styles.searchEmpty}>No results</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Search */
  search: {
    position: 'relative',
    backgroundColor: '#efefef',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchWrapper: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#efefef',
  },
  searchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  searchControl: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    paddingLeft: 34,
    width: '100%',
    fontSize: 16,
    fontWeight: '500',
  },
  searchContent: {
    paddingLeft: 24,
  },
  searchEmpty: {
    textAlign: 'center',
    paddingTop: 16,
    fontWeight: '500',
    fontSize: 15,
    color: '#9ca1ac',
  },
  /** Card */
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  cardImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },
  cardAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ca1ac',
  },
  cardAvatarText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBody: {
    marginRight: 'auto',
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cardPhone: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: '#616d79',
    marginTop: 3,
  },
  cardAction: {
    paddingRight: 16,
  },
});
