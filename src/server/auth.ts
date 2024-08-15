import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/server/db";
import Google from "next-auth/providers/google";
import { accounts, sessions, users, verificationTokens } from "./db/schema";

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

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  debug: true,
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
