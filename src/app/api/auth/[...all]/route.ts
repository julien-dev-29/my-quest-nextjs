import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

const authHandlers = toNextJsHandler(auth)
export const { GET } = authHandlers

export async function POST(request: Request) {
    return authHandlers.POST(request)
}