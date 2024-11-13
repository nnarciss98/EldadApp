import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  RefreshControl,
  ImageBackground,
} from "react-native";
import { images } from "../../constants";
import { icons } from "../../constants";
import { router } from "expo-router"; // Import the router object
import CustomButton from "../../components/CustomButton";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating a refresh
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {/* Container for Welcome Section */}
      <View className="z-10">
        {/* Welcome Section */}
        <View className="px-4  space-y-1 ">
          <View className="flex justify-between items-start flex-row">
            <View>
              <Text className="font-pmedium text-sm text-gray">
                Bine ai venit,
              </Text>
              <Text className="text-2xl font-psemibold text-white">Raul</Text>
            </View>
            <View className="justify-center items-center mt-1.5">
              <Image
                source={images.logo} // Replace with your logo image URL
                className="w-12 h-12"
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
      </View>

      {/* Add ScrollView for rest of the content */}
      <ScrollView
        className=""
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }} // PaddingTop to avoid overlap with sticky header
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Last Updates Section */}
        <View className="">
          {/* Vision Section */}
          <View className="mb-5 px-5">
            <Text className="text-2xl font-psemibold text-white text-center">
              Oameni pentru oameni... Suflete pentru Dumnezeu...
            </Text>
          </View>

          <View className="py-5 mx-5 mb-5 ">
            <Image
              source={images.eldadteam}
              resizeMode="cover"
              className="w-full h-56 rounded-lg mb-4"
            />
            <Text className="text-xl font-psemibold text-center mb-2 text-white">
              Cine si ce est <Text style={{ color: "#FFA001" }}>Eldad</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute w-[136px] h-[12px] top-[281px] right-[50px] "
              resizeMode="contain"
            />
            <Text className="text-base text-white mb-2 font-pregular">
              Grupul Eldad Spania a fost înființat în mai 2008 de Cristian și
              Mariana Drăgușin, împreună cu Emanuel Dincă și Alexandru
              Sighiartău, având ca scop răspândirea mesajului Evangheliei prin
              misiuni și muzică. Grupul s-a extins treptat și a organizat mai
              multe turnee misionare în România, sprijinind familii și
              comunități, în special în timpul crizei economice din 2012. De-a
              lungul anilor, echipa s-a schimbat, dar rugăciunea, posturile și
              dedicarea membrilor au rămas esențiale pentru succesul lucrării.
              Grupul continuă să servească și să inspire prin credință și
              misiuni.
            </Text>
            <CustomButton
              title="CITESTE MAI MULT !"
              handlePress={() => router.push("./home")}
              containerStyles="bg-[#ce4a4a]"
            />
          </View>

          <View className=" py-5 mx-5 ">
            <Text className="text-xl font-psemibold text-center mb-2 text-white">
              Viziune
            </Text>
            <Text className="text-base text-white mb-2 font-pregular">
              Scopul nostru este ca{" "}
              <Text style={{ color: "#FFA001" }}>MESAJUL EVANGHELIEI</Text> să
              ajungă la cât mai multe suflete prin:
              {"\n"}
              <Text> • Muzica</Text>
              {"\n"}
              <Text> • Evanghelia pe înțelesul copiilor</Text>
              {"\n"}
              <Text> • PodCast</Text>
              {"\n"}
              <Text> • Ajutorare</Text>
              {"\n"}
              <Text> • Muzică in limba Spaniolă</Text>
            </Text>
            <CustomButton
              title="Vezi mai multe !"
              handlePress={() => router.push("./home")}
              containerStyles="bg-[#ce4a4a] "
            />
          </View>

          {/* Donation Section */}
          <View className="rounded-xl py-5 mx-5 my-5">
            <Text className="text-xl font-psemibold text-center mb-2 text-[#FFA001]">
              Doneaza
            </Text>
            <Text className="text-base text-white mb-2 font-pregular">
              Aceste lucrări se pot desfășura doar cu ajutorul lui Dumnezeu și
              implicarea oamenilor.
              {"\n"}
            </Text>
            <CustomButton
              title="INVESTEȘTE ÎN LUCRURI VEȘNICE!"
              handlePress={() => router.push("./home")}
              containerStyles="bg-[#ce4a4a]"
            />
          </View>

          {/* Library Section */}

          <View className="h-[500px]">
            <ImageBackground
              source={images.library}
              resizeMode="cover"
              className="h-full w-full"
            >
              {/* Add overlay for better readability */}
              <View className="bg-black/40 h-full w-full absolute top-0 left-0" />

              {/* Content container */}
              <View className="relative z-10 h-full w-full flex flex-col justify-center items-center p-5">
                {/* Icon in white */}
                <Image
                  source={icons.book}
                  className="w-12 h-12 mb-4"
                  resizeMode="cover"
                  style={{ tintColor: "white" }}
                />

                {/* Text content - Centered */}
                <Text className="text-2xl font-psemibold text-center mb-4 text-white">
                  Biblioteca Creștină Online
                </Text>

                {/* List of activities */}
                <View className="flex flex-col items-center my-4 space-y-2">
                  <Text className="text-white text-base mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus molestie eget tortor at tristique. Praesent id
                    justo eget ex bibendum rhoncus vel eget nulla. Cras bibendum
                    aliquam ligula, sed luctus nibh. Suspendisse id urna vitae
                    felis ultrices hendrerit vel non augue. Sed tempus dolor non
                    tellus rhoncus laoreet.{" "}
                  </Text>
                </View>
                <CustomButton
                  title="EXPLOREAZA MAI MULT !"
                  handlePress={() => router.push("./home")}
                  containerStyles="bg-transparent  border border-[#ce4a4a]"
                />
              </View>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
