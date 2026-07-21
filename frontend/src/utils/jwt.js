function getPayload(tokenOrPayload) {
  if (typeof tokenOrPayload === "string") {
    return decodeJwt(tokenOrPayload);
  }

  if (
    tokenOrPayload &&
    typeof tokenOrPayload === "object" &&
    !Array.isArray(tokenOrPayload)
  ) {
    return tokenOrPayload;
  }

  return null;
}

export function decodeJwt(token) {
  if (typeof token !== "string" || !token.trim()) {
    return null;
  }

  const parts = token.trim().split(".");

  if (parts.length !== 3 || !parts[1]) {
    return null;
  }

  try {
    const base64Payload = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(parts[1].length + ((4 - (parts[1].length % 4)) % 4), "=");
    const binaryPayload = atob(base64Payload);
    const payloadBytes = Uint8Array.from(binaryPayload, (character) =>
      character.charCodeAt(0),
    );
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes));

    return payload && typeof payload === "object" && !Array.isArray(payload)
      ? payload
      : null;
  } catch {
    return null;
  }
}

export function isTokenExpired(tokenOrPayload) {
  const payload = getPayload(tokenOrPayload);

  if (!payload || typeof payload.exp !== "number") {
    return true;
  }

  return payload.exp * 1000 <= Date.now();
}

export function extractUsername(tokenOrPayload) {
  const payload = getPayload(tokenOrPayload);

  if (!payload || typeof payload.sub !== "string") {
    return null;
  }

  return payload.sub.trim() || null;
}

export function extractRoles(tokenOrPayload) {
  const payload = getPayload(tokenOrPayload);

  if (!payload) {
    return [];
  }

  if (Array.isArray(payload.roles)) {
    return payload.roles.filter((role) => typeof role === "string" && role);
  }

  if (typeof payload.roles === "string") {
    return payload.roles
      .split(",")
      .map((role) => role.trim())
      .filter(Boolean);
  }

  return [];
}
