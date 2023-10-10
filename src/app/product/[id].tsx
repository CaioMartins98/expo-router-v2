import { useGlobalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Product() {
  const { id } = useGlobalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 44, fontWeight: "700" }}>Produto: {id}</Text>
    </View>
  );
}
