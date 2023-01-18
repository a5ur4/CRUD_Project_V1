import { StatusBar } from 'expo-status-bar';
import { ref } from 'firebase/database';
import { doc, setDoc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { db } from './components/config'

export default function App() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')
  const [errorMessage, setErrorMesssage] = useState(null)

  function verification(){
    if(username == null && email == null && cpf == null && telefone == null){
      Vibration.vibrate()
      setErrorMesssage("Este campo é obrigatório*")
    }
  }

  //Função para criar usuário

  function createUser(){

    //Esse o ID é definido no próprio código

      setDoc(doc(db, 'Usuários', 'User_1'), {
      Username: username,
      Email: email,
      CPF: cpf,
      Telefone: telefone,
    }).then(() => {
      alert('Data submitted')
    })
      .catch((error)=> {
        alert(error)
      })

    //Esse utiliza para definir um ID aleatório, dificultando os outros processos
    //mas sendo uma opção mais segura e prática

    /*addDoc(collection(db, 'Usuários'), {
      Username: username,
      Email: email,
      CPF: cpf,
      Telefone: telefone,
    }).then(() => {
      alert('Data submitted')
    })
      .catch((error)=> {
        alert(error)
      })*/
  }

  //Função para realizar update no regístro
  //Basta alterar o ID e ele altera tudo dentro dele

  function updateUser(){
    updateDoc(doc(db, 'Usuários', 'User_1'), {
      Username: username,
      Email: email,
      CPF: cpf,
      Telefone: telefone,
    }).then(() => {
      alert('Data submitted')
    })
      .catch((error)=> {
        alert(error)
      })
  }

  //Função para exibir os dados do usuário
  //Basta por o nome do usuário e pressionar o botão

  function readUser() {
    const starCountRef = ref(db, 'Usuários', 'User_1')
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      setEmail(data.email)
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Title}>
        <Text style={styles.TextHead}>Cadastro Cliente</Text>
        <View style={styles.LineHead_1}></View>
        <View style={styles.LineHead_2}></View>
      </View>
      <View style={styles.InputBox}>
        <Text style={styles.LabelText}>Nome:</Text>
        <TextInput
        style={styles.Input}
        value={username}
        onChangeText={(username)=> {
          setUsername(username)
        }}
        placeholder='Insira seu nome aqui...'
        placeholderTextColor= "#950101"
        />

        <Text style={styles.LabelText}>Email:</Text>
        <Text>{errorMessage}</Text>
        <TextInput
        style={styles.Input}
        value={email}
        onChangeText={(email)=> {
          setEmail(email)
        }}
        placeholder='Insira seu Email aqui...'
        placeholderTextColor= "#950101"
        />

        <Text style={styles.LabelText}>CPF:</Text>
        <Text>{errorMessage}</Text>
        <TextInput
        style={styles.Input}
        value={cpf}
        onChangeText={(cpf)=> {
          setCpf(cpf)
        }}
        placeholder='Insira seu CPF aqui...'
        placeholderTextColor= "#950101"
        keyboardType='numeric'
        />

        <Text style={styles.LabelText}>Telefone:</Text>
        <Text>{errorMessage}</Text>
        <TextInput
        style={styles.Input}
        value={telefone}
        onChangeText={(telefone)=> {
          setTelefone(telefone)
        }}
        placeholder='Insira seu telefone aqui...'
        placeholderTextColor= "#950101"
        keyboardType='numeric'
        />
      </View>
      <View>
        <TouchableOpacity 
        onPress={createUser}
        style={styles.Button}
        >
          <Text style={styles.ButtonText}>Cadastrar usuário</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={updateUser}
        style={styles.Button}
        >
          <Text style={styles.ButtonText}>Alterar usuário</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={readUser}
        style={styles.Button}
        >
          <Text style={styles.ButtonText}>Mostrar usuário</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Title: {
    alignItems: 'center',
    top: -20 
  },  

  TextHead: {
    color: "#FF0000",
    fontSize:20,
    fontWeight:'bold'
  },

  LineHead_1: {
    padding: 5,
    width: 250,
    borderBottomColor: '#FF0000',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  LineHead_2: {
    padding: 5,
    width: 300,
    borderBottomColor: '#FF0000',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  LabelText:{
    color: '#FF0000',
    fontSize: 15,
    marginLeft: 10,
    marginTop: 20
  },

  Input: {
    borderColor: 'red',
    borderWidth:1,
    marginTop: 15,
    height: 40,
    width: 350,
    borderRadius: 30,
    color: '#FF0000',
    paddingLeft: 20
  },

  Button: {
    backgroundColor: '#FF0000',
    borderRadius: 30,
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  ButtonText: {
    fontSize: 15
  }
});
