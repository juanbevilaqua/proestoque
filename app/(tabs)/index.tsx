import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CATEGORIAS_MOCK, getTotalCategorias } from "src/types/Categoria";
import { formatarPreco, getProdutosComEstoqueBaixo, getTotalProdutos, getValorTotalEstoque, PRODUTOS_MOCK } from "src/types/Produto";
import { Colors, Radius, Spacing, Typography } from '../../src/constants/theme2';

//import Button from '@/components/Button';
//import Input from '@/components/Input';

type CardResumo = {
  id: string;
  titulo: string;
  valor: string | number;
  icone: keyof typeof Ionicons.glyphMap;
  corIcone: string;
};

export default function HomeScreen(){
 const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => { // Atualiza data e hora
      setNow(new Date());
    }, 10000);

    return () => clearInterval(interval);
  }, []);


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => { // Função para refresh da página
  setRefreshing(true);

  // Chamar API futuramente
  setTimeout(() => {
    setRefreshing(false);
  }, 1500);
  }, []);

  
  const dateTimeFormatted = now.toLocaleString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const alertas = getProdutosComEstoqueBaixo();


const cardsResumo: CardResumo[] = [
  {
    id: "total",
    titulo: "Total de Produtos",
    valor: getTotalProdutos(),
    icone: "cube-outline",
    corIcone: "#D2691E",
  },
  {
    id: "alertas",
    titulo: "Alertas de Estoque",
    valor: alertas.length,
    icone: "alert-circle-outline",
    corIcone: alertas.length > 0 ? "#dc2626" : "#059669",
  },
  {
    id: "categorias",
    titulo: "Categorias",
    valor: getTotalCategorias(),
    icone: "grid-outline",
    corIcone: "#0284c7",
  },
  {
    id: "valor",
    titulo: "Valor em Estoque",
    valor: formatarPreco(getValorTotalEstoque()),
    icone: "cash-outline",
    corIcone: "#059669",
  },
];

