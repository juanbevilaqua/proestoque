import { Pressable, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Radius, Typography } from '../constants/theme2';

type ButtonProps = {
  conteudo: string;
  onPress: () => void;
  fullWidth?: boolean;
};

export default function Button(props: ButtonProps){
return(
    <Pressable style={[styles.button, props.fullWidth && {width: '100%'}]} onPress={props.onPress}>
        <Text style={styles.button_text}>{props.conteudo}</Text>
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

    },

    button_text: {
        color: Colors.white,
        fontSize: Typography.fontSize.md,
        fontWeight: Typography.fontWeight.semibold,
    }

})
