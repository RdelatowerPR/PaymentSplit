import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function HomeScreen({ navigation }) {
    const [totalAmount, setTotalAmount] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const [people, setPeople] = useState([]);
    const [remainingBalance, setRemainingBalance] = useState(0);

    const handleSubmitTotalAndTax = () => {
        const totalWithTax = parseFloat(totalAmount) + parseFloat(taxAmount);
        setRemainingBalance(totalWithTax);
        const parsedNumberOfPeople = parseInt(numberOfPeople);
        setNumberOfPeople(parsedNumberOfPeople);
        setPeople(Array.from({ length: parsedNumberOfPeople }, () => ({ orderAmount: 0, tipPercentage: 0 })));
    };

    const handlePersonChange = (index, field, value) => {
        const updatedPeople = [...people];
        updatedPeople[index] = { ...updatedPeople[index], [field]: parseFloat(value) };
        setPeople(updatedPeople);
    };

    const handleNextPerson = (currentIndex) => {
        if (currentIndex < numberOfPeople - 1) {
            navigation.navigate('Person', { 
                personIndex: currentIndex, 
                person: people[currentIndex], 
                handlePersonChange, 
                handleNextPerson 
            });
        } else {
            calculateFinalAmounts();
        }
    };

    const calculateTaxShare = () => {
        return parseFloat(taxAmount) / numberOfPeople;
    };

    const calculateFinalAmounts = () => {
        const taxShare = calculateTaxShare();
        const updatedPeople = people.map(person => ({
            ...person,
            total: person.orderAmount + taxShare + (person.orderAmount * person.tipPercentage / 100)
        }));
        setPeople(updatedPeople);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Text>Payment Split App</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter total amount before tax"
                onChangeText={text => setTotalAmount(text)} 
                keyboardType="numeric"
            />
            <TextInput 
                style={styles.input}
                placeholder="Enter total tax amount"
                onChangeText={text => setTaxAmount(text)} 
                keyboardType="numeric"
            />
            <TextInput 
                style={styles.input}
                placeholder="Enter number of people"
                onChangeText={text => setNumberOfPeople(text)} 
                keyboardType="numeric"
            />
            <Button title="Submit Total and Tax" onPress={handleSubmitTotalAndTax} />

            <ScrollView>
                {people.map((person, index) => (
                    <View key={index} style={styles.personView}>
                        <Text>{`Person ${index + 1}: Total - $${person.total ? person.total.toFixed(2) : '0.00'}`}</Text>
                    </View>
                ))}
            </ScrollView>

            <Button title="Add Person Details" onPress={() => handleNextPerson(0)} />
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        width: '100%',
        paddingHorizontal: 10
    },
    personView: {
        marginVertical: 5
    }
});
