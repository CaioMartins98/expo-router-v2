import Button from "@/components/Button";
import api from "@/services/api";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const router = useRouter();

  const postTodo = async () => {
    setLoading(true);
    await api
      .post("/todo", {
        title: title,
        completed: false,
      })
      .then((res) => {
        if (res.status === 201) {
          Alert.alert("Sucesso!");
          setTitle("")
          router.push('/')
        } else if (res.status !== 201) {
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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       <Text style={{ fontSize: 44, fontWeight: "700", marginBottom: 20 }}>
        Novo ToDo
      </Text>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{ borderWidth: 1, width: 290, fontSize: 20, padding: 10 }}
          value={title}
          placeholder="Digite aqui"
          onChangeText={(text: string) => setTitle(text)}
        />
        <Button title="Postar" onPress={postTodo} disable={loading || title.length === 0}/>
      </View>
    </View>
  );
}
