import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const PersonScreen = ({ route, navigation }) => {
    const { personIndex, person } = route.params;

    // Initialize local state for person's data
    const [localPerson, setLocalPerson] = useState(person);
    const updateField = (field, value) => {
        // Handling for order amount and tip percentage
        if (field === 'orderAmount' || field === 'tipPercentage') {
            const numericValue = value === '' ? '' : parseFloat(value);
            if (!isNaN(numericValue) || value === '') {
                setLocalPerson({ ...localPerson, [field]: numericValue });
            }
        } else {
            setLocalPerson({ ...localPerson, [field]: value });
        }
    };
    const goToNextPerson = () => {
        const nextPersonIndex = personIndex + 1;
        // Navigate to the next screen or person screen
        navigation.navigate('PersonScreen', { personIndex: nextPersonIndex });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Person ${personIndex + 1}`}</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter order amount"
                value={localPerson.orderAmount?.toString()}
                onChangeText={text => updateField('orderAmount', text)}
                keyboardType="numeric"
            />
            <TextInput 
                style={styles.input}
                placeholder="Enter tip percentage"
                value={localPerson.tipPercentage?.toString()}
                onChangeText={text => updateField('tipPercentage', text)}
                keyboardType="numeric"
            />
            <Button title="Next Person" onPress={goToNextPerson} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 20,
        marginBottom: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        width: '100%',
        paddingHorizontal: 10
    }
});

export default PersonScreen;
