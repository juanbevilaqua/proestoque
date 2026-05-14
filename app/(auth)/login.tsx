import { Alert, Image, Text, View } from "react-native";
//import Button from '@/components/Button';
//import Button from '@/components/Button';
//import Input from '@/components/Input';

import Button from '../../src/components/Button';
import Input from '../../src/components/Input';
import { Colors, Radius, Spacing, Typography } from '../../src/constants/theme2';

import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//import { Colors, Spacing, Radius, Typography } from '@/constants/theme2';
import { router } from "expo-router";
import { useState } from "react";
import { useAuth } from "../../src/contexts/AuthContext";


export default function LoginScreen(){
    const { login, isLoading } = useAuth(); // ← hook do contexto
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = async () => {
        if (!email.trim() || !senha.trim()) {
        Alert.alert("Atenção", "Preencha e-mail e senha.");
        return;
        }

        try {
        await login(email, senha); // ← chama o login do contexto
        // O NavigationGuard detecta isAuthenticated = true e redireciona
        // automaticamente para /(tabs) — NÃO precisa de router.replace aqui!
        } catch (error) {
        Alert.alert("Erro", "E-mail ou senha inválidos.");
        }
    };
    
    
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary[100]}}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.primary[100]}/>
            <KeyboardAvoidingView  style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}   >
                <View style={styles.container}>
                    <View style={{ alignItems: 'center', marginBottom: Spacing[3] }}>
                        <Image
                        source={require('../../assets/images/logo_proestoque.png')}
                        style={{width: 200, height:200}}
                        //contentFit="contain"
                    />

                    {/*<Text style={styles.welcome_msg}>Bem-vindo de volta</Text>*/}
                    </View>

                    <View style={styles.form}>
                    <View>
                        <Input placeholder="Digite seu e-mail" icon="mail-outline" value={email} onChangeText={setEmail}/>
                        <Input placeholder="Digite sua senha" icon="lock-closed-outline" value={senha} onChangeText={setSenha} isPassword onSubmitEditing={handleLogin}/>
                        
                        {/* RECUPERAR SENHA */}
                        <TouchableOpacity
                            onPress={() => router.push("/(auth)/recuperar-senha")}
                            activeOpacity={0.6} // 0 = transparente total, 1 = sem efeito (padrão: 0.2)
                            >
                            <Text style={styles.forget_password}>Esqueci minha senha</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <Button conteudo="Entrar" onPress={handleLogin} fullWidth loading={isLoading}/>

                    {/* CRIAR CONTA */}
                    <TouchableOpacity
                        onPress={() => router.push("/(auth)/cadastro")}
                        activeOpacity={0.6} // 0 = transparente total, 1 = sem efeito (padrão: 0.2)
                        >
                        <Text style={styles.sig_in}>Não tem uma conta? Cadastre-se</Text>
                    </TouchableOpacity>

                    </View>
                    
                </View>

            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        padding: 20,
        //backgroundColor: 'red',
    },

    form:{
        paddingVertical: Spacing[6],
        paddingHorizontal: Spacing[2],
        gap: Spacing[3], 
        marginBottom: Spacing[5], 
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

    forget_password:{
        marginTop: Spacing[2],
        marginBottom: Spacing[4],
        alignSelf: 'center',
        color: Colors.primary[500],
        fontWeight: Typography.fontWeight.bold,
        //borderBottomWidth: 1,
        //borderBottomColor: Colors.primary[500],
    },

    sig_in: {
        marginTop: Spacing[2],
        alignSelf: 'center',
        color: Colors.primary[600],
        fontWeight: Typography.fontWeight.semibold,
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary[600],
    },

    welcome_msg: {
        fontSize: Typography.fontSize.xl,
        color: Colors.primary[600],
        fontStyle: 'italic',
        padding: Spacing[1],
        borderWidth: 2,
        borderColor: Colors.primary[600],

    },

});
