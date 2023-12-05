import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

function PersonScreen({ navigation }) {
    const [personExpense, setPersonExpense] = useState(0);
    const [personTip, setPersonTip] = useState(0);

    const handleDone = () => {
        navigation.navigate('Home', { personExpense: parseFloat(personExpense), personTip: parseFloat(personTip) });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Person's Expense"
                keyboardType="numeric"
                onChangeText={(text) => setPersonExpense(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Person's Tip Amount"
                keyboardType="numeric"
                onChangeText={(text) => setPersonTip(text)}
            />
            <Button
                title="Done"
                onPress={handleDone}
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

export default PersonScreen;