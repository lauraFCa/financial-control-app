import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StatusBar, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import { useLoading } from '../Context';
import { Foundation } from '@expo/vector-icons';
import Storage from '../database/firebaseMethods';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 80 : 200

export default function AuthScreen({ navigation }) {
    const { showLoading, hideLoading } = useLoading();
    const fr = new Storage("allUsersDoc");

    //#region UseState
    const [allUsers, setAllUsers] = useState([]);

    const [signUpMessage, setSignUpMessage] = useState("");
    const [msgDisp, setMsgDisp] = useState(false)
    const [resetElement, setResetElement] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [icon, setIcon] = useState("eye-off");
    const [icon2, setIcon2] = useState("eye-off");

    const [isSingUp, setIsSignUp] = useState(false);

    //#endregion

    useEffect(() => {
        const getUsers = async () => {
            const auth = await AsyncStorage.getItem('isAuth');

            if (auth === "true") {
                navigation.navigate("Splash");
            } else {
                try {
                    showLoading();
                    var docs = await fr.getAllUsers();
                    setAllUsers(docs.users);
                    hideLoading();
                } catch (err) { console.log(err) } finally { hideLoading(); }
            }
        };
        getUsers();
    }, [])

    const clearFields = (clearMsg = true) => {
        setIsSignUp(false);
        if (clearMsg) {
            setMsgDisp(false);
            setSignUpMessage("");
        }
        setEmail("");
        setPassword("");
        setPassword2("");
        setResetElement(false);
        setShowPassword(false);
        setShowPassword2(false);
        setIcon("eye-off");
        setIcon2("eye-off");
    }

    const handleSignUp = async () => {
        Keyboard.dismiss();
        if (password === "" || email === "") {
            setSignUpMessage("O email/senha não podem estar vazios!");
            setMsgDisp(true);
        } else {
            setIsSignUp(true);
            if (password === password2) {
                try {
                    showLoading();
                    let shouldRegister = true;
                    if (allUsers != undefined) {
                        allUsers.forEach(element => {
                            if (element.email === email) {
                                shouldRegister = false;
                                setSignUpMessage("Email ja cadastrado!");
                            }
                        });
                    }

                    if (shouldRegister) {
                        await fr.createNewUser({
                            email: email,
                            pass: password
                        });

                        await fr.createNewUserDoc(email);
                        const fr2 = new Storage(email);
                        await fr2.updateDoc({
                            userData: {
                                email: email,
                                name: email
                            }
                        })
                        await AsyncStorage.setItem('isAuth', "true");
                        await AsyncStorage.setItem('isNew', "true");
                        await AsyncStorage.setItem('userDoc', email);
                        clearFields();
                        navigation.navigate('Splash');
                    }

                } catch (error) {
                    setSignUpMessage("Houve um problema no cadastro");
                    setMsgDisp(true);
                    console.log('Erro no cadastro:', error.message);
                } finally {
                    hideLoading();
                }
            } else {
                setSignUpMessage("As senhas são diferentes!");
                setMsgDisp(true);
            }
        }
    };

    const handleSignIn = async () => {
        Keyboard.dismiss();
        if (!email || email.trim() === "") {
            setSignUpMessage("O email nao pode estar vazio!");
            setMsgDisp(true);
        } else if (!password || password.trim() === "") {
            setSignUpMessage("A senha nao pode estar vazia!");
            setMsgDisp(true);
        } else {
            try {
                const userExists = allUsers.find(param => param.email === email);
                if (!userExists) {
                    setSignUpMessage("Email nao encontrado");
                    setMsgDisp(true);
                    clearFields(false);
                } else {
                    if (userExists.pass === password) {
                        await AsyncStorage.setItem('userDoc', email);
                        clearFields();
                        await AsyncStorage.setItem('isAuth', "true");
                        navigation.navigate('Splash');
                    } else {
                        setSignUpMessage("Senha incorreta");
                        setResetElement(true);
                    }
                }

            } catch (error) {
                console.error('Erro no login:', error.message);
            }
        }

    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        if (showPassword) {
            setIcon("eye-off");
        } else {
            setIcon("eye");
        }
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
        if (showPassword2) {
            setIcon2("eye-off");
        } else {
            setIcon2("eye");
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView style={{ marginTop: statusBarHeight }}>
                <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 32 }}>
                    <Image style={{ width: 100, height: 100 }} source={require('./../static/imgs/logo.png')} />
                </View>
                <View style={{ marginHorizontal: 10 }}>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.label}>Email:</Text>
                        <TextInput style={styles.input}
                            placeholder="Digite seu email"
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <Text style={styles.label}>Senha:</Text>
                        <View>
                            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eye}>
                                <Ionicons name={icon} size={34} color="darkblue" />
                            </TouchableOpacity>
                            <TextInput style={styles.input}
                                placeholder="Digite sua senha"
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={!showPassword}
                                value={password}
                                autoCapitalize="none"
                            />
                        </View>
                        {isSingUp ?
                            <View>
                                <TouchableOpacity onPress={togglePasswordVisibility2} style={styles.eye}>
                                    <Ionicons name={icon2} size={34} color="darkblue" />
                                </TouchableOpacity>
                                <TextInput style={styles.input}
                                    placeholder="Confirme sua senha"
                                    onChangeText={(text) => setPassword2(text)}
                                    secureTextEntry={!showPassword2}
                                    value={password2}
                                />
                            </View> : <Text></Text>
                        }
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
                        <Text style={{ textAlign: 'center' }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
                        <Text style={{ textAlign: 'center' }}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
                {(msgDisp ?
                    <View style={styles.msgDispSt}>
                        <Foundation name="x-circle" size={30} color="#8a0000" style={{ marginRight: 5 }} />
                        <Text style={{ color: '#8a0000', fontSize: 20 }}>{signUpMessage}</Text>
                    </View>

                    : <Text></Text>)}

                {resetElement ? <TouchableOpacity onPress={() => { alert("Que pena :(") }}>
                    <Text style={{ color: 'darkblue', textDecorationLine: 'underline', marginLeft: 16, fontSize: 18, marginTop: 16 }}>
                        Esqueci minha senha</Text>
                </TouchableOpacity> : <Text></Text>}
            </ScrollView >
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 24
    },
    input: {
        borderWidth: 1,
        borderColor: 'blue',
        padding: 10,
        fontSize: 18,
        marginBottom: 15
    },
    eye: {
        position: 'absolute',
        bottom: 10,
        right: 12,
        padding: 10,
        zIndex: 99
    },
    btn: {
        width: 200,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'darkblue',
        paddingVertical: 12,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 18
    },
    msgDispSt: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        paddingHorizontal: 5,
        flexWrap: 'wrap'
    }
})