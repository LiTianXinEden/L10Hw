import React, { useState, useEffect } from "react";
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
  },
  searchInput: {
    height: 40,
    borderColor: "#7b8da8",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingBottom: 40,
  },
  itemContainer: {
    backgroundColor: "#e9ecef",
    borderColor: "#b0b0f5",
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  breedName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  coatType: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});

let originalData = [];
const App = () => {
  const [mydata, setMyData] = useState([]);

  //useEffect - exercise 1B??
  useEffect(() => {
    //Add fetch() - exercise 1A
    fetch("https://mysafeinfo.com/api/data?list=catbreeds&format=json&case=default")
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          if (originalData.length < 1) {
            setMyData(myJson);
            originalData = myJson;
          }
        });
  }, []);

  //Create the FilterData() function
  const FilterData = (text) => {
    if (text !== "") {
      let myFilteredData = originalData.filter((item) =>
          item.BreedName.toLowerCase().includes(text.toLowerCase())
      );
      setMyData(myFilteredData);
    } else {
      setMyData(originalData);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
        <View style={styles.itemContainer}>
          <Text style={styles.breedName}>{item.BreedName}</Text>
          <Text style={styles.coatType}>Coat type: {item.CoatType}</Text>
          <Text style={styles.coatType}>Origin Location: {item.OriginLocation}</Text>
        </View>
    );
  };

  return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={styles.title}><Icon name="cat" size={20} color="#13a794"/>Cat Breeds<Icon name="cat" size={20} color="#13a794"/></Text>
        <TextInput
            style={styles.searchInput}
            placeholder="Search for a breed..."
            placeholderTextColor="#aaa"
            onChangeText={(text) => {
              FilterData(text);
            }}
        />
        <FlatList
            data={mydata}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
        />
      </View>
  );
};

export default App;
