import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import React from 'react';
import Header from '../component/Header';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useGetAllMessageQuery, useSendMessageMutation } from '../features/ChatSlice';
import { useProfileQuery } from '../features/AuthApiSlice';
type Props = {
  navigation: any;
  route: any;
};
const Chat = (props: Props) => {
  const [id, setId] = React.useState();
  const [name, setName] = React.useState();
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (props.route.params) {
      if (props.route.params.id) {
        setId(props.route.params.id);
      }
      if (props.route.params.name) {
        setName(props.route.params.name);
      }
    }
  }, [props.route]);

  const {data:messages, isLoading, isSuccess, error} = useGetAllMessageQuery(id);
  //console.log(messages, error?.data)
  const arg = 1;
  const {data: profile, isLoading:lodingProfile, isSuccess:successProfile} = useProfileQuery(arg);

  const [
    sendMessageFunc,
    {isError:chatError, isLoading: chatLoading, isSuccess: chatSuccess},
  ] = useSendMessageMutation();

  

  const handleMessage = (t:any)=>{
    setMessage(t);
  }

  const sendMessage = async()=>{
    console.log(message)
    const data = await sendMessageFunc({id, message: {
      "message":message
    }});
    setMessage("");
    console.log(data)
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <Header
        navigation={props.navigation}
        icon={
          <Feather name="x" color="#000" size={27} style={{marginRight: 5}} />
        }
        handleClick={() => {
          props.navigation.goBack();
        }}
        title={name}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 15,
          marginBottom: 50
        }}>
          {
            messages?.data.map((i, index) => {
              if(i.sender.toString() === profile.data._id.toString()){
                return <Text style={styles.sender} key={index}>{i.message}</Text>;
              }else{
                return <Text style={styles.receiver} key={index}>{i.message}</Text>;
              }
            })
          }
        </ScrollView>
      <View style={styles.conatiner}>
        <TextInput
          style={styles.input}
          placeholder="Enter Message..."
          placeholderTextColor="#696969"
          onChangeText={handleMessage}
          value={message}
        />
        <Feather name="send" color="#000" size={27} disabled={message.length > 0 ? false : true} style={{marginRight: 5, marginTop: 5}} onPress={sendMessage}/>
      </View>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingBottom: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems:'center',
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingBottom: -1,
    color: '#000',
    paddingLeft: 10,
    fontSize: 16
  },
  sender: {
    color:'#000',
    borderColor:'#ccc',
    borderWidth:1,
    borderRadius: 10,
    maxWidth: '75%',
    alignSelf: 'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    fontSize: 18
  },
  receiver: {
    color:'#000',
    borderColor:'#ccc',
    borderWidth:1,
    borderRadius: 10,
    maxWidth: '75%',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    fontSize: 18
  }
});
