import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { Colors, Radius, Spacing, Typography } from '../constants/theme2';

type ButtonProps = {
  conteudo: string;
  onPress: () => void;
  fullWidth?: boolean;
  loading?: boolean; // quando for True, ícone aparece ícone e o botão é desabilitado
};

export default function Button(props: ButtonProps){
return(
    <Pressable style={[styles.button, props.fullWidth && {width: '100%'}]} onPress={props.onPress} disabled={props.loading}>
        {props.loading? 
            <ActivityIndicator color="white" size="small" /> :
            <Text style={styles.button_text}>{props.conteudo}</Text>
         }
    </Pressable>

);

}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary[600],
        borderRadius: Radius.md,
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Spacing[3],
        paddingHorizontal: Spacing[2],
        //marginHorizontal: Spacing[4],

    },

    button_text: {
        color: Colors.white,
        fontSize: Typography.fontSize.md,
        fontWeight: Typography.fontWeight.semibold,
    }

})
