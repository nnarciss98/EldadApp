// import {
//   Client,
//   setEndpoint,
//   setProject,
//   setSelfSigned,
//   Databases,
// } from "react-native-appwrite";

// const client = new Client();

// client
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject("66fe41790033e2f85eb9")
//   .setSelfSigned(true); // You might need to set this to true depending on your Appwrite setup

// const databases = new Databases(client, "66fe43e3000457cacbf4");
// const videosCollection = databases.collection("66fe44150008fb44eb08");

// export const getAllPosts = async () => {
//   try {
//     const posts = await databases.listDocuments(
//       config.databases,
//       config.videosCollection
//     );
//     return posts.documents;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
