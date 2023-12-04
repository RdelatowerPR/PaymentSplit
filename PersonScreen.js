import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const PersonScreen = ({ route, navigation }) => {
    const { personIndex, person, handlePersonChange, handleNextPerson } = route.params;

    const updateField = (field, value) => {
        handlePersonChange(personIndex, field, value);
    };

    const goToNextPerson = () => {
        handleNextPerson(personIndex, navigation);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Person ${personIndex + 1}`}</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter order amount"
                value={person.orderAmount.toString()}
                onChangeText={text => updateField('orderAmount', text)}
                keyboardType="numeric"
            />
            <TextInput 
                style={styles.input}
                placeholder="Enter tip percentage"
                value={person.tipPercentage.toString()}
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
