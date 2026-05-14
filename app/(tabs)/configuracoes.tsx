import { Ionicons } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../src/components/Button";
import { Colors, Spacing, Typography } from '../../src/constants/theme2';
import { useAuth } from "../../src/contexts/AuthContext";


export default function ConfiguracoesScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    // Confirmação antes de sair — boa UX para ação destrutiva
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await logout();
            // O NavigationGuard detecta isAuthenticated = false e
            // redireciona automaticamente para /(auth)/login
          },
        },
      ]
    );

    
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Configurações</Text>

        {/* Informações do usuário */}
        <View style={styles.perfilCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetra}>
              {user?.nome?.charAt(0).toUpperCase() ?? "?"}
            </Text>
          </View>
          <View>
            <Text style={styles.nome}>{user?.nome}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.containerOpsMenu}>
          <View style={styles.opsMenu}>
          <Ionicons name={"notifications"} size={30} color='orange' style={{margin: Spacing[1]}}/>
          <Text style={styles.textOpsMenu}>Notificações</Text>
          </View>
          
          <Ionicons name={"arrow-forward-circle-outline"} size={20} color={Colors.neutral[600]} style={{margin: Spacing[1]}}/>

        </View>
        

        <View style={styles.separator}></View>

        <View style={styles.containerOpsMenu}> 
          <View style={styles.opsMenu}>
          <Ionicons name={"color-palette"} size={30} color={Colors.primary[900]} style={{margin: Spacing[1]}}/>
          <Text style={styles.textOpsMenu}>Aparência</Text>
          </View>

          <Ionicons name={"arrow-forward-circle-outline"} size={20} color={Colors.neutral[600]} style={{margin: Spacing[1]}}/>

        </View>
        

        <View style={styles.separator}></View>

        <View style={styles.containerOpsMenu}>
          <View style={styles.opsMenu}>
          <Ionicons name={"help"} size={30} color='red' style={{margin: Spacing[1]}}/>
          <Text style={styles.textOpsMenu}>Ajuda</Text>
          </View>

          <Ionicons name={"arrow-forward-circle-outline"} size={20} color={Colors.neutral[600]} style={{margin: Spacing[1]}}/>

        </View>
        
        

        <View style={styles.separator}></View>


        {/* Espaçador */}
        <View style={{ flex: 1 }} />


        {/* Botão de logout */}
        <Button
          conteudo="Sair da conta"
          onPress={handleLogout}
          //variant="danger"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: Colors.background },
  container:   { flex: 1, padding: Spacing[6] },
  titulo:      { fontSize: 24, fontWeight: "bold", color: Colors.textPrimary, marginBottom: Spacing[6] },
  perfilCard:  { flexDirection: "row", alignItems: "center", gap: Spacing[4], padding: Spacing[4], backgroundColor: Colors.surface, borderRadius: 16, borderWidth: 1, borderColor: Colors.border },
  avatar:      { width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.primary[600], alignItems: "center", justifyContent: "center" },
  avatarLetra: { color: Colors.white, fontSize: 22, fontWeight: "bold" },
  nome:        { fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.textPrimary },
  email:       { fontSize: Typography.fontSize.sm, color: Colors.textSecondary },
  containerOpsMenu: {flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'},
  opsMenu:     {flexDirection: 'row', alignItems: 'center', marginVertical: Spacing[6], paddingVertical: Spacing[3]},// borderBottomWidth: 1, borderBottomColor: Colors.neutral[400]},
  textOpsMenu: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.textPrimary},
  separator:   { height: 1, marginHorizontal: Spacing[2], backgroundColor: Colors.neutral[400], opacity: 0.5,},
});