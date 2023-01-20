import { ref, remove } from 'firebase/database';
import { doc, setDoc, addDoc, collection, updateDoc, getDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { db } from './components/config'

export default function App() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')

  //Função para criar usuário

  function createUser(){

    //Esse o ID é definido no próprio código

      /*setDoc(doc(db, 'Usuários', 'User_1'), {
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

    //Esse utiliza para definir um ID aleatório, dificultando os outros processos
    //mas sendo uma opção mais segura e prática

    addDoc(collection(db, 'Usuários'), {
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

  //Função para realizar update no regístro
  //Basta alterar o ID e ele altera tudo dentro dele

  function updateUser(){
    updateDoc(doc(db, 'Usuários/', 'hvugCilV9qRcF1Xtui0K'), {
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

  //Função para exibir os dados dos usuários

  function readAllData(){
    getDocs(collection(db, 'Usuários')).then(docSnap => {
      let allData = [] //array vazia para armazenar o DATA
      docSnap.forEach((doc) => {
        allData.push({ ...doc.data(), id:doc.id})
      })
        console.log('Usuários: ', allData)
    })
  }

  //Função para exibir apenas um usuário
  //Insere o ID do usuário

  function readUser(){
    getDoc(doc(db, 'Usuários/', 'hvugCilV9qRcF1Xtui0K')).then(docData => {
      if(docData.exists()) {
        console.log(docData.data())
      } else {
        alert('ID não encontrado')
      }
    }).catch((error)=> {
      console.log(error)
    })
  }

  //Função para deletar o usuário
  //Insere o ID do usuário

  function deleteUser() {
    deleteDoc(doc(db, 'Usuários/', '5eY5GvIZSCh1hSD5FcKz'))
    alert('Usuário removido')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={Keyboard.dismiss} style={styles.PressableContainer}>
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
            <Text style={styles.ButtonText}>Mostrar apenas um usuário</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={readAllData}
          style={styles.Button}
          >
            <Text style={styles.ButtonText}>Mostrar todos os usuário</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={deleteUser}
          style={styles.Button}
          >
            <Text style={styles.ButtonText}>Deletar usuário</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
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

  PressableContainer: {
    alignItems: 'center'
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
