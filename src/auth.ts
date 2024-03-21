import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { TokenWithPublicKey, UserWithKeys } from "@/lib/nostr/types";
import { getPublicKey } from "nostr-tools/pure";

// export const {
//   handlers: { GET, POST },
//   auth,
// } = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "nostr",
//       credentials: {
//         publicKey: { label: "Public Key", type: "text" },
//         secretKey: { label: "Secret Key", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const user: UserWithKeys = {
//           publicKey: null,
//           secretKey: null,
//         };
//
//         if (credentials.publicKey) {
//           Object.assign(user, { publicKey: credentials.publicKey });
//           return user;
//         }
//
//         console.log("credentials", credentials);
//
//         if (credentials.secretKey) {
//           const uintSecretKey = Uint8Array.from(
//             Buffer.from(credentials.secretKey as string, "hex"),
//           );
//           const publicKey = getPublicKey(uintSecretKey);
//
//           Object.assign(user, { publicKey, secretKey: credentials.secretKey });
//           return user;
//         }
//
//         return null;
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       // If the user object exists, it means this is the initial token creation.
//       if (user) {
//         token.publicKey = (user as UserWithKeys).publicKey;
//       }
//       return token;
//     },
//
//     async session({ session, token }) {
//       // Extract the publicKey from the JWT token and add it to the session object
//       const user = session.user as UserWithKeys;
//       user.publicKey = (token as TokenWithPublicKey).publicKey;
//       return session;
//     },
//   },
// });

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  trustHost: true,
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        console.log(credentials);
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
