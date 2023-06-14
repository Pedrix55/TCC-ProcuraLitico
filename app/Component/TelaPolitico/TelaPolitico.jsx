import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, FlatList, ScrollView} from "react-native";
import { List, Card, Text } from "react-native-paper";
import { GASTOS_FAKE } from "../Utils/DataFake";
import Loading from "../Loading/Loading";


const TelaPolitico = ({ route }) => {
  //  console.log(route.params.chaveValor)
  /* console.log(route); */
  const dadosPolitico = route?.params?.chaveValor;
  console.log(dadosPolitico);
  /* console.log(dadosPolitico); */
  //console.log(dadosPolitico.uri.dados.gabinete.email);

  const [data, setData] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const valorTotal = 0
  let acumulador = 0

  data?.map(gasto => {  
    gasto.valorDocumento 
  let valorIndividual = gasto.valorDocumento
  acumulador+=valorIndividual
  console.log(acumulador)
  })

  // Substituido pela linha 26 à 40 | Se utilizando de IIFE
  // const showMoreData = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://dadosabertos.camara.leg.br/api/v2/deputados/${dadosPolitico.id}/despesas`
  //     );
  //     const json = await response.json();
  //     //console.log(json.dados);
  //     setData(json.dados);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    //Utilizando de IIFE -> Immediately Invoked Function Expression
    (async () => {
      try {
        const response = await fetch(
          `https://dadosabertos.camara.leg.br/api/v2/deputados/${dadosPolitico.id}/despesas`
        );
        const json = await response.json();
        //console.log(json.dados);

        if (json?.dados) setData(json.dados);
        else {
          setData(GASTOS_FAKE);
        }
      } catch (error) {
        console.error("error:" + error);
      }
  

    })();
  }, []);


  // const gastoTotal = ()=>{
   
  // }
  // gastoTotal()
  console.log(data);
  if( data.length > 0){
    return (
      <View style={{ flex: 1 }}>
        <View style={style.content}>
          <View style={{ height: 260, width: 200}}>
            <Image
              style={style.image}
              source={{ uri: `${dadosPolitico.urlFoto}` }}
            />
          </View>
          <View style={style.contentPrimary}>
            <Card.content>
              <Text style={style.title} variant={dadosPolitico.nome}></Text>
              <Text style={style.description} variant={`${dadosPolitico.siglaPartido}/${dadosPolitico.siglaUf}`}></Text>
              <Text style={style.description} variant={`${dadosPolitico.email}`}></Text>
            </Card.content>
          </View>
        </View>
        <ScrollView>
          {data?.map((despesa, i) => (
            <View stlye={style.contentSecondary} key={i}>
              <Text style={style.tipoDespesa}>{despesa.tipoDespesa}</Text>
              <Text style={style.descriptionDespesa}>
                Ano: {despesa.ano} | mes: {despesa.mes} | gasto:{" "}
                <Text style={style.valoresDespesa}>R${despesa.valorDocumento}</Text>
              </Text>
            </View>
          ))}
          <View>
          <Text style={style.total}>Gasto total:{" "}
            <Text style={style.valoresDespesa}>R${acumulador.toFixed(2)}</Text>
          </Text>
          </View>
        </ScrollView>
      </View>
    );
  }else{
    return (
      <View style={{ flex: 1 }}>
        <View style={style.content}>
          <View style={{ height: 260, width: 200}}>
            <Image
              style={style.image}
              source={{ uri: `${dadosPolitico.urlFoto}` }}
            />
          </View>
          <View style={style.contentPrimary}>
            <Text style={style.title}>{dadosPolitico.nome}</Text>
            <Text style={style.description}>{dadosPolitico.siglaPartido}</Text>
            <Text style={style.description}>{dadosPolitico.email}</Text>
          </View>
        </View>
        <View style={{flex:1}}>
            <Loading/>
        </View>
        

      </View>
    )
  }
 
};
const style = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  content: {
    display: "flex",
    //backgroundColor: 'red',
    flexDirection: "row",
  },
  contentPrimary:{
    justifyContent: "center",
    alignItems: "center",

  },
  contentSecondary:{
    backgroundColor: "black",
  },
  tipoDespesa:{
    fontWeight: "bold",
    marginLeft: 10
  },
  descriptionDespesa:{
    marginLeft: 10,
  },
  valoresDespesa:{
    color: "green"
  },
  total:{
    fontWeight: "bold",
    marginLeft: 10,
  },
  loading:{
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    fontWeight: "bold"
  }
});
export default TelaPolitico;
