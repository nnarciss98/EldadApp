import { Text, View, Image } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View
      style={{
        alignItems: "center", // Center content horizontally
        justifyContent: "center", // Center content vertically
        gap: 5, // Gap between icon and text
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{ width: 24, height: 24, tintColor: color }}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#B7B7B7",
          tabBarStyle: {
            backgroundColor: "#FFF",
            paddingTop: 15,
            borderTopWidth: 0.5,
            borderTopColor: "#B7B7B7",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Acasa"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="music"
          options={{
            title: "Muzica",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.music}
                color={color}
                name="Muzica"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="kids"
          options={{
            title: "Kids",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.kids}
                color={color}
                name="Kids"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="podcast"
          options={{
            title: "Podcast",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.play}
                color={color}
                name="Podcast"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
