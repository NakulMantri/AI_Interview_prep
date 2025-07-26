// lib/vapi.ts
import Vapi from "@vapi-ai/web"
import { VapiClient } from "@vapi-ai/server-sdk"

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!)

// ✅ Server SDK: for backend usage
export const vapiClient = new VapiClient({
  token: process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!, // secret token from .env
})

//ending with exclamation mark because we know it actually exists for typescript to believe the toke nactually exists



