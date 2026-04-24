import { KeyboardAvoidingView, Platform, Text, StyleSheet, View, Image, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
//import { Colors, Spacing, Radius, Typography } from '@/constants/theme2';
//import Button from '@/components/Button';
//import Input from '@/components/Input';

import Button from '../../src/components/Button';
import Input from '../../src/components/Input';
import { Colors, Spacing, Radius, Typography } from '../../src/constants/theme2';

import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";


export default function RecuperarSenhaScreen () {
    const [recuperar, setRecuperar] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleClickRecuperar () {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setRecuperar(true);
        }, 2000);
    
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary[100]}}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.primary[100]}/>
            <KeyboardAvoidingView  style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.container}>
                    <View style={{ alignItems: 'center', marginBottom: Spacing[3] }}>
                        <Image
                        source={require('../../assets/images/logo_proestoque.png')}
                        style={{width: 200, height:200}}/>
                        
                        <Text style={styles.titulo_pagina}>Recuperar Senha</Text>
                    </View>

                    <View style={styles.form}>
                        <View>
                        {recuperar ? <MsgRecuperacaoOK/> : <FormRecuperarSenha/>}
                        </View>

                        <Button conteudo={loading? "Enviando..." : recuperar? "Voltar ao Login" : "Recuperar"}
                        onPress={loading? () => {} : recuperar? () => router.push("/(auth)/login") : handleClickRecuperar } fullWidth/>

                        {!recuperar && (
                            <TouchableOpacity
                            onPress={() => router.push("/(auth)/login")}
                            activeOpacity={0.6}>
                            <Text style={styles.login}>Voltar ao Login</Text>
                        </TouchableOpacity>
                        )}
                    </View>
                    
                    
                </View>

            </KeyboardAvoidingView>

        </SafeAreaView>

    );
}

function FormRecuperarSenha () {
    return (
        <View>
            <View style={{gap: Spacing[3], marginBottom: Spacing[8]}} >
                <Text style={styles.info_text}>Informe seu e-mail e encaminharemos um link de recuperação</Text>
                <Input placeholder="E-mail" icon="mail-outline"/>
            </View>

            
        </View>


    );
}

function MsgRecuperacaoOK () {
    return (
        <View style={styles.notif_success}>
            <Ionicons name='mail' size={50}/>

            <Text style={{fontWeight: 'bold', fontSize: 20, color: Colors.success.text}}>E-mail enviado</Text>
            <Text>Verifique sua caixa de entrada</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        padding: 20,
    },

    form:{
        paddingVertical: Spacing[6],
        paddingHorizontal: Spacing[2],
        gap: Spacing[3], 
        marginVertical: Spacing[3],
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,

         // iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,

        // Android
        elevation: 3,
    },

    titulo_pagina: {
        fontSize: Typography.fontSize.xl,
        color: Colors.primary[600],
        fontWeight: Typography.fontWeight.bold,
        padding: Spacing[1],
        borderWidth: 2,
        borderColor: Colors.primary[600],
    },

    info_text: {
        textAlign: 'center',
        color: Colors.black,
    },

    login: {
        marginTop: Spacing[3],
        alignSelf: 'center',
        color: Colors.primary[600],
        fontWeight: Typography.fontWeight.semibold,
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary[600],
    },

    notif_success : {
        marginHorizontal: Spacing[2],
        marginTop: Spacing[3],
        marginBottom: Spacing[8],
        padding: Spacing[2],
        borderWidth: 2,
        borderColor: Colors.success.border,
        borderRadius: Radius.md,
        alignItems: 'center',
        backgroundColor: Colors.success.bg,

    },

});
