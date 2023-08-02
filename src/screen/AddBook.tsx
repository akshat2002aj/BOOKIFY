import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import React from 'react';
import Header from '../component/Header';

import {Button} from 'react-native-paper'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from '../component/Input';
import BottomSheet from '../component/BottomSheet';

import {useAddBookMutation} from '../features/BookSlice'
import { Alert } from 'react-native';

type Props = {
  navigation: any;
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(5, 'Name must be at least 8 characters')
    .required('Name is required'),
  author: Yup.string()
    .min(3, 'Author must be at leasr 3 characters')
    .required('Author is required'),
  isbn: Yup.number()
    .test(
      'len',
      'Must be exactly 13 characters',
      (val:any) => val.toString().length === 13
    )
    .required('ISBN is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  price: Yup.number().required('Price is required'),
});

const AddBook = (props: Props) => {
  const [sheet, setSheet] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [imageData, setImageData] = React.useState<any>('');
  const [bookData, setBookData] = React.useState<any>({});

  const [addBook, {isLoading, isError, isSuccess}] = useAddBookMutation();

  const bookInfo = {
    name:'',
    author:'',
    isbn:'',
    description:'',
    price:''
  }

  React.useEffect(()=>{
    if(isSuccess){
      props.navigation.navigate('My Books1');
    }
  },[isSuccess])

  const handleBook = async(data:FormData)=>{
    try {
      const res = await addBook(data)
      setBookData(res)
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  }

  const addBookHandler = (data:any)=>{
    const myForm = new FormData();
    myForm.append('name', data.name);
    myForm.append('author', data.author);
    myForm.append('description', data.description);
    myForm.append('isbn', data.isbn);
    myForm.append('price', data.price);
    if(image.length < 5){
      Alert.alert("Error", "Add Book Photo to add book.")
    }else{
      myForm.append('avatar', {
        uri: image,
        type: imageData.mime,
        name: data.name,
        filename: 'user',
      });
      handleBook(myForm);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <Header
        navigation={props.navigation}
        handleClick={() => {
          props.navigation.goBack();
        }}
        title="Add Book"
        icon={
          <Feather name="x" color="#000" size={27} style={{marginRight: 5}} />
        }
      />
      <ScrollView style={{marginTop: 50}}>
        <View style={styles.register}>
          <Image
            source={image ? {uri: image} : require('../assets/book1.jpg')}
            style={{width: 200, height: 150, borderRadius:20}}
          />
          <TouchableOpacity onPress={() => {setSheet(true);}}>
            <Text style={{color: '#AD40AF', marginTop:13}}>Change Photo</Text>
          </TouchableOpacity>
          <View style={{width: '80%', marginTop: 30}}>
          <Formik
              initialValues={bookInfo}
              validationSchema={validationSchema}
              onSubmit={(values, formikActions) => {
                addBookHandler(values);
              }}>
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => {
                const {name, author, isbn, description, price} = values;
                return (
                  <>
                    <Input
                      placeholder="Book Name"
                      value={name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      error={touched.name && errors.name}
                      icon={
                        <MaterialIcons
                          name="book"
                          size={20}
                          color="#666"
                          style={{marginRight: 5}}
                        />
                      }
                    />
                    <Input
                      placeholder="Author"
                      value={author}
                      onChangeText={handleChange('author')}
                      onBlur={handleBlur('author')}
                      error={touched.author && errors.author}
                      icon={
                        <MaterialIcons
                          name="person-outline"
                          size={20}
                          color="#666"
                          style={{marginRight: 5}}
                        />
                      }
                    />
                    <Input
                      placeholder="ISBN"
                      value={isbn}
                      onChangeText={handleChange('isbn')}
                      onBlur={handleBlur('isbn')}
                      error={touched.isbn && errors.isbn}
                      keyboardType="number-pad"
                      icon={
                        <MaterialIcons
                          name="numbers"
                          size={20}
                          color="#666"
                          style={{marginRight: 5}}
                        />
                      }
                    />
                    <Input
                      placeholder="Description"
                      value={description}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      error={touched.description && errors.description}
                      icon={
                        <MaterialIcons
                          name="description"
                          size={20}
                          color="#666"
                          style={{marginRight: 5}}
                        />
                      }
                    />
                    <Input
                      placeholder="Price"
                      value={price}
                      onChangeText={handleChange('price')}
                      onBlur={handleBlur('price')}
                      error={touched.price && errors.price}
                      keyboardType="number-pad"
                      icon={
                        <MaterialIcons
                          name="currency-rupee"
                          size={20}
                          color="#666"
                          style={{marginRight: 5}}
                        />
                      }
                    />
                    {isError && (
                      <Text style={styles.error}>
                        {bookData.error?.data?.message}
                      </Text>
                    )}
                    <Button
                      style={styles.btn}
                      onPress={() => handleSubmit()}
                      loading={isLoading}
                      textColor="#fff">
                      {isLoading ? (
                        <>
                          <Text>Loading...</Text>
                        </>
                      ) : (
                        <Text>Add Book</Text>
                      )}
                    </Button>
                  </>
                );
              }}
            </Formik>
          </View>
        </View>
        <BottomSheet isVisibel={sheet} setIsVisible={setSheet} setImage={setImage} setImageData={setImageData}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddBook;

const styles = StyleSheet.create({
  register: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#AD40AF',
    padding: 5,
    marginTop: 5,
    // width: '70%',
  },
  headerText: {
    fontSize: 30,
    marginVertical: 30,
    color: '#20315f',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginRight: 10,
    marginBottom: 2,
    marginTop:10,
    fontWeight: '400',
    alignSelf: 'flex-end',
  },
});
