import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { SigninType } from "@repo/validation/types";
import { SigninSchema } from "@repo/validation/schemas";
import { pages } from "next/dist/build/templates/app-page";


export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            mobileNumber: { label: "Mobile Number", type: "text" },
            password: { label: "Password", type: "password" }
          },
        
          async authorize(credentials: SigninType | undefined) {
           try {
             if(!credentials) {
                 return null;
             }
             // Validate input
             const result = SigninSchema.safeParse(credentials);
             if (!result.success) {
                 return null;
             }
             
             const existingUser = await db.user.findFirst({
                 where: {
                     mobileNumber: credentials.mobileNumber
                 }
             });
 
             if (existingUser) {
                 const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                 if (passwordValidation) {
                     return {
                         id : existingUser.id.toString(),
                         mobileNumber : existingUser.mobileNumber,
                         name : existingUser.name
                     }
                 }
                 return null;
             }
           } catch (error) {
                console.error(error);
                return null;
           }
           return null;
          },
        })
    ],

    secret: process.env.AUTH_SECRET || "secret",
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session
        }
    }
  }
 