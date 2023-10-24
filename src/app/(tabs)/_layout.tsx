import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
export default function TabRoutesLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list" size={24} color={color} />
          ),
        }}
        name="index"
      />
      <Tabs.Screen
        options={{
          title: "Novo",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="playlist-add" size={24} color={color} />
          ),
        }}
        name="new"
      />
      <Tabs.Screen
        options={{
          title: "Configurações",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
        }}
        name="settings"
      />
    </Tabs>
  );
}
