import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";


connectToDB();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET_KEY,

  callbacks:{
    async session({ session }) {
        // store the user id from MongoDB to session
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();
    
        return session;
      },
    
      async signIn({ profile }) {
        try {
        //   console.log("SignIn callback triggered");
        //   console.log("Profile: ", profile);  // Log the profile object
      
          // Check if user exists
          const userAlreadyExist = await User.findOne({ email: profile.email });
        //   console.log("User already exists: ", userAlreadyExist);
      
          if (!userAlreadyExist) {
            const newUser = await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture,
            });
            // console.log("New user created: ", newUser);
          }
          return true;
        } catch (error) {
        //   console.error("Error signing in:", error);
          return false;
        }
      }
  }

 
  
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);