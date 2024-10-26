import { NextRequest, NextResponse } from "next/server";




export function middleware(request:NextRequest){

    const theme=request.cookies.get('theme')?.value||'light'

    const response=NextResponse.next();

    if(!request.cookies.get('theme')){
        response.cookies.set('theme',theme,{path:'/', maxAge:31236000})
    }
    return response
};

export const config = {
    matcher: ['/((?!api|_next/static|favicon.ico).*)'], // Apply to all routes except API, static files, and favicon
  };