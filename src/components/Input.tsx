import { Pressable, Text, StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Radius, Typography } from '../constants/theme2';
import { View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";


type InputProps = {
    placeholder: string;
    icon?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    isPassword?: boolean;
    error?: boolean;
    
};

export default function Input(props: InputProps){
    const [secure, setSecure] = useState(props.isPassword);

    return(
        <View style={[styles.container, props.error && styles.errorContainer]}>

            {props.icon && (
                <Ionicons name={props.icon as any} size={20} color={Colors.textSecondary} style={styles.icon}/>
            )}

            <TextInput placeholderTextColor={Colors.textSecondary} style={styles.input} placeholder={props.placeholder} 
                value={props.value} onChangeText={props.onChangeText} secureTextEntry={secure}/>

            {/*Botão de ocultar*/}
            {props.isPassword && (
                <Pressable onPress={() => setSecure(!secure)}>
                    <Ionicons name={secure ? 'eye-off-outline' : 'eye-outline'} size={20} color="#999"/>
                </Pressable>
            )}
        </View>

    
    );
    
}


const styles = StyleSheet.create({

    container: {
        flexDirection: 'row', // 👈 chave
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary[600],
        paddingVertical: Spacing[1],
        paddingHorizontal: Spacing[4],
        marginHorizontal: Spacing[4],

    },

    errorContainer: {
    borderBottomColor: Colors.danger.border,
    },

    icon: {
        marginRight: Spacing[2],
    },

    input: {
        flex: 1,
        //width: 275,
        //borderBottomWidth: 1,
        //borderBottomColor: Colors.primary[600],

        //paddingVertical: Spacing[5],
        color: Colors.neutral[900],
        fontSize: Typography.fontSize.base,

        backgroundColor: 'transparent',
    }

})