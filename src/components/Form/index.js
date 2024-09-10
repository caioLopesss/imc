import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
} from "react-native";
import ResultImc from "../ResultImc";
import styles from "./style";

export default function Form() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErrorMessage] = useState("");

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

  function verificationImc() {
    if (imc === null) {
      Vibration.vibrate();
      setErrorMessage("Campo obrigatório");
    }
  }

  function validationImc() {
    if (height && weight) {
      imcCalculator();
      setHeight("");
      setWeight("");
      setMessageImc("Seu IMC é igual:");
      setTextButton("Calcular novamente");
      setErrorMessage("");
    } else {
      verificationImc();
      setImc(null);
      setTextButton("Calcular");
      setMessageImc("Preencha o peso e altura");
    }
  }

  return (
    <View style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHeight}
          value={height}
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Peso</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setWeight}
          value={weight}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.buttonCalculator}
          onPress={() => validationImc()}
        >
          <Text style={styles.textButtonCalculator}>{textButton}</Text>
        </TouchableOpacity>
      </View>
      <ResultImc messageResultImc={messageImc} resultImc={imc} />
    </View>
  );
}
