import Vapi from "@vapi-ai/web";

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);
//ending with exclamation mark because we know it actually exists for typescript to believe the toke nactually exists