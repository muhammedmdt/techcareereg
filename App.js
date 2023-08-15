import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

const App = () => {
  const [urunler, setUrunler] = useState([]);
  const [urunAdi, setUrunAdi] = useState('');
  const [urunFiyati, setUrunFiyati] = useState('');
  const [stokSayisi, setStokSayisi] = useState('');

  const [hoveredButton, setHoveredButton] = useState(false);

  const addUrun = () => {
    if (urunAdi && urunFiyati && stokSayisi) {
      const newUrun = {
        adi: urunAdi,
        fiyati: parseFloat(urunFiyati),
        stok: parseInt(stokSayisi),
      };
      setUrunler([...urunler, newUrun]);
      setUrunAdi('');
      setUrunFiyati('');
      setStokSayisi('');
    }
  };

  const removeUrun = (index) => {
    const newUrunler = [...urunler];
    newUrunler.splice(index, 1);
    setUrunler(newUrunler);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ürün Listesi</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ürün Adı"
          value={urunAdi}
          onChangeText={text => setUrunAdi(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ürün Fiyatı"
          value={urunFiyati}
          onChangeText={text => setUrunFiyati(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Ürün Stok Sayısı"
          value={stokSayisi}
          onChangeText={text => setStokSayisi(text)}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[
            styles.addButton,
            hoveredButton && styles.hoveredButtonStyle
          ]}
          onPress={addUrun}
          onPressIn={() => setHoveredButton(true)}
          onPressOut={() => setHoveredButton(false)}
        >
          <Text style={styles.buttonText}>Ürünü Ekle</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.urunList}
        data={urunler}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ListItem containerStyle={styles.urunItem} bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={item.stok > 50 ? styles.redText : null}>
                {item.adi}
              </ListItem.Title>
              <ListItem.Subtitle>
                Fiyatı: {item.fiyati.toFixed(2)}, Stok Sayısı: {item.stok}
              </ListItem.Subtitle>
            </ListItem.Content>
            <Button title="Sil" onPress={() => removeUrun(index)}/>
          </ListItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,  
    marginLeft:100,
    color:'#512B81'
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    
  },
  urunList: {
    flex: 1,
  },
  urunItem: {
    marginVertical: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  redText: {
    color: 'red',
    fontWeight:700,
  },
  addButton: {
    backgroundColor: '#512B81',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hoveredButtonStyle: {
    backgroundColor: '#6638A6',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },


});

export default App;
