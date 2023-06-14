import React, { useEffect, useState } from "react";
import { FlatList, View, Pressable } from "react-native";
import { Avatar, List, TextInput } from "react-native-paper";

const TelaPoliticos = ({ navigation }) => {
  const [politicos, setPoliticos] = useState([]);
  const [politicoFiltrado, setPoliticoFiltrado] = useState([]);
  const [text, setText] = useState("");



  // const iderlan = {
  //   email: "iderlandopovo@riolargo.al.leg.br",
  //   id: 40000,
  //   idLegislatura: 57,
  //   nome: "Iderlan Oliveira",
  //   siglaPartido:"PSB",
  //   siglaUf: "AL",
  //   uri: "https://dadosabertos.camara.leg.br/api/v2/deputados/220593",
  //   uriPartido:"https://dadosabertos.camara.leg.br/api/v2/partidos/37906",
  //   urlFoto: "https://media.licdn.com/dms/image/C4D03AQGMm74CmOz2lA/profile-displayphoto-shrink_800_800/0/1625110203335?e=2147483647&v=beta&t=mEqXE7NBHg80cMwCq222B4RgL9wQdDJCK6CsdB3kY4w"
  // };w

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome"
        );
        const json = await response.json();
        //setPoliticos([...json.dados, iderlan]);
        setPoliticos(json.dados)
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    const nomeBuscado = politicos.filter((item) =>
      item.nome.toLowerCase().includes(text.toLowerCase())
    );
    setPoliticoFiltrado(nomeBuscado);
  }, [text, politicos]);

  const ComponentFiltrados = () => {
    if (politicoFiltrado <= 0)
      <FlatList
        data={[]}
        keyExtractor={() => ""}
        renderItem={() => <View />} // Renderiza uma View vazia
      />;

    return (
      <FlatList
        data={politicoFiltrado}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("telaPolitico", {
                chaveValor: item,
              });
            }}
          >
            <List.Item
              title={item.nome}
              description={`${item.siglaPartido}/${item.siglaUf}`}
              left={(props) => <Avatar.Image source={{ uri: item.urlFoto }} />}
            />
          </Pressable>
        )}
      />
    );
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TextInput
        style={{ backgroundColor: "#a3c152" }}
        activeUnderlineColor="black"
        label="Nome do deputado federal"
        value={text}
        onChangeText={(text) => setText(text)}
      />

      <ComponentFiltrados />
    </View>
  );
};

export default TelaPoliticos;
