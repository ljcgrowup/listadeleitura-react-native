import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Main = ({ navigation }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('books').then(data => {
            const book = JSON.parse(data);
            setBooks(book);
        });
    }, []);

    const onNewBook = () => {
        navigation.navigate('Books');
    }

    const onBookEdit = (bookId) => {
        const book = books.find(item => item.id === bookId);
        navigation.navigate('Books', { book: book, isEdit: true });
    }

    const onBookDelete = async (bookId) => {
        try {
            const newBooks = books.filter(item => item.id !== bookId);
            await AsyncStorage.setItem('books', newBooks);
            setBooks(newBooks);
        } catch (error) {
            console.log('Err: ' + error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Lista de Leitura</Text>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={onNewBook}>
                    <Icon name="add" size={30} color="#FFF" />
                </TouchableOpacity>
            </View>


            <FlatList
                data={books}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemsContainer}>
                        <TouchableOpacity style={styles.itemButton}>
                            <Text style={styles.itemText}>{item.title}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => {
                                onBookEdit(item.id)
                            }}>
                            <Icon name="create" size={26} color="#2ecc71" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => {
                                onBookDelete(item.id)
                            }}>
                            <Icon name="delete" size={26} color="#e74c3c" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    header: {
        flexDirection: 'row',
        margin: 5,
    },
    title: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#3498db',
    },
    addButton: {
        backgroundColor: '#3498db',
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemsContainer: {
        flexDirection: 'row',
    },
    itemButton: {
        flex: 1,
    },
    itemText: {
        fontSize: 22,
    },
    editButton: {

    },
    deleteButton: {

    },
});

export default Main;