import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CATEGORIAS_MOCK } from "src/types/Categoria";
import { PRODUTOS_MOCK } from "src/types/Produto";
import { Colors, Radius, Spacing, Typography } from '../../src/constants/theme2';


export default function ProdutosScreen(){
    const produtosRecentes = [...PRODUTOS_MOCK].sort(
      (a, b) => new Date(b.ultimaMovimentacao).getTime() - new Date(a.ultimaMovimentacao).getTime()
    );

    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
    const [busca, setBusca] = useState("");


    const produtosFiltrados = useMemo(() => {
        const filtrados = PRODUTOS_MOCK.filter((p) => {
            const passaCategoria = categoriaSelecionada ? p.categoriaId === categoriaSelecionada : true;
            const passaBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
            return passaCategoria && passaBusca;
        });

        return filtrados;
        }, [categoriaSelecionada, busca]);
            
            
       //     p.categoriaId === categoriaSelecionada)
        //: PRODUTOS_MOCK;

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={48} color={Colors.textSecondary} />
            <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
            <Text style={styles.emptySubText}>Tente buscar por outro termo ou categoria</Text>
        </View>
        );

    return(
        <SafeAreaView style={{flex:1, backgroundColor: Colors.background}}>
            <KeyboardAvoidingView>
                <FlatList
                    data={produtosFiltrados}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ flexGrow: 1 }}
                    ListEmptyComponent={renderEmpty}
                    
                    ListHeaderComponent = {
                        <>
                            <View style={styles.header}>
                                <Text style={styles.title}>Produtos</Text>
                                <Pressable style={styles.bttnAdd}><Text style={styles.textBttnAdd}>+</Text></Pressable>
                                
                            </View>

                            <View style={styles.searchBar}>
                                <Ionicons name={"search"} size={20} color={Colors.textSecondary} style={{margin: Spacing[1]}}/>
                                <TextInput 
                                style={{color: Colors.textSecondary, flex: 1}} 
                                placeholder="Buscar produto..."
                                value={busca}
                                onChangeText={setBusca}
                                autoCapitalize="none"
                                autoCorrect={false}/>
                            </View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    gap: 8,
                                    paddingHorizontal: 16,
                                }}
                                style={styles.menuChips}
                            >

                                <Pressable 
                                    onPress={() => setCategoriaSelecionada(null)}
                                    style={[styles.chip, categoriaSelecionada === null && styles.chipSelecionado]}>
                                    <Text style={[styles.chipText, categoriaSelecionada === null && styles.chipTextSelecionado]}>Todos</Text>
                                </Pressable>

                                {CATEGORIAS_MOCK.map((categoria) => {
                                      const selecionado = categoriaSelecionada === categoria.id;
                                      return(
                                        <Pressable 
                                            onPress={() => setCategoriaSelecionada(selecionado ? null : categoria.id)}
                                            key={categoria.id} 
                                            style={[styles.chip, selecionado && styles.chipSelecionado,]}>
                                            <Text style={[styles.chipText, selecionado && styles.chipTextSelecionado]}>{categoria.nome}</Text>
                                        </Pressable>
                                    );
                                })}
                                
                            </ScrollView>
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
    //container: {
    //    backgroundColor: 'red',
    //},

    header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginHorizontal: Spacing[3],
    marginVertical: Spacing[5],
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

    title: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
      },

    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Spacing[12],
        gap: Spacing[2],
        },

    emptyText: {
        fontSize: Typography.fontSize.md,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.textSecondary,
        },

    emptySubText: {
        fontSize: Typography.fontSize.base,
        color: Colors.textSecondary,
        opacity: 0.6,
        },

    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: Spacing[3],
        //gap: Spacing[2],
        borderWidth: 1,
        borderColor: Colors.primary[600],
        borderRadius: Radius.md,
        paddingVertical: Spacing[1],

    },

    menuChips: {
        marginHorizontal: Spacing[2],
        marginVertical: Spacing[3],
    },

    chip : {
        borderWidth: 1,
        borderColor: Colors.primary[600],
        borderRadius: Radius.lg,
        padding: Spacing[1],
    },

    chipSelecionado: {
        backgroundColor: Colors.primary[600],
    },

    chipText: {
        color: Colors.primary[600],
        fontSize: 13,
        fontWeight: "500",
    },

    chipTextSelecionado: {    
        color: Colors.white,
    },

    productItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: Spacing[2],
        //backgroundColor: "#1C1C2E",
        marginHorizontal: 16,
        marginVertical: 4,
        //borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
    },

     productName: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
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