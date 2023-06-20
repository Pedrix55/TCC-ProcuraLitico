import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { TextInput } from "react-native-paper";

const TelaLoginComponent = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(true);

  const visibilidade = () => {
    mostrarSenha === true ? setMostrarSenha(false) : setMostrarSenha(true);
  };
  function verificacaoLogin() {
    if (email === "" || senha === "") {
      alert("Preencha os dados corretamente");
      return;
    } else {
      navigation.navigate("telaPoliticos");
    }
  }

  return (
    <View style={estilo.container}>
      <View style={estilo.posImg}>
        <Image style={estilo.img} source={require("../../img/imgLogo.png")} />
      </View>
      <Text style={estilo.titulo}>PROCURALÍTICO</Text>

      <View style={estilo.emailSenha}>
        <TextInput
          label="Email"
          mode="flat"
          left={<TextInput.Icon icon="email" />}
          onChangeText={(texto) => setEmail(texto)}
          defaultValue={email}
        />
      </View>

      <View style={estilo.emailSenha}>
        <TextInput
          label="Senha"
          placeholder=""
          right={
            <TextInput.Icon icon="eye" Color="red" onPress={visibilidade} />
          }
          left={<TextInput.Icon icon="lock" />}
          onChangeText={(texto) => setSenha(texto)}
          defaultValue={senha}
          secureTextEntry={mostrarSenha}
        />

        <View style={estilo.entraVisitCriar}>
          <TouchableOpacity
            onPress={() => navigation.navigate("telaPoliticos")}
          >
            <Text style={estilo.entrarVstt}>Entrar como visitante</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text style={estilo.criarCnt}>Criar uma conta</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={estilo.bordaButao}
        //onPress={() => navigation.navigate("telaPoliticos")}
        onPressIn={verificacaoLogin()}
      >
        <Text style={estilo.butao}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#45BA5F",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },

  titulo: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    margin: 0,
    top: -80,
  },

  emailSenha: {
    width: 393,
    height: 110,
    marginLeft: 10,
    fontSize: 16,
  },

  butao: {
    color: "white",
    fontSize: 16,
    padding: 13,
    width: 350,
    fontWeight: "bold",
    textAlign: "center",
    top: 27,
    backgroundColor: "black",
    margin: -10,
    marginTop: 0,
  },
  bordaButao: {
    margin: 26,
    padding: 20,
    marginTop: 0,
  },
  entrarVstt: {
    color: "white",
    width: 145,
  },
  criarCnt: {
    color: "white",
    width: 110,
  },
  entraVisitCriar: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  posImg: {
    alignItems: "center",
    top: -80,
  },
  img: {
    width: 70,
    height: 100,
  },
});

export default TelaLoginComponent;
