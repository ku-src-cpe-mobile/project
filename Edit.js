import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from '@expo/vector-icons'; 
import firestore from "./firebase/Firestore";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], id: null, name: null };

    const { route } = this.props;
    this.id = route.params.id;
    this.name = route.params.name;
    console.log(this.id);
  }

  accept = async (querySnapshot) => {};

  reject = (error) => {};

  componentDidMount() {
    console.log("func: Edit/componentDidMount");
    this.setState({ name: this.name });
    console.log("func: Edit/componentDidMount pass");
  }

  on_change = () => {
    console.log("func: Edit/on_change");
    console.log(this.state.name);
    firestore.update_users(this.id, this.state.name, this.accept, this.reject);
    console.log("func: Edit/on_change pass");
    Alert.alert("SUCCESS","Your name's updated.",[{ text: "OK", onPress: () => console.log("OK") }],{ cancelable: false });
    
  };

  call = () => {
    console.log("\n\n\n\n\n\n\n");
  };

  check = () => {
    console.log(this.state.name);
    console.log(this.state.password);
  };

  Header = () => {
    return (
      <View style={styles.header}>
        <View style={styles.box_header}>
          <FontAwesome5 name="ghost" size={24} color="black" />
        </View>
        <View style={styles.box_nav}>
          {/* <TouchableOpacity style={styles.header_button} onPress={this.call}>
          <Text>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.header_button} onPress={this.check}>
          <Text>Check</Text>
        </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.header_button}
            onPress={() => {
              this.props.navigation.navigate("Feed");
            }}
          >
            <Text style={{fontSize:18,fontWeight: 'bold'}}>Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.header_button}
            onPress={() => {
              this.props.navigation.navigate("Post", {
                id: this.id,
                name: this.name,
                count: this.state.count,
              });
            }}
          >
            <Text style={{fontSize:18,fontWeight: 'bold'}}>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.header_button}
            onPress={() => {
              this.props.navigation.navigate("Edit", {
                id: this.id,
                name: this.name,
              });
            }}
          >
            <Text style={{fontSize:18,fontWeight: 'bold'}}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: "#2CA22F",
              flex: 1,
              flexDirection: "row-reverse",
              alignItems: "center",
              margin:1,
              paddingLeft: 20,
              borderBottomLeftRadius:10}} 
              onPress={this.reload}>
            <Text style={{fontSize:17,fontWeight: 'bold'}}>Reload</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 8,
        }}
      />
    );
  };

  render(props) {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <this.Header />
        <ImageBackground style={styles.image2} source={{uri:"https://firebasestorage.googleapis.com/v0/b/myproject-75fab.appspot.com/o/image%2Fghost.jpg?alt=media&token=c8d670b4-e4af-497d-bb29-ba6d3ea8a787&fbclid=IwAR2OVDYhBycIMDabRdKdhQAf3rVJ-HafGzhEfFRF4IJiEy0FEMH0hSDfBzs"}}>
        <View style={styles.top}></View>
        <View style={styles.content}>
          <View style={{ flex: 1 }}>
            <View style={styles.box}>
              <Text style={styles.text}>Name</Text>
              <TextInput
                style={styles.text_input}
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
              />
            </View>
            <View style={styles.box}>
              <TouchableOpacity style={styles.button} onPress={this.on_change}>
                <Text style={{ fontSize: 18 }}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottom}></View>
      </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  top: {
    //backgroundColor: "#000",
    flex: 2,
    justifyContent: "center",
  },
  content: {
    //backgroundColor: "#bbb",
    flex: 2,
    padding: 30,
    margin: 1,
    height:10
  },
  bottom: {
    //backgroundColor: "#000",
    flex: 6,
  },
  image: {
    width: "100%",
    height: Math.round(Dimensions.get("window").height) / 2,
    backgroundColor: "#dddddd",
  },
  header: {
    backgroundColor: "#000",
    flexDirection: "row",
    height: 50,
    marginTop: 30,
  },
  header_text: {
    fontFamily: "sans-serif-thin",
    alignItems:"flex-start",
    fontSize:14,
  },
  header_button: {
    backgroundColor: "#2CA22F",
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    margin:1,
    paddingLeft: 20,
  },
  box: {
    // backgroundColor: "#666",
    flex: 1,
    flexDirection: "row",
    //alignItems: 'center',
    //justifyContent:"space-around",
    borderRadius: 5,
    margin: 10,
  },
  box_header: {
    backgroundColor: "#fff",
    flex: 0.5,
    // alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 20,
    paddingLeft: 10,
    margin:1,
  },
  box_nav: {
    flex: 5,
    backgroundColor:"black",
    flexDirection: "row-reverse",
    borderRadius:10,
  },
  text: {
    //backgroundColor: "cyan",
    fontSize: 25,
    flex: 0.3,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 10,
    color:"white"
  },
  text_input: {
    backgroundColor: "gray",
    color:"white",
    fontSize: 16,
    flex: 0.7,
    borderRadius: 50,
    padding:10,
    height:50,

  },
  button: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop:20,
    height:50
  },
  image2: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default Edit;