// Ordena por ultimaMovimentacao (mais recente primeiro)
const produtosRecentes = [...PRODUTOS_MOCK].sort(
  (a, b) => new Date(b.ultimaMovimentacao).getTime() - new Date(a.ultimaMovimentacao).getTime()
).slice(0, 5);

  return(
    <SafeAreaView style={{flex:1, backgroundColor: Colors.background}}> 
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <FlatList 
        data={produtosRecentes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary[600]}   // cor iOS
            colors={[Colors.primary[600]]}    // cor Android
          />
        }

        ListHeaderComponent={
          <>
            {/* CABEÇALHO */}
           <View style={styles.header}>
              <View>
                <Text style={styles.welcome_text}>Olá, Juan! 👋</Text>
                <Text style={styles.date}>{dateTimeFormatted}</Text>
              </View>
              
              <Pressable style={styles.bttnAdd}><Text style={styles.textBttnAdd}>+</Text></Pressable>
           </View>

            {/* PAINEL GERAL */}
            <View style={styles.generalPanel}>
              <Text style={styles.panelTitle}>Visão Geral do Estoque</Text>

              <View style={styles.cardsPanel}>
                {cardsResumo.map((card) => (
                <View key={card.id} style={styles.card}>
                <View style={styles.cardIcon}>
                  <Ionicons name={card.icone} size={24} color={card.corIcone}/>
                </View>
                <Text style={styles.cardValue}>{card.valor}</Text>
                <Text style={styles.cardTitle}>{card.titulo}</Text>
                </View>
              ))}
           </View>
            </View>

            {/* ALERTA */}
            {alertas.length > 0 && (
            <View style={styles.dangerMsg}>
              <Text style={styles.dangerMsgTitle}>⚠️ Estoque crítico ({alertas.length})</Text>
              {alertas.slice(0, 3).map((produto) => (
                <View key={produto.id} style={styles.dangerMsgProduct}>
                  <Text>{produto.nome}</Text>
                  <Text style={{fontWeight: 'bold'}}>
                    {produto.quantidade} / {produto.quantidadeMinima} {produto.unidade}
                  </Text>
                </View>
              ))}
              {alertas.length > 3 && (
                <Text style={styles.dangerMsgSeeMore}>Ver todos os {alertas.length} alertas →</Text>
              )}
            </View>
          )}
          
            {/* TÍTULO DA LISTA */}
          <Text style={styles.panelTitle}>Movimentações Recentes</Text>
          </>
        }

        renderItem={({ item }) => (
        <View style={styles.productItem}>

          <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing[5] }}>
            <Ionicons
          name={
            (CATEGORIAS_MOCK.find((c) => c.id === item.categoriaId)?.icone ?? "cube-outline") as any
          }
          size={30}
          color={CATEGORIAS_MOCK.find((c) => c.id === item.categoriaId)?.cor ?? "gray"}
        />

          <View>
            <Text style={styles.productDate}>
              {new Date(item.ultimaMovimentacao).toLocaleDateString('pt-BR')}
            </Text>
            <Text style={styles.productName}>{item.nome}</Text>
            <Text>
            {item.quantidade} {item.unidade}
            </Text>
          </View>

          </View>
          
          <View style={[styles.bgProductStatus,
            item.quantidade === 0 && styles.bgStatusSemEstoque,
            item.quantidade > 0 && item.quantidade < item.quantidadeMinima && styles.bgStatusBaixo,
            item.quantidade >= item.quantidadeMinima && styles.bgStatusNormal,
          ]}>
            <Text style={[styles.productStatus,
            item.quantidade === 0 && styles.statusSemEstoque,
            item.quantidade > 0 && item.quantidade < item.quantidadeMinima && styles.statusBaixo,
            item.quantidade >= item.quantidadeMinima && styles.statusNormal,
          ]}>
            {item.quantidade === 0 ? "Sem estoque" : item.quantidade < item.quantidadeMinima? "Baixo": "Normal"}
          </Text>
          </View>
          
        </View>
      )}

      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
            
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
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginHorizontal: Spacing[3],
    marginVertical: Spacing[5],
  },

  welcome_text: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },

  date: {
    fontStyle: 'italic',
    fontWeight: Typography.fontWeight.semibold,
    fontSize: Typography.fontSize.base,
    color: Colors.primary[500],
  },

  bttnAdd: {
    backgroundColor: Colors.primary[600],
    borderRadius: Radius.full,
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[5],

  },

  textBttnAdd: {
    fontSize: Typography.fontSize["2xl"],
    color: Colors.neutral[200],
  },

  generalPanel: {
  flexDirection: "column",
  },

  panelTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary[900],
    paddingHorizontal: Spacing[4],
    paddingTop: Spacing[4],
    marginBottom: Spacing[1],
  },

  cardsPanel: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing[3],
    padding: Spacing[4],
  },

  card: {
    width: "47%",
    backgroundColor: Colors.primary[900],
    borderRadius: Radius.xl,
    padding: Spacing[4],
    gap: Spacing[2],
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: Radius.md,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.neutral[700],
  },

  cardIcon: {
    width: 42,
    height: 42,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary[300],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing[1],
  },

  cardValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: "700",
    color: Colors.white,
    letterSpacing: 0.3,
  },

  cardTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral[200],
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  dangerMsg:{
    backgroundColor: Colors.danger.bg,
    borderWidth: 1,
    borderColor: Colors.danger.border,
    borderRadius: Radius.lg,
    marginVertical: Spacing[1],
    marginHorizontal: Spacing[4],
    padding: Spacing[2],
  },

  dangerMsgTitle: {
    marginVertical: Spacing[2],
    color: Colors.danger.text,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,

  },

  dangerMsgProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',

  },

  dangerMsgSeeMore: {
    color: Colors.primary[600],
    textAlign: 'right',
    marginVertical: Spacing[3],
  },

  productItem: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 16,
  paddingVertical: Spacing[2],
  marginHorizontal: 16,
  marginVertical: 4,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.06)",
  },

  productName: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },

  productDate: {
    fontStyle: 'italic',
    color: Colors.textSecondary,
  },

  separator: {
  height: 1,
  marginHorizontal: Spacing[3],
  backgroundColor: Colors.neutral[400],
  opacity: 0.5,
},

  productStatus: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,

  },

  statusSemEstoque: {
    color: Colors.danger.text,
  },

  statusBaixo: {
    color: Colors.warning.text,
  },

  statusNormal: {
    color: Colors.success.text,
  },

  bgProductStatus : {
    paddingVertical: Spacing[1],
    paddingHorizontal: Spacing[2],
    borderRadius: Radius.md,
  },

  bgStatusSemEstoque: {
    backgroundColor: Colors.danger.bg,
  },

  bgStatusBaixo: {
    backgroundColor: Colors.warning.bg,
  },

  bgStatusNormal: {
    backgroundColor: Colors.success.bg,
  },


})
