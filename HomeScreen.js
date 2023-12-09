import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Keyboard } from 'react-native';

function HomeScreen({ navigation }) {
    const [amountBeforeTax, setAmountBeforeTax] = useState('');
    const [taxAmount, setTaxAmount] = useState('');
    const [people, setPeople] = useState([]);

    const addPerson = () => {
        setPeople([...people, { name: '', spent: '', tip: '', taxShare: 0 }]);
    };

    const updatePerson = (index, field, value) => {
        const updatedPeople = [...people];
        updatedPeople[index] = { ...updatedPeople[index], [field]: value };
        setPeople(updatedPeople);
        calculateTaxShare(updatedPeople);
    };

    const calculateTaxShare = (updatedPeople) => {
        const totalSpent = updatedPeople.reduce((total, person) => total + parseFloat(person.spent || 0), 0);
        updatedPeople.forEach(person => {
            const spent = parseFloat(person.spent || 0);
            person.taxShare = (spent / totalSpent) * parseFloat(taxAmount || 0);
        });
        setPeople(updatedPeople);
    };

    const calculateRemainingBalance = () => {
        const totalSpent = people.reduce((total, person) => total + parseFloat(person.spent || 0), 0);
        return parseFloat(amountBeforeTax || 0) + parseFloat(taxAmount || 0) - totalSpent;
    };

    const totalTip = () => {
        return people.reduce((total, person) => total + parseFloat(person.tip || 0), 0);
    };

    return (
        <ScrollView style={styles.container}>
            <Text>Subtotal</Text>
            <TextInput
                style={styles.input}
                placeholder="Amount Before Tax (subtotal)"
                keyboardType="numeric"
                onChangeText={setAmountBeforeTax}
                value={amountBeforeTax}
            />
            <Text>Taxes</Text>
            <TextInput
                style={styles.input}
                placeholder="Tax Amount"
                keyboardType="numeric"
                onChangeText={setTaxAmount}
                value={taxAmount}
            />
            {people.map((person, index) => (
                <View key={index} style={styles.personContainer}>
                    <Text>Person {index + 1}</Text>
                    <Text>Tax Share: {person.taxShare.toFixed(2)}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        onChangeText={(text) => updatePerson(index, 'name', text)}
                        value={person.name}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Spent Amount"
                        keyboardType="numeric"
                        onChangeText={(text) => updatePerson(index, 'spent', text)}
                        value={person.spent}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Desired Tip"
                        keyboardType="numeric"
                        onChangeText={(text) => updatePerson(index, 'tip', text)}
                        value={person.tip}
                    />
                </View>
            ))}
            <Button title="Add Person" onPress={addPerson} />
            <Text>Remaining Balance: {calculateRemainingBalance().toFixed(2)}</Text>
            <Text>Total Tip Amount: {totalTip().toFixed(2)}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        width: '100%',
        padding: 10,
    },
    personContainer: {
        marginBottom: 15,
    },
});

export default HomeScreen;

