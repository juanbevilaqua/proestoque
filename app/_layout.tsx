import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { Image, Text, View } from 'react-native';
import 'react-native-reanimated';
import Button from '../src/components/Button';
import { Colors, Spacing } from '../src/constants/theme2';
import { AuthProvider, useAuth } from "../src/contexts/AuthContext";


SplashScreen.preventAutoHideAsync();

function NavigationGuard() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments(); // ['(auth)', 'login'] ou ['(tabs)', 'index']
  const router = useRouter();
  const navigationState = useRootNavigationState();


  useEffect(() => {
    console.log(" useEffect disparou:", {
      isAuthenticated,
      isLoading,
      segments,
      navigationStateKey: navigationState?.key,
    });

    if (!isLoading) {
      SplashScreen.hideAsync();
    }

    // Aguarda o navegador estar pronto e Não faz nada enquanto o AsyncStorage ainda está sendo lido
    if (!navigationState?.key || isLoading) {
      console.log("⏳ Aguardando...");
      return;
    } 
    //if (isLoading) return;

    //if (!segments || segments[0] === undefined) {
    //console.log("⏳ Aguardando segments...");
    //return;
    //}

    // Verifica se a rota atual está dentro do grupo (auth)
    const estaNoGrupoAuth = segments[0] === "(auth)";
    console.log("🗺️ estaNoGrupoAuth:", estaNoGrupoAuth);

    const semRota = segments[0] === undefined;

    if (isAuthenticated && (estaNoGrupoAuth || semRota)) {
      router.replace("/(tabs)");
    }
    else if (!isAuthenticated && !estaNoGrupoAuth) {
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, isLoading, segments, navigationState?.key]);



  // Enquanto lê o AsyncStorage, exibe um loading no lugar de qualquer tela
  if (isLoading) {
    return (

        <View style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary[100],
        zIndex: 999,
        padding: Spacing[4],
      }}>

      <View style={{ alignItems: 'center', marginBottom: Spacing[3] }}>
            <Image
            source={require('../assets/images/logo_proestoque.png')}
            style={{width: 200, height:200}}/>
      </View>

        <Text style={{alignSelf:'center', color: Colors.textSecondary, marginBottom: Spacing[8]}}>Carregando...</Text>

        <Button conteudo="Entrar" onPress={ () => {}} fullWidth loading={isLoading}/>
        

        {/*<ActivityIndicator size="large" color={Colors.primary[600]} />*/}
      </View>


      
    );
  }

  // Não renderiza nada extra — o Stack continua como antes
  return null;
}



export default function RootLayout(){
  return (
    <AuthProvider>
        <NavigationGuard/>

        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>

        


    </AuthProvider>

  );
}

/*import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}*/
