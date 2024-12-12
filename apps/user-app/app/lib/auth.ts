import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { SigninInput } from "@repo/validation/types";
import { SigninSchema } from "@repo/validation/schemas";
import { pages } from "next/dist/build/templates/app-page";


export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" }
          },
        
          async authorize(credentials: SigninInput | undefined) {
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
                     email: credentials.email
                 }
             });
 
             if (existingUser) {
                 const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                 if (passwordValidation) {
                     return {
                         id: existingUser.id.toString(),
                         email: existingUser.email
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

    secret: process.env.NEXTAUTH_SECRET || "secret",
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        
        async session({ token, session }: any) {
            session.user.id = token.sub
            console.log(session);
            return session
        }
    }
  }
 