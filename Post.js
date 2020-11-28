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

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { image: "" };

    const { route } = this.props;
    this.id = route.params.id;
    this.name = route.params.name;
    this.count = route.params.count + 1;
    console.log(this.id);
  }

  accept_add_storage = async (querySnapshot) => {
    console.log("func: Post/accept_add_storage");
    console.log("\n" + this.state.image + "\n");
    await this.setState({ image: querySnapshot });
    await console.log("\n" + this.state.image + "\n");
    console.log("func: Post/accept_add_storage pass");
  };

  accept_get_storage = (querySnapshot) => {
    console.log("func: Post/accept_get_storage");
    console.log("func: Post/accept_get_storage pass");
  };

  accept_add_store = (querySnapshot) => {
    console.log("func: Post/accept_add_store");
    console.log("func: Post/accept_add_store pass");
  };

  reject = (error) => {};

  componentDidMount() {
    console.log("func: Post/componentDidMount");
    console.log("func: Post/componentDidMount pass");
  }

  uploadImage = async () => {
    console.log("func: Post/uploadImage");
    await firestore.add_post_storage(
      this.state.image,
      this.count,
      this.accept_add_storage,
      this.reject
    );
    await firestore.get_post_storage(
      this.count,
      this.accept_get_storage,
      this.reject
    );
    console.log("\n" + this.state.image + "\n");
    let datas = await {
      name: this.name,
      uri: this.state.image,
      like: 0,
      share: 0,
    };
    await firestore.add_post_store(datas, this.accept_add_store, this.reject);
    console.log("func: Post/uploadImage pass");
    Alert.alert("SUCCESS","Your picture already uploaded.",[{ text: "OK", onPress: () => this.props.navigation.navigate("Feed") }],{ cancelable: false });
  };

  pick_image = async () => {
    console.log("func: Post/pick_image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.uri);
      this.setState({ image: result.uri });
    }
    console.log("func: Post/pick_image pass");
  };

  call = () => {
    console.log("\n\n\n\n\n\n\n");
  };

  check = () => {
    console.log(this.state.image);
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
            <Text style={{fontSize:17,fontWeight: 'bold'}}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: "#2CA22F",
              flex: 1,
              flexDirection: "row-reverse",
              alignItems: "center",
              margin:1,
              paddingLeft: 20,
              borderBottomLeftRadius:10}} 
              onPress={this.reload}>
            <Text style={{fontSize:17,fontWeight: 'bold',marginleft:5}}>Reload</Text>
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
        <ImageBackground style={styles.image2} source={{uri:"https://firebasestorage.googleapis.com/v0/b/myproject-75fab.appspot.com/o/image%2Fghost3.jpg?alt=media&token=2011e412-5601-412c-9947-bb8abbd71056&fbclid=IwAR2er0SvxBSOk9W4233a5H6s5fzfNByzJX0My_NJsVal3Q7WY5YnpKrF8gM"}}>
        <View style={styles.top}></View>
        <View style={styles.content}>
          <View style={{ flex: 1 }}>
            <View style={styles.box}>
              <TouchableOpacity style={styles.button} onPress={this.pick_image}>
                <Text style={{ fontSize: 18 }}>Choose Picture</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.uploadImage}
              >
                <Text style={{ fontSize: 18 }}>Upload</Text>
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
    padding: 20,
    margin: 20,
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
    backgroundColor: "black",
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
  image2: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default Feed;
