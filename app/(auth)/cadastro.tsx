import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { Colors, Spacing, Radius, Typography } from '../../constants/theme2';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useState } from "react";


export default function CadastroScreen(){
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const senhasIguais = senha === confirmarSenha;
    const [loading, setLoading] = useState(false)

    function handleClickCriarConta () {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary[100]}}>
             {/*keyboardDismissMode="on-drag"*/}
            <StatusBar barStyle="dark-content" backgroundColor={Colors.primary[100]}/>
            <KeyboardAvoidingView  style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    {/* CABEÇALHO */}
                    <View style={{ alignItems: 'center', marginBottom: Spacing[3] }}>
                        <Image
                        source={require('../../assets/images/logo_proestoque.png')}
                        style={{width: 200, height:200}}/>
                        
                        <Text style={styles.titulo_pagina}>Criar Conta</Text>
                    </View>

                    {/* FORMULÁRIO DE CADASTRO */}
                    
                    <View style={styles.form}>
                        <View style={{gap: Spacing[3], marginBottom: Spacing[6]}}>
                        <Input placeholder="Nome completo" icon="person-outline"></Input>
                        <Input placeholder="E-mail" icon="mail-outline"/>
                        <Input placeholder="Senha" icon="lock-closed-outline" value={senha} onChangeText={setSenha} isPassword/>
                        <Input placeholder="Confirme sua senha" icon="lock-closed-outline" value={confirmarSenha} onChangeText={setConfirmarSenha} isPassword error={confirmarSenha.length > 0 && !senhasIguais}/>  
                    
                        {confirmarSenha.length > 0 && !senhasIguais && (
                        <Text style={styles.text_password_error}>
                            As senhas não coincidem
                        </Text>
                        )}
                        </View>

                    <Button conteudo={loading ? 'Carregando...' : 'Criar conta'} onPress={handleClickCriarConta} fullWidth/>

                        <TouchableOpacity
                            onPress={() => router.push("/(auth)/login")}
                            activeOpacity={0.6}>
                            <Text style={styles.login}>Já tenho conta</Text>
                        </TouchableOpacity>
                    </View>
                    
                </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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

    login: {
        marginTop: Spacing[2],
        alignSelf: 'center',
        color: Colors.primary[600],
        fontWeight: Typography.fontWeight.semibold,
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary[600],
    },

    text_password_error: {
        color: Colors.danger.text, 
        marginTop: Spacing[1],
        paddingHorizontal: Spacing[4],
    },

})