import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Books = ({ navigation }) => {
    const book = navigation.getParam('book', {
        title: '',
        description: '',
        read: false,
        photo: ''
    });

    const isEdit = navigation.getParam('isEdit', false);

    const [title, setTitle] = useState(book.title);
    const [description, setDescription] = useState(book.description);
    const [photo, setPhoto] = useState(book.photo);
    const [read, setRead] = useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('books').then(data => {
            const book = JSON.parse(data);
            setBooks(book);
        });
        console.log(books);
    }, []);

    const isValid = () => {
        if ((title !== undefined) && (title !== '')) {
            return true;
        }

        return false;
    }

    const onSave = async () => {
        if (isValid()) {
            if (isEdit) {
                // Editar Livro
                const bs = books;

                bs.map(item => {
                    if (item.id === book.id) {
                        item.title = title;
                        item.description = description;
                        item.read = read;
                        item.photo = photo;
                    }
                    return item;
                });

                await AsyncStorage.setItem('books', JSON.stringify(bs));
            } else {
                // Cadastrar Livro
                try {
                    const id = Math.random(5000).toString();

                    const data = {
                        id,
                        title,
                        description,
                        read,
                        photo,
                    };


                    books.push(data);

                    await AsyncStorage.setItem('books', JSON.stringify(books));
                } catch (err) {
                    console.log('Err: ' + err);
                }
            }

            navigation.goBack();
        } else {
            console.log('Inválido!');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inclua seu novo livro.</Text>

            <TextInput
                style={styles.input}
                placeholder="Título"
                value={title}
                onChangeText={(text) => {
                    setTitle(text)
                }}
            />

            <TextInput
                style={styles.input}
                placeholder="Descrição"
                multiline={true}
                numberOfLines={4}
                value={description}
                onChangeText={(text) => {
                    setDescription(text)
                }}
            />

            <TouchableOpacity style={styles.photoButton}>
                <Icon name="photo-camera" size={30} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.registerButton, (!isValid()) ? styles.registerButtonInvalid : '']}
                onPress={onSave}
            >
                <Text style={styles.registerButtonText}>{isEdit ? 'Atualizar' : 'Cadastrar'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 30,
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        marginBottom: 30,
        color: '#3498db',
        fontWeight: 'bold',
    },
    input: {
        fontSize: 18,
        borderBottomColor: '#f39c12',
        borderBottomWidth: 3,
        marginBottom: 15,
    },
    photoButton: {
        backgroundColor: '#f39c12',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        alignSelf: 'center',
        marginVertical: 30,
    },
    registerButton: {
        backgroundColor: '#f39c12',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 30,
    },
    registerButtonInvalid: {
        backgroundColor: 'rgba(243,156,18, 0.5)'
    },
    registerButtonText: {
        color: '#FFF',
        fontSize: 22,
    },
    cancelButton: {
        borderColor: '#95a5a6',
        width: 200,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 50,
        paddingVertical: 10,
        alignSelf: 'center',
    },
    cancelButtonText: {
        color: '#95a5a6',
        fontSize: 22,
    }
});

export default Books;