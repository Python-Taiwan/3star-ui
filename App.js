import React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import { useState, useEffect, setState } from 'react';
const a = require('apisauce');

// define the api
const api = a.create({
  baseURL: 'https://cors.muzamint.com',
});

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  const renderItem = ({ item }) => <Item title={item} />;
  let [, setState] = useState();
  let [stars, setStars] = useState([]);
  let [isLoaded, setIsLoaded] = useState(false);
  let [err, setErr] = useState(null);
  const getStars = () => {
    api
      .get('/')
      .then((res) => {
        if (res.status >= 400) {
          throw new Error('Server responds with error!');
        }
        return res;
      })
      .then(
        (stars) => {
          setStars(stars);
          setIsLoaded(true);
        },
        (err) => {
          setErr(err);
          setIsLoaded(true);
        }
      );
  };

  useEffect(() => {
    getStars();
  }, []);
  if (err) {
    return <Text style={styles.baseText}>Error</Text>;
  } else if (!isLoaded) {
    return <Text style={styles.baseText}>Loading</Text>;
  } else {
    return (
      <SafeAreaView style={styles.container}>
       

        <FlatList
          data={stars.data.可能中獎號碼}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
          <TouchableOpacity
          style={styles.button}
          onPress={() => {
            getStars();
          }}>
          <Text> 重選 </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  button: {
    fontSize: 32,
    backgroundColor: '#FFFE61',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
