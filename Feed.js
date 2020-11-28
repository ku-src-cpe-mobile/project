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
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from '@expo/vector-icons'; 
import firestore from "./firebase/Firestore";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], count: 0, name: "A" };

    const { route } = this.props;
    this.id = route.params.id;
    this.name = route.params.name;
    console.log(this.id);
    console.log(this.name);
  }

  accept_storage = (querySnapshot) => {
    console.log("func: Feed/accept_storage");
    // const obj = {
    //   name: querySnapshot.name,
    //   uri: querySnapshot.uri,
    //   like: querySnapshot.like,
    //   share: querySnapshot.share,
    // };
    // "https://firebasestorage.googleapis.com/v0/b/mobile-week-08.appspot.com/o/posts%2F2.jpg?alt=media&token=2bdfa214-27ea-46a2-a487-10aa2ace8d97"
    // const obj = {
    //   name: "A",
    //   uri: querySnapshot,
    //   like: 13,
    //   share: 13,
    // };
    this.setState({ posts: this.state.posts.concat(obj) });
    // console.log(this.state.posts);
    console.log("func: Feed/accept_storage pass");
  };
  accept_store = (querySnapshot) => {
    console.log("func: Feed/accept_store");
    this.setState({ posts: [] });
    var posts = [];
    var count = 0;
    querySnapshot.forEach(function (doc) {
      var post = doc.data();
      post["id"] = doc.id;
      posts = posts.concat(post);
      count += 1;
      // console.log(post.uri);
    });
    this.setState({ count: count });
    this.setState({ posts: this.state.posts.concat(posts) });
    console.log("func: Feed/accept_store pass");
  };

  accept_update = () => {
    console.log("func: Feed/accept_update");
    console.log("func: Feed/accept_update pass");
  };

  reject = (error) => {};

  accept_listening = (doc) => {
    console.log("func: Feed/accept_listening");
    firestore.update_post_like(this.accept_update, this.reject);
    console.log("func: Feed/accept_listening pass");
  };

  componentDidMount() {
    console.log("func: Feed/componentDidMount");
    // firestore.get_post_storage(2, this.accept_storage, this.reject);
    firestore.get_post_store(this.accept_store, this.reject);
    firestore.listening_like(this.accept_listening, this.reject);
    console.log("func: Feed/componentDidMount pass");
  }

  reload = () => {
    console.log("func: Feed/reload");
    firestore.get_post_store(this.accept_store, this.reject);
    console.log("func: Feed/reload pass");
  };

  on_like = () => {
    console.log("func: Feed/on_like");
    // firestore.update_post_like(id, this.accept_update, this.reject);
    console.log("func: Feed/on_like pass");
  };

  on_share = () => {
    console.log("func: Feed/on_share");
    console.log("func: Feed/on_share pass");
  };

  call = () => {
    console.log("\n\n\n\n\n\n\n");
  };

  check = () => {
    console.log(this.state.posts);
  };

  Header = () => {
    return (
      <View style={styles.header}>
        <View style={styles.box_header}>
          <FontAwesome5 name="ghost" size={24} color="black" />
        </View>
        <View style={styles.box_nav}>
          
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

  renderItem = ({ item }) => {
    return (
      <View style={styles.container}>

        <Text style={styles.name}>{item.name}</Text>
        <View>
          <Image source={{ uri: item.uri }} style={styles.image} />
        </View>
        <View style={styles.box}>
          <TouchableOpacity
            style={styles.icon_left}
            onPress={() => {
              firestore.update_post_like(
                item.id,
                item.like,
                this.accept_update,
                this.reject
              );
              firestore.get_post_store(this.accept_store, this.reject);
            }}
          >
            <Text>
              <SimpleLineIcons name="ghost" size={24} color="black" />
              <Text> </Text>
              {item.like}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon_right}
            onPress={() => {
              firestore.update_post_share(
                item.id,
                item.share,
                this.accept_update,
                this.reject
              );
              firestore.get_post_store(this.accept_store, this.reject);
            }}
          >
            <Text>
              {item.share}
              <Text> </Text>
              <FontAwesome5 name="share-square" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          //backgroundColor: "black",
          height: 20,
        }}
      />
    );
  };

  render(props) {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1,backgroundColor:'black' }}>
        <this.Header />
        <ImageBackground style={styles.image2} source={{uri:"https://firebasestorage.googleapis.com/v0/b/myproject-75fab.appspot.com/o/image%2Fghost4.jpg?alt=media&token=b72af29f-6f1b-4159-9a6e-ea7988c681e9&fbclid=IwAR3-JnqGj7JUpNX7zKS3E2NaxQXcGduVGFYKRGw1WyR2da23ozhRx7mdOZE://firebasestorage.googleapis.com/v0/b/myproject-75fab.appspot.com/o/image%2Fghost.jpg?alt=media&token=c8d670b4-e4af-497d-bb29-ba6d3ea8a787&fbclid=IwAR2OVDYhBycIMDabRdKdhQAf3rVJ-HafGzhEfFRF4IJiEy0FEMH0hSDfBzs"}}>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <View style={styles.content}>
            <FlatList
              data={this.state.posts}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.renderSeparator}
              ref={(ref) => {
                this.flatListRef = ref;
              }}
              onContentSizeChange={() => this.flatListRef.scrollToEnd()}
            />
          </View>
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#555",
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  content: {
    //backgroundColor: "black",
    flex: 1,
  },
  image: {
    // width: "100%",
    height: Math.round(Dimensions.get("window").height) / 2,
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
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
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
  name: {
    backgroundColor: "gray",
    paddingLeft: 30,
    fontFamily: "sans-serif-medium",
    fontSize: 18,
    color: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  icon_left: {
    backgroundColor: "#18F438",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderBottomLeftRadius: 50,
  },
  icon_right: {
    backgroundColor: "#696969",
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "center",
    borderBottomRightRadius: 50,
  },
  image2: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default Feed;
