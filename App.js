import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { ListItem } from 'react-native-elements';

const App = () => {
  const [urun, setUrun] = useState([]);
  const [urunAdi, setUrunAdi] = useState('');
  const [urunFiyati, setUrunFiyati] = useState('');
  const [stokSayisi, setStokSayisi] = useState('');

  const addUrun = () => {
    if (urunAdi && urunFiyati && stokSayisi) {
      const newUrun = {
        adı: urunAdi,
        fiyat: parseFloat(urunFiyati),
        stok: parseInt(stokSayisi),
      };
      setUrun([...urun, newUrun]);
      setUrunAdi('');
      setUrunFiyati('');
      setStokSayisi('');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Urun Adı"
        value={urunAdi}
        onChangeText={text => setUrunAdi(text)}
      />
      <TextInput
        placeholder="Urun Fiyatı"
        value={urunFiyati}
        onChangeText={text => setUrunFiyati(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Stok Sayısı"
        value={stokSayisi}
        onChangeText={text => setStokSayisi(text)}
        keyboardType="numeric"
      />
      <Button title="Urun Ekle" onPress={addUrun} />
      <FlatList
        data={urun}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem
            bottomDivider
            containerStyle={item.stok > 50 ? { backgroundColor: 'red' } : null}
          >
            <ListItem.Content>
              <ListItem.Title>{item.adı}</ListItem.Title>
              <ListItem.Subtitle>
                Fiyat: {item.fiyat.toFixed(2)}, Stok: {item.stok}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
      />
    </View>
  );
};

export default App;
