import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
export default function TabRoutesLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
        name="index"
      />
      <Tabs.Screen
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        }}
        name="profile"
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
