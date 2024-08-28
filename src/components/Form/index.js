import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import ResultImc from "./ResultImc";

export default function Form() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [messageImc, setMessageImc] = useState("preencha o peso e altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");

  function imcCalculator() {
    const heightNumber = parseFloat(height);
    const weightNumber = parseFloat(weight);
    if (!isNaN(weightNumber) && !isNaN(heightNumber) && heightNumber !== 0) {
      const calculatedImc = (
        weightNumber /
        (heightNumber * heightNumber)
      ).toFixed(2);
      setImc(calculatedImc);
    } else {
      setImc(null);
    }
  }

  function validationImc() {
    if (height && weight) {
      imcCalculator();
      setHeight("");
      setWeight("");
      setMessageImc("Seu imc é igual:");
      setTextButton("Calcular novamente");
    } else {
      setImc(null);
      setTextButton("Calcular");
      setMessageImc("preencha o peso e altura");
    }
  }

  return (
    <View>
      <View>
        <Text>Altura</Text>
        <TextInput
          onChangeText={setHeight}
          value={height}
          keyboardType="numeric"
        />
        <Text>Peso</Text>
        <TextInput
          onChangeText={setWeight}
          value={weight}
          keyboardType="numeric"
        />
        <Button title={textButton} onPress={validationImc} />
      </View>
      <ResultImc messageResultImc={messageImc} resultImc={imc} />
    </View>
  );
}
