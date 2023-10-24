import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link, useNavigation } from "expo-router";
import Button from "@/components/Button";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

interface Data {
  completed: boolean;
  title: string;
  id: string;
}
export default function Home() {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState("");
  const [selectTab, setSelectTab] = useState("all");
  const navigation = useNavigation();

  const getTodos = async () => {
    setLoading(true);
    await api
      .get(`/todos?search=${term}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((erro) => {
        console.error(erro);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSelectTab = (name: string) => {
    setSelectTab(name);
  };

  useEffect(() => {
    const update = navigation.addListener("focus", () => {
      getTodos();
    });
    return update;
  }, [data]);

  const deleteTodo = async (id: string) => {
    setLoading(true);
    await api
      .delete(`/todo/${id}`)
      .then((res) => {
        if (res.status === 204) {
          Alert.alert("ToDo deletado com sucesso!");
          getTodos();
        } else if (res.status !== 204) {
          Alert.alert("Algo deu errado!");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (item: any) => {
    Alert.alert(
      "Atenção",
      `Tem certeza que deseja deletar sua tarefa "${item.title}"?`,
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Deletar",
          onPress: () => deleteTodo(item.id),
          style: "destructive",
        },
      ]
    );
  };

  const updateTodo = async (item: any) => {
    setLoading(true);
    await api
      .put(`/todo/${item.id}`, {
        title: item.title,
        completed: item.completed ? false : true,
      })
      .then((res) => {
        if (res.status === 204) {
          Alert.alert("ToDo atualizado com sucesso!");
          getTodos();
        } else if (res.status !== 204) {
          Alert.alert("Algo deu errado!");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderItem = (item: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
          borderBottomWidth: 1,
          height: 50,
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomColor: "#222222",
        }}
      >
        <Text
          style={{
            color: item.completed ? "#696969" : "#000",
            fontSize: 22,
            fontWeight: "500",
            marginRight: 10,
            textDecorationLine: item.completed ? "line-through" : "none",
          }}
        >
          {item.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => updateTodo(item)}>
            <Text>
              {item.completed === false ? (
                <MaterialIcons name="close" size={28} color={"#800000"} />
              ) : (
                <MaterialIcons name="check" size={24} color={"#00740a"} />
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <Text>
              <MaterialIcons name="delete" size={24} color={"#000"} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const filterDataComplete = data.filter((item) => {
    return item.completed === true;
  });

  const filterDataIncomplete = data.filter((item) => {
    return item.completed === false;
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Text style={{ fontSize: 44, fontWeight: "700", marginBottom: 20 }}>
        ToDos
      </Text>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            width: "75%",
            fontSize: 20,
            padding: 10,
            borderRadius: 8,
            borderColor: "#999999",
          }}
          value={term}
          placeholder="Digite aqui"
          onChangeText={(text: string) => setTerm(text)}
        />
        <TouchableOpacity
          onPress={getTodos}
          disabled={loading}
          style={{
            width: 55,
            height: 53,
            marginLeft: 10,
            backgroundColor: "#D9D9D9",
            borderColor: "#9999",
            borderWidth: 1,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Text>
            <MaterialIcons name="search" size={25} color={"#000"} />
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => handleSelectTab("all")}
        >
          <Text
            style={{
              fontSize: 18,
              borderBottomWidth: selectTab === "all" ? 1 : 0,
            }}
          >
            Todos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => handleSelectTab("complete")}
        >
          <Text
            style={{
              fontSize: 18,
              borderBottomWidth: selectTab === "complete" ? 1 : 0,
            }}
          >
            Completos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => handleSelectTab("incomplete")}
        >
          <Text
            style={{
              fontSize: 18,
              borderBottomWidth: selectTab === "incomplete" ? 1 : 0,
            }}
          >
            Incompletos
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Carregando...</Text>
        </View>
      ) : (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={selectTab === 'all' ? data : selectTab === 'complete' ? filterDataComplete : filterDataIncomplete}
            style={{ width: "100%", padding: 20 }}
            renderItem={({ item }) => renderItem(item)}
            ListEmptyComponent={() => (
              <View>
                <Text>{"Nenhum registro encontrado :("}</Text>
              </View>
            )}
          />
        </>
      )}
      <View style={{ marginBottom: 10 }} />
      {/* 
      <Link href="/profile" asChild>
        <Button title="Meu perfil" />
      </Link> */}
    </View>
  );
}
