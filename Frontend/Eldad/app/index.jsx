import { Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import CustomButton from "../components/CustomButton";

import { images } from "../constants";

export default function Index() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white h-full">
        <View className="w-full flex-direction-column justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[200px] h-[200px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-black text-3xl text-center font-bold">
              Descopera mai multe despre misiunea{" "}
              <Text className="text-[#FFA001]">Eldad</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute w-[136px] h-[15px] -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-black-100 mt-7 text-center">
            Scopul nostru este ca MESAJUL EVANGHELIEI să ajungă la cât mai multe
            suflete prin diferite mijloace. Am învățat că din tot ce primim de
            la Dumnezeu, trebuie sa oferim si altora. Cu atat mai mult mesajul
            Mantuirii, Evanghelia lui Hristos. Încă de la începuturile lucrării
            de Misiune Eldad, avem ca scop vestirea acestui Adevar viu si
            lucrator, oamenilor care încă nu l-au auzit sau care încă amână.
          </Text>
          <CustomButton
            title="Intra in app."
            handlePress={() => router.push("./home")}
            containerStyles="w-full mt-7 bg-[#FFA001] rounded-xl"
          ></CustomButton>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
