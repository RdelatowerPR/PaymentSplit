import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation, route }) {
    const [amountBeforeTax, setAmountBeforeTax] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [personsPay, setPersonsPay] = useState([]);
    const [totalTipAmount, setTotalTipAmount] = useState([]);

    useEffect(() => {
        // Log to debug the route parameters
        console.log("Route Parameters: ", route.params);

        if (route.params) {
            // Safely access personIndex or other parameters
            const personIndex = route.params.personIndex || 0; // Default to 0 or appropriate value
            const { personExpense, personTip } = route.params;
            setPersonsPay([...personsPay, personExpense]);
            setTotalTipAmount([...totalTipAmount, personTip]);
    
            // Clear the params after handling them
            route.params.personExpense = null;
            route.params.personTip = null;
        }
    }, [route.params]);
    

    const calculateRemainingBalance = () => {
        return (parseFloat(amountBeforeTax) + parseFloat(taxAmount)) - personsPay.reduce((a, b) => a + b, 0);
    };

    const totalTip = () => {
        return totalTipAmount.reduce((a, b) => a + b, 0);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Amount Before Tax"
                keyboardType="numeric"
                onChangeText={(text) => setAmountBeforeTax(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Tax Amount"
                keyboardType="numeric"
                onChangeText={(text) => setTaxAmount(text)}
            />
            <Text>Remaining Balance: {calculateRemainingBalance()}</Text>
            <Text>Total Tip Amount: {totalTip()}</Text>
            <Button
                title="Add Person"
                onPress={() => navigation.navigate('Person')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        width: '80%',
        padding: 10,
    },
});

export default HomeScreen;
