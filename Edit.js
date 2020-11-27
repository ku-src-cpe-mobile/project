import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

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
          <Text style={styles.header_text}>Feed</Text>
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
            <Text>Feed</Text>
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
            <Text>Post</Text>
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
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.header_button} onPress={this.reload}>
            <Text>Reload</Text>
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
    backgroundColor: "#000",
    flex: 2,
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#bbb",
    flex: 2,
    padding: 20,
    margin: 20,
  },
  bottom: {
    backgroundColor: "#000",
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
    // backgroundColor: "white",
    // flex: 1,
  },
  header_button: {
    backgroundColor: "#ccc",
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    paddingLeft: 10,
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
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 20,
    paddingLeft: 10,
  },
  box_nav: {
    flex: 4,
    flexDirection: "row-reverse",
  },
  text: {
    //backgroundColor: "cyan",
    fontSize: 18,
    flex: 0.3,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 3,
  },
  text_input: {
    backgroundColor: "#999",
    fontSize: 16,
    flex: 0.7,
    borderRadius: 50,
    margin: 2,
    padding: 4,
  },
  button: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default Edit;
