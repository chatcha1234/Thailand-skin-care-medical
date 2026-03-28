import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function unauthorizedResponse() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Lead Dashboard", charset="UTF-8"'
    }
  });
}

function decodeBasicAuthHeader(header: string) {
  const [scheme, token] = header.split(" ");

  if (scheme !== "Basic" || !token) {
    return null;
  }

  try {
    const decoded = atob(token);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1)
    };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const shouldProtectDashboard = pathname.startsWith("/dashboard");
  const shouldProtectLeadMutation = pathname.startsWith("/api/leads/") && request.method !== "GET";

  if (!shouldProtectDashboard && !shouldProtectLeadMutation) {
    return NextResponse.next();
  }

  const expectedUser = process.env.ADMIN_BASIC_AUTH_USER;
  const expectedPassword = process.env.ADMIN_BASIC_AUTH_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return new NextResponse("Missing dashboard auth configuration.", { status: 500 });
  }

  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return unauthorizedResponse();
  }

  const credentials = decodeBasicAuthHeader(authorization);

  if (!credentials) {
    return unauthorizedResponse();
  }

  if (credentials.username !== expectedUser || credentials.password !== expectedPassword) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/leads/:path*"]
};
