import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/server/db";
import Google from "next-auth/providers/google";
import { accounts, sessions, users, verificationTokens } from "./db/schema";
import { cache } from "react";

const providers = [Google];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider({});
    return { id: providerData.id, name: providerData.name };
  }
  // else {
  //   return { id: provider.id, name: provider.name };
  // }
});

const {
  handlers,
  auth: uncachedAuth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers,
  pages: {
    signIn: "/signin",
    // signOut: "/signout",
  },
});

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };
