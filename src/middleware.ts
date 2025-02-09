import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

function getDefaultHeaders(headers: Headers, cookies: RequestCookies): Headers{
  const updatedHeaders = new Headers(headers);
  updatedHeaders.set("Content-Type", "application/json");
  const token = cookies.get("token")?.value;  
  if(token){
    updatedHeaders.set("Authorization", `Bearer ${token}`);
  }
  return updatedHeaders;
}

export function middleware(req: NextRequest) {
  const headers = getDefaultHeaders(req.headers, req.cookies);
  console.log("\n\nauth: ", headers.get("Authorization"));
  return NextResponse.next({
    request: {
      headers: headers
    }
  });
}