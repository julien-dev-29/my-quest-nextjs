import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    user: {
        changeEmail: {
            enabled: true
        }
    },
    emailAndPassword: {
        enabled: true,
        // requireEmailVerification: true,
        // sendResetPassword: async ({ user, url }) => {
        //     await sendPasswordResetEmail({ user, url })
        // },
        autoSignIn: false
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60
        }
    },
    plugins: [nextCookies()]
    // emailVerification: {
    //     autoSignInAfterVerification: true,
    //     sendOnSignUp: true,
    //     sendVerificationEmail: async ({ user, url }) => {
    //         await sendVerificationEmail({ user, url })
    //     }
    // }
});