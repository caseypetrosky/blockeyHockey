import { prisma } from "@lucia-auth/adapter-prisma";
import { p as prisma$1 } from "./prisma.js";
const parseCookie = (str) => {
  const obj = {};
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (!(key in obj)) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val);
    }
    index = endIdx + 1;
  }
  return obj;
};
const serializeCookie = (name, val, options) => {
  const opt = options ?? {};
  const enc = opt.encode ?? encodeURIComponent;
  const value = enc(val);
  let str = name + "=" + value;
  if (null != opt.maxAge) {
    const maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    const expires = opt.expires;
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
};
const tryDecode = (str) => {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
};
const DEFAULT_SESSION_COOKIE_NAME = "auth_session";
const defaultSessionCookieAttributes = {
  sameSite: "lax",
  path: "/"
};
const createSessionCookie = (session, options) => {
  let expires;
  if (session === null) {
    expires = 0;
  } else if (options.cookie.expires !== false) {
    expires = session.idlePeriodExpiresAt.getTime();
  } else {
    expires = Date.now() + 1e3 * 60 * 60 * 24 * 365;
  }
  return new Cookie(options.cookie.name ?? DEFAULT_SESSION_COOKIE_NAME, session?.sessionId ?? "", {
    ...options.cookie.attributes ?? defaultSessionCookieAttributes,
    httpOnly: true,
    expires: new Date(expires),
    secure: options.env === "PROD"
  });
};
class Cookie {
  constructor(name, value, options) {
    this.name = name;
    this.value = value;
    this.attributes = options;
  }
  name;
  value;
  attributes;
  serialize = () => {
    return serializeCookie(this.name, this.value, this.attributes);
  };
}
const logError = (message) => {
  console.log("\x1B[31m%s\x1B[31m", `[LUCIA_ERROR] ${message}`);
};
class LuciaError extends Error {
  constructor(errorMsg, detail) {
    super(errorMsg);
    this.message = errorMsg;
    this.detail = detail ?? "";
  }
  detail;
  message;
}
const pbkdf2 = async (password, salt, options) => {
  const pwKey = await crypto.subtle.importKey("raw", password, "PBKDF2", false, ["deriveBits"]);
  const keyBuffer = await crypto.subtle.deriveBits({
    name: "PBKDF2",
    hash: "SHA-256",
    salt,
    iterations: options.c
  }, pwKey, options.dkLen * 8);
  return new Uint8Array(keyBuffer);
};
const scrypt = async (password, salt, options) => {
  const { N, r, p } = options;
  const dkLen = options.dkLen ?? 32;
  const maxmem = 1024 ** 3 + 1024;
  const blockSize = 128 * r;
  const blockSize32 = blockSize / 4;
  if (N <= 1 || (N & N - 1) !== 0 || N >= 2 ** (blockSize / 8) || N > 2 ** 32) {
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  }
  if (p < 0 || p > (2 ** 32 - 1) * 32 / blockSize) {
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  }
  if (dkLen < 0 || dkLen > (2 ** 32 - 1) * 32) {
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  }
  const memUsed = blockSize * (N + p);
  if (memUsed > maxmem) {
    throw new Error(`Scrypt: parameters too large, ${memUsed} (128 * r * (N + p)) > ${maxmem} (maxmem)`);
  }
  const B = await pbkdf2(password, salt, { c: 1, dkLen: blockSize * p });
  const B32 = u32(B);
  const V = u32(new Uint8Array(blockSize * N));
  const tmp = u32(new Uint8Array(blockSize));
  for (let pi = 0; pi < p; pi++) {
    const Pi = blockSize32 * pi;
    for (let i = 0; i < blockSize32; i++)
      V[i] = B32[Pi + i];
    for (let i = 0, pos = 0; i < N - 1; i++) {
      BlockMix(V, pos, V, pos += blockSize32, r);
    }
    BlockMix(V, (N - 1) * blockSize32, B32, Pi, r);
    for (let i = 0; i < N; i++) {
      const j = B32[Pi + blockSize32 - 16] % N;
      for (let k = 0; k < blockSize32; k++)
        tmp[k] = B32[Pi + k] ^ V[j * blockSize32 + k];
      BlockMix(tmp, 0, B32, Pi, r);
    }
  }
  const res = await pbkdf2(password, B, { c: 1, dkLen });
  B.fill(0);
  V.fill(0);
  tmp.fill(0);
  return res;
};
const rotl = (a, b) => a << b | a >>> 32 - b;
const XorAndSalsa = (prev, pi, input, ii, out, oi) => {
  const y00 = prev[pi++] ^ input[ii++], y01 = prev[pi++] ^ input[ii++];
  const y02 = prev[pi++] ^ input[ii++], y03 = prev[pi++] ^ input[ii++];
  const y04 = prev[pi++] ^ input[ii++], y05 = prev[pi++] ^ input[ii++];
  const y06 = prev[pi++] ^ input[ii++], y07 = prev[pi++] ^ input[ii++];
  const y08 = prev[pi++] ^ input[ii++], y09 = prev[pi++] ^ input[ii++];
  const y10 = prev[pi++] ^ input[ii++], y11 = prev[pi++] ^ input[ii++];
  const y12 = prev[pi++] ^ input[ii++], y13 = prev[pi++] ^ input[ii++];
  const y14 = prev[pi++] ^ input[ii++], y15 = prev[pi++] ^ input[ii++];
  let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
  for (let i = 0; i < 8; i += 2) {
    x04 ^= rotl(x00 + x12 | 0, 7);
    x08 ^= rotl(x04 + x00 | 0, 9);
    x12 ^= rotl(x08 + x04 | 0, 13);
    x00 ^= rotl(x12 + x08 | 0, 18);
    x09 ^= rotl(x05 + x01 | 0, 7);
    x13 ^= rotl(x09 + x05 | 0, 9);
    x01 ^= rotl(x13 + x09 | 0, 13);
    x05 ^= rotl(x01 + x13 | 0, 18);
    x14 ^= rotl(x10 + x06 | 0, 7);
    x02 ^= rotl(x14 + x10 | 0, 9);
    x06 ^= rotl(x02 + x14 | 0, 13);
    x10 ^= rotl(x06 + x02 | 0, 18);
    x03 ^= rotl(x15 + x11 | 0, 7);
    x07 ^= rotl(x03 + x15 | 0, 9);
    x11 ^= rotl(x07 + x03 | 0, 13);
    x15 ^= rotl(x11 + x07 | 0, 18);
    x01 ^= rotl(x00 + x03 | 0, 7);
    x02 ^= rotl(x01 + x00 | 0, 9);
    x03 ^= rotl(x02 + x01 | 0, 13);
    x00 ^= rotl(x03 + x02 | 0, 18);
    x06 ^= rotl(x05 + x04 | 0, 7);
    x07 ^= rotl(x06 + x05 | 0, 9);
    x04 ^= rotl(x07 + x06 | 0, 13);
    x05 ^= rotl(x04 + x07 | 0, 18);
    x11 ^= rotl(x10 + x09 | 0, 7);
    x08 ^= rotl(x11 + x10 | 0, 9);
    x09 ^= rotl(x08 + x11 | 0, 13);
    x10 ^= rotl(x09 + x08 | 0, 18);
    x12 ^= rotl(x15 + x14 | 0, 7);
    x13 ^= rotl(x12 + x15 | 0, 9);
    x14 ^= rotl(x13 + x12 | 0, 13);
    x15 ^= rotl(x14 + x13 | 0, 18);
  }
  out[oi++] = y00 + x00 | 0;
  out[oi++] = y01 + x01 | 0;
  out[oi++] = y02 + x02 | 0;
  out[oi++] = y03 + x03 | 0;
  out[oi++] = y04 + x04 | 0;
  out[oi++] = y05 + x05 | 0;
  out[oi++] = y06 + x06 | 0;
  out[oi++] = y07 + x07 | 0;
  out[oi++] = y08 + x08 | 0;
  out[oi++] = y09 + x09 | 0;
  out[oi++] = y10 + x10 | 0;
  out[oi++] = y11 + x11 | 0;
  out[oi++] = y12 + x12 | 0;
  out[oi++] = y13 + x13 | 0;
  out[oi++] = y14 + x14 | 0;
  out[oi++] = y15 + x15 | 0;
};
const BlockMix = (input, ii, out, oi, r) => {
  let head = oi + 0;
  let tail = oi + 16 * r;
  for (let i = 0; i < 16; i++)
    out[tail + i] = input[ii + (2 * r - 1) * 16 + i];
  for (let i = 0; i < r; i++, head += 16, ii += 16) {
    XorAndSalsa(out, tail, input, ii, out, head);
    if (i > 0)
      tail += 16;
    XorAndSalsa(out, head, input, ii += 16, out, tail);
  }
};
const u32 = (arr) => {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
};
const getRandomValues = (bytes) => {
  return crypto.getRandomValues(new Uint8Array(bytes));
};
const DEFAULT_ALPHABET = "abcdefghijklmnopqrstuvwxyz1234567890";
const generateRandomString = (size, alphabet = DEFAULT_ALPHABET) => {
  const mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
  const step = -~(1.6 * mask * size / alphabet.length);
  let bytes = getRandomValues(step);
  let id = "";
  let index = 0;
  while (id.length !== size) {
    id += alphabet[bytes[index] & mask] ?? "";
    index += 1;
    if (index > bytes.length) {
      bytes = getRandomValues(step);
      index = 0;
    }
  }
  return id;
};
const generateScryptHash = async (s) => {
  const salt = generateRandomString(16);
  const key = await hashWithScrypt(s.normalize("NFKC"), salt);
  return `s2:${salt}:${key}`;
};
const hashWithScrypt = async (s, salt, blockSize = 16) => {
  const keyUint8Array = await scrypt(new TextEncoder().encode(s), new TextEncoder().encode(salt), {
    N: 16384,
    r: blockSize,
    p: 1,
    dkLen: 64
  });
  return convertUint8ArrayToHex(keyUint8Array);
};
const validateScryptHash = async (s, hash) => {
  if (hash.startsWith("$2a")) {
    throw new LuciaError("AUTH_OUTDATED_PASSWORD");
  }
  const arr = hash.split(":");
  if (arr.length === 2) {
    const [salt2, key2] = arr;
    const targetKey = await hashWithScrypt(s.normalize("NFKC"), salt2, 8);
    const result = constantTimeEqual(targetKey, key2);
    return result;
  }
  if (arr.length !== 3)
    return false;
  const [version, salt, key] = arr;
  if (version === "s2") {
    const targetKey = await hashWithScrypt(s.normalize("NFKC"), salt);
    const result = constantTimeEqual(targetKey, key);
    return result;
  }
  return false;
};
const constantTimeEqual = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  const aUint8Array = new TextEncoder().encode(a);
  const bUint8Array = new TextEncoder().encode(b);
  let c = 0;
  for (let i = 0; i < a.length; i++) {
    c |= aUint8Array[i] ^ bUint8Array[i];
  }
  return c === 0;
};
const convertUint8ArrayToHex = (arr) => {
  return [...arr].map((x) => x.toString(16).padStart(2, "0")).join("");
};
const isWithinExpiration = (expiresInMs) => {
  const currentTime = Date.now();
  if (currentTime > expiresInMs)
    return false;
  return true;
};
const isValidDatabaseSession = (databaseSession) => {
  return isWithinExpiration(databaseSession.idle_expires);
};
const DEBUG_GLOBAL = "__lucia_debug_mode";
const ESCAPE = "\x1B";
const DEFAULT_TEXT_FORMAT = "\x1B[0m";
const DEFAULT_FG_BG = `${ESCAPE}[0m`;
const RED_CODE = 9;
const LUCIA_COLOR_CODE = 63;
const WHITE_CODE = 231;
const GREEN_CODE = 34;
const CYAN_CODE = 6;
const YELLOW_CODE = 3;
const PURPLE_CODE = 5;
const BLUE_CODE = 4;
const globalContext = globalThis;
globalContext[DEBUG_GLOBAL] = false;
const format = (text, format2, removeFormat) => {
  return `${format2}${text}${removeFormat ? removeFormat : DEFAULT_TEXT_FORMAT}`;
};
const bgFormat = (text, colorCode) => {
  return format(text, `${ESCAPE}[48;5;${colorCode}m`, DEFAULT_FG_BG);
};
const fgFormat = (text, colorCode) => {
  return format(text, `${ESCAPE}[38;5;${colorCode}m`, DEFAULT_FG_BG);
};
const bg = {
  lucia: (text) => bgFormat(text, LUCIA_COLOR_CODE),
  red: (text) => bgFormat(text, RED_CODE),
  white: (text) => bgFormat(text, WHITE_CODE),
  green: (text) => bgFormat(text, GREEN_CODE),
  cyan: (text) => bgFormat(text, CYAN_CODE),
  yellow: (text) => bgFormat(text, YELLOW_CODE),
  purple: (text) => bgFormat(text, PURPLE_CODE),
  blue: (text) => bgFormat(text, BLUE_CODE)
};
const fg = {
  lucia: (text) => fgFormat(text, LUCIA_COLOR_CODE),
  red: (text) => fgFormat(text, RED_CODE),
  white: (text) => fgFormat(text, WHITE_CODE),
  green: (text) => fgFormat(text, GREEN_CODE),
  cyan: (text) => fgFormat(text, CYAN_CODE),
  yellow: (text) => fgFormat(text, YELLOW_CODE),
  purple: (text) => fgFormat(text, PURPLE_CODE),
  blue: (text) => fgFormat(text, BLUE_CODE),
  default: (text) => format(text, DEFAULT_TEXT_FORMAT)
};
const bold = (text) => {
  return format(text, `${ESCAPE}[1m`, `${ESCAPE}[22m`);
};
const dim = (text) => {
  return format(text, `${ESCAPE}[2m`, `${ESCAPE}[22m`);
};
const isDebugModeEnabled = () => {
  return Boolean(globalContext[DEBUG_GLOBAL]);
};
const linebreak = () => console.log("");
const createCategory = (name, themeTextColor) => {
  const createLogger = (textColor = fg.default) => {
    return (text, subtext) => {
      if (!isDebugModeEnabled())
        return;
      if (subtext) {
        return log(themeTextColor(`[${name}]`), `${textColor(text)}`, subtext);
      }
      log(themeTextColor(`[${name}]`), `${textColor(text)}`);
    };
  };
  return {
    info: createLogger(),
    notice: createLogger(fg.yellow),
    fail: createLogger(fg.red),
    success: createLogger(fg.green)
  };
};
const enableDebugMode = () => {
  globalContext[DEBUG_GLOBAL] = true;
};
const disableDebugMode = () => {
  globalContext[DEBUG_GLOBAL] = false;
};
const debug = {
  init: (debugEnabled) => {
    if (debugEnabled) {
      enableDebugMode();
      linebreak();
      console.log(` ${bg.lucia(bold(fg.white(" lucia ")))}  ${fg.lucia(bold("Debug mode enabled"))}`);
    } else {
      disableDebugMode();
    }
  },
  request: {
    init: (method, href) => {
      if (!isDebugModeEnabled())
        return;
      linebreak();
      const getUrl = () => {
        try {
          const url = new URL(href);
          return url.origin + url.pathname;
        } catch {
          return href;
        }
      };
      log(bg.cyan(bold(fg.white(" request "))), fg.cyan(`${method.toUpperCase()} ${getUrl()}`));
    },
    ...createCategory("request", fg.cyan)
  },
  session: createCategory("session", fg.purple),
  key: createCategory("key", fg.blue)
};
const log = (type, text, subtext) => {
  if (!subtext) {
    return console.log(`${dim((/* @__PURE__ */ new Date()).toLocaleTimeString())}  ${type} ${text}`);
  }
  console.log(`${dim((/* @__PURE__ */ new Date()).toLocaleTimeString())}  ${type} ${text} ${dim(subtext)}`);
};
const createHeadersFromObject = (headersObject) => {
  const headers = new Headers();
  for (const [key, value] of Object.entries(headersObject)) {
    if (value === null || value === void 0)
      continue;
    if (typeof value === "string") {
      headers.set(key, value);
    } else {
      for (const item of value) {
        headers.append(key, item);
      }
    }
  }
  return headers;
};
const isAllowedOrigin = (origin, host, allowedSubdomains) => {
  const originHost = new URL(origin).host;
  const baseDomain = getBaseDomain(host);
  if (host.length < 1 || origin.length < 1)
    return false;
  if (originHost === host)
    return true;
  if (allowedSubdomains === "*") {
    if (originHost.endsWith(`.${baseDomain}`))
      return true;
    return false;
  }
  for (const subdomain of allowedSubdomains) {
    const allowedHostPermutation = subdomain === null ? baseDomain : [subdomain, baseDomain].join(".");
    if (allowedHostPermutation === originHost)
      return true;
  }
  return false;
};
const getBaseDomain = (host) => {
  if (host.startsWith("localhost:"))
    return host;
  return host.split(".").slice(-2).join(".");
};
const safeParseUrl = (url) => {
  try {
    return new URL(url);
  } catch {
    return null;
  }
};
class AuthRequest {
  auth;
  requestContext;
  constructor(auth2, config) {
    debug.request.init(config.requestContext.request.method, config.requestContext.request.url ?? "(url unknown)");
    this.auth = auth2;
    this.requestContext = config.requestContext;
    const csrfProtectionConfig = typeof config.csrfProtection === "object" ? config.csrfProtection : {};
    const csrfProtectionEnabled = config.csrfProtection !== false;
    if (!csrfProtectionEnabled || this.isValidRequestOrigin(csrfProtectionConfig)) {
      this.storedSessionId = this.requestContext.sessionCookie ?? auth2.readSessionCookie(this.requestContext.request.headers.get("Cookie"));
    } else {
      this.storedSessionId = null;
    }
    this.bearerToken = auth2.readBearerToken(this.requestContext.request.headers.get("Authorization"));
  }
  validatePromise = null;
  validateBearerTokenPromise = null;
  storedSessionId;
  bearerToken;
  setSession = (session) => {
    const sessionId = session?.sessionId ?? null;
    if (this.storedSessionId === sessionId)
      return;
    this.validatePromise = null;
    this.setSessionCookie(session);
  };
  maybeSetSession = (session) => {
    try {
      this.setSession(session);
    } catch {
    }
  };
  setSessionCookie = (session) => {
    const sessionId = session?.sessionId ?? null;
    if (this.storedSessionId === sessionId)
      return;
    this.storedSessionId = sessionId;
    this.requestContext.setCookie(this.auth.createSessionCookie(session));
    if (session) {
      debug.request.notice("Session cookie stored", session.sessionId);
    } else {
      debug.request.notice("Session cookie deleted");
    }
  };
  validate = async () => {
    if (this.validatePromise) {
      debug.request.info("Using cached result for session validation");
      return this.validatePromise;
    }
    this.validatePromise = new Promise(async (resolve, reject) => {
      if (!this.storedSessionId)
        return resolve(null);
      try {
        const session = await this.auth.validateSession(this.storedSessionId);
        if (session.fresh) {
          this.maybeSetSession(session);
        }
        return resolve(session);
      } catch (e) {
        if (e instanceof LuciaError && e.message === "AUTH_INVALID_SESSION_ID") {
          this.maybeSetSession(null);
          return resolve(null);
        }
        return reject(e);
      }
    });
    return await this.validatePromise;
  };
  validateBearerToken = async () => {
    if (this.validateBearerTokenPromise) {
      debug.request.info("Using cached result for bearer token validation");
      return this.validatePromise;
    }
    this.validatePromise = new Promise(async (resolve, reject) => {
      if (!this.bearerToken)
        return resolve(null);
      try {
        const session = await this.auth.validateSession(this.bearerToken);
        return resolve(session);
      } catch (e) {
        if (e instanceof LuciaError) {
          return resolve(null);
        }
        return reject(e);
      }
    });
    return await this.validatePromise;
  };
  invalidate() {
    this.validatePromise = null;
    this.validateBearerTokenPromise = null;
  }
  isValidRequestOrigin = (config) => {
    const request = this.requestContext.request;
    const whitelist = ["GET", "HEAD", "OPTIONS", "TRACE"];
    if (whitelist.some((val) => val === request.method.toUpperCase())) {
      return true;
    }
    const requestOrigin = request.headers.get("Origin");
    if (!requestOrigin)
      return false;
    if (!requestOrigin) {
      debug.request.fail("No request origin available");
      return false;
    }
    let host = null;
    if (config.host !== void 0) {
      host = config.host ?? null;
    } else if (request.url !== null && request.url !== void 0) {
      host = safeParseUrl(request.url)?.host ?? null;
    } else {
      host = request.headers.get(config.hostHeader ?? "Host");
    }
    debug.request.info("Host", host ?? "(Host unknown)");
    if (host !== null && isAllowedOrigin(requestOrigin, host, config.allowedSubDomains ?? [])) {
      debug.request.info("Valid request origin", requestOrigin);
      return true;
    }
    debug.request.info("Invalid request origin", requestOrigin);
    return false;
  };
}
const transformRequestContext = ({ request, setCookie, sessionCookie }) => {
  return {
    request: {
      url: request.url,
      method: request.method,
      headers: "authorization" in request.headers ? createHeadersFromObject(request.headers) : request.headers
    },
    setCookie,
    sessionCookie: sessionCookie ?? request.storedSessionCookie
  };
};
const sveltekit = () => {
  return ({ args, sessionCookieName }) => {
    const [event] = args;
    const requestContext = {
      request: event.request,
      sessionCookie: event.cookies.get(sessionCookieName) ?? null,
      setCookie: (cookie) => {
        event.cookies.set(cookie.name, cookie.value, cookie.attributes);
      }
    };
    return requestContext;
  };
};
const lucia$1 = () => {
  return ({ args }) => args[0];
};
const createAdapter = (adapter) => {
  if (!("user" in adapter))
    return adapter(LuciaError);
  let userAdapter = adapter.user(LuciaError);
  let sessionAdapter = adapter.session(LuciaError);
  if ("getSessionAndUser" in userAdapter) {
    const { getSessionAndUser: _, ...extractedUserAdapter } = userAdapter;
    userAdapter = extractedUserAdapter;
  }
  if ("getSessionAndUser" in sessionAdapter) {
    const { getSessionAndUser: _, ...extractedSessionAdapter } = sessionAdapter;
    sessionAdapter = extractedSessionAdapter;
  }
  return {
    ...userAdapter,
    ...sessionAdapter
  };
};
const createKeyId = (providerId, providerUserId) => {
  if (providerId.includes(":")) {
    throw new TypeError("Provider id must not include any colons (:)");
  }
  return `${providerId}:${providerUserId}`;
};
const lucia = (config) => {
  return new Auth(config);
};
const validateConfiguration = (config) => {
  const adapterProvided = config.adapter;
  if (!adapterProvided) {
    logError('Adapter is not defined in configuration ("config.adapter")');
    process.exit(1);
  }
};
class Auth {
  adapter;
  sessionCookieConfig;
  sessionExpiresIn;
  csrfProtection;
  env;
  passwordHash = {
    generate: generateScryptHash,
    validate: validateScryptHash
  };
  middleware = lucia$1();
  experimental;
  constructor(config) {
    validateConfiguration(config);
    this.adapter = createAdapter(config.adapter);
    this.env = config.env;
    this.sessionExpiresIn = {
      activePeriod: config.sessionExpiresIn?.activePeriod ?? 1e3 * 60 * 60 * 24,
      idlePeriod: config.sessionExpiresIn?.idlePeriod ?? 1e3 * 60 * 60 * 24 * 14
    };
    this.getUserAttributes = (databaseUser) => {
      const defaultTransform = () => {
        return {};
      };
      const transform = config.getUserAttributes ?? defaultTransform;
      return transform(databaseUser);
    };
    this.getSessionAttributes = (databaseSession) => {
      const defaultTransform = () => {
        return {};
      };
      const transform = config.getSessionAttributes ?? defaultTransform;
      return transform(databaseSession);
    };
    this.csrfProtection = config.csrfProtection ?? true;
    this.sessionCookieConfig = config.sessionCookie ?? {};
    if (config.passwordHash) {
      this.passwordHash = config.passwordHash;
    }
    if (config.middleware) {
      this.middleware = config.middleware;
    }
    this.experimental = {
      debugMode: config.experimental?.debugMode ?? false
    };
    debug.init(this.experimental.debugMode);
  }
  getUserAttributes;
  getSessionAttributes;
  transformDatabaseUser = (databaseUser) => {
    const attributes = this.getUserAttributes(databaseUser);
    return {
      ...attributes,
      userId: databaseUser.id
    };
  };
  transformDatabaseKey = (databaseKey) => {
    const [providerId, ...providerUserIdSegments] = databaseKey.id.split(":");
    const providerUserId = providerUserIdSegments.join(":");
    const userId = databaseKey.user_id;
    const isPasswordDefined = !!databaseKey.hashed_password;
    return {
      providerId,
      providerUserId,
      userId,
      passwordDefined: isPasswordDefined
    };
  };
  transformDatabaseSession = (databaseSession, context) => {
    const attributes = this.getSessionAttributes(databaseSession);
    const active = isWithinExpiration(databaseSession.active_expires);
    return {
      ...attributes,
      user: context.user,
      sessionId: databaseSession.id,
      activePeriodExpiresAt: new Date(Number(databaseSession.active_expires)),
      idlePeriodExpiresAt: new Date(Number(databaseSession.idle_expires)),
      state: active ? "active" : "idle",
      fresh: context.fresh
    };
  };
  getDatabaseUser = async (userId) => {
    const databaseUser = await this.adapter.getUser(userId);
    if (!databaseUser) {
      throw new LuciaError("AUTH_INVALID_USER_ID");
    }
    return databaseUser;
  };
  getDatabaseSession = async (sessionId) => {
    const databaseSession = await this.adapter.getSession(sessionId);
    if (!databaseSession) {
      debug.session.fail("Session not found", sessionId);
      throw new LuciaError("AUTH_INVALID_SESSION_ID");
    }
    if (!isValidDatabaseSession(databaseSession)) {
      debug.session.fail(`Session expired at ${new Date(Number(databaseSession.idle_expires))}`, sessionId);
      throw new LuciaError("AUTH_INVALID_SESSION_ID");
    }
    return databaseSession;
  };
  getDatabaseSessionAndUser = async (sessionId) => {
    if (this.adapter.getSessionAndUser) {
      const [databaseSession2, databaseUser2] = await this.adapter.getSessionAndUser(sessionId);
      if (!databaseSession2) {
        debug.session.fail("Session not found", sessionId);
        throw new LuciaError("AUTH_INVALID_SESSION_ID");
      }
      if (!isValidDatabaseSession(databaseSession2)) {
        debug.session.fail(`Session expired at ${new Date(Number(databaseSession2.idle_expires))}`, sessionId);
        throw new LuciaError("AUTH_INVALID_SESSION_ID");
      }
      return [databaseSession2, databaseUser2];
    }
    const databaseSession = await this.getDatabaseSession(sessionId);
    const databaseUser = await this.getDatabaseUser(databaseSession.user_id);
    return [databaseSession, databaseUser];
  };
  validateSessionIdArgument = (sessionId) => {
    if (!sessionId) {
      debug.session.fail("Empty session id");
      throw new LuciaError("AUTH_INVALID_SESSION_ID");
    }
  };
  getNewSessionExpiration = (sessionExpiresIn) => {
    const activePeriodExpiresAt = new Date((/* @__PURE__ */ new Date()).getTime() + (sessionExpiresIn?.activePeriod ?? this.sessionExpiresIn.activePeriod));
    const idlePeriodExpiresAt = new Date(activePeriodExpiresAt.getTime() + (sessionExpiresIn?.idlePeriod ?? this.sessionExpiresIn.idlePeriod));
    return { activePeriodExpiresAt, idlePeriodExpiresAt };
  };
  getUser = async (userId) => {
    const databaseUser = await this.getDatabaseUser(userId);
    const user = this.transformDatabaseUser(databaseUser);
    return user;
  };
  createUser = async (options) => {
    const userId = options.userId ?? generateRandomString(15);
    const userAttributes = options.attributes ?? {};
    const databaseUser = {
      ...userAttributes,
      id: userId
    };
    if (options.key === null) {
      await this.adapter.setUser(databaseUser, null);
      return this.transformDatabaseUser(databaseUser);
    }
    const keyId = createKeyId(options.key.providerId, options.key.providerUserId);
    const password = options.key.password;
    const hashedPassword = password === null ? null : await this.passwordHash.generate(password);
    await this.adapter.setUser(databaseUser, {
      id: keyId,
      user_id: userId,
      hashed_password: hashedPassword
    });
    return this.transformDatabaseUser(databaseUser);
  };
  updateUserAttributes = async (userId, attributes) => {
    await this.adapter.updateUser(userId, attributes);
    return await this.getUser(userId);
  };
  deleteUser = async (userId) => {
    await this.adapter.deleteSessionsByUserId(userId);
    await this.adapter.deleteKeysByUserId(userId);
    await this.adapter.deleteUser(userId);
  };
  useKey = async (providerId, providerUserId, password) => {
    const keyId = createKeyId(providerId, providerUserId);
    const databaseKey = await this.adapter.getKey(keyId);
    if (!databaseKey) {
      debug.key.fail("Key not found", keyId);
      throw new LuciaError("AUTH_INVALID_KEY_ID");
    }
    const hashedPassword = databaseKey.hashed_password;
    if (hashedPassword !== null) {
      debug.key.info("Key includes password");
      if (!password) {
        debug.key.fail("Key password not provided", keyId);
        throw new LuciaError("AUTH_INVALID_PASSWORD");
      }
      const validPassword = await this.passwordHash.validate(password, hashedPassword);
      if (!validPassword) {
        debug.key.fail("Incorrect key password", password);
        throw new LuciaError("AUTH_INVALID_PASSWORD");
      }
      debug.key.notice("Validated key password");
    } else {
      if (password !== null) {
        debug.key.fail("Incorrect key password", password);
        throw new LuciaError("AUTH_INVALID_PASSWORD");
      }
      debug.key.info("No password included in key");
    }
    debug.key.success("Validated key", keyId);
    return this.transformDatabaseKey(databaseKey);
  };
  getSession = async (sessionId) => {
    this.validateSessionIdArgument(sessionId);
    const [databaseSession, databaseUser] = await this.getDatabaseSessionAndUser(sessionId);
    const user = this.transformDatabaseUser(databaseUser);
    return this.transformDatabaseSession(databaseSession, {
      user,
      fresh: false
    });
  };
  getAllUserSessions = async (userId) => {
    const [user, databaseSessions] = await Promise.all([
      this.getUser(userId),
      await this.adapter.getSessionsByUserId(userId)
    ]);
    const validStoredUserSessions = databaseSessions.filter((databaseSession) => {
      return isValidDatabaseSession(databaseSession);
    }).map((databaseSession) => {
      return this.transformDatabaseSession(databaseSession, {
        user,
        fresh: false
      });
    });
    return validStoredUserSessions;
  };
  validateSession = async (sessionId) => {
    this.validateSessionIdArgument(sessionId);
    const [databaseSession, databaseUser] = await this.getDatabaseSessionAndUser(sessionId);
    const user = this.transformDatabaseUser(databaseUser);
    const session = this.transformDatabaseSession(databaseSession, {
      user,
      fresh: false
    });
    if (session.state === "active") {
      debug.session.success("Validated session", session.sessionId);
      return session;
    }
    const { activePeriodExpiresAt, idlePeriodExpiresAt } = this.getNewSessionExpiration();
    await this.adapter.updateSession(session.sessionId, {
      active_expires: activePeriodExpiresAt.getTime(),
      idle_expires: idlePeriodExpiresAt.getTime()
    });
    const renewedDatabaseSession = {
      ...session,
      idlePeriodExpiresAt,
      activePeriodExpiresAt,
      fresh: true
    };
    return renewedDatabaseSession;
  };
  createSession = async (options) => {
    const { activePeriodExpiresAt, idlePeriodExpiresAt } = this.getNewSessionExpiration();
    const userId = options.userId;
    const sessionId = options?.sessionId ?? generateRandomString(40);
    const attributes = options.attributes;
    const databaseSession = {
      ...attributes,
      id: sessionId,
      user_id: userId,
      active_expires: activePeriodExpiresAt.getTime(),
      idle_expires: idlePeriodExpiresAt.getTime()
    };
    const [user] = await Promise.all([
      this.getUser(userId),
      this.adapter.setSession(databaseSession)
    ]);
    return this.transformDatabaseSession(databaseSession, {
      user,
      fresh: false
    });
  };
  updateSessionAttributes = async (sessionId, attributes) => {
    this.validateSessionIdArgument(sessionId);
    await this.adapter.updateSession(sessionId, attributes);
    return this.getSession(sessionId);
  };
  invalidateSession = async (sessionId) => {
    this.validateSessionIdArgument(sessionId);
    await this.adapter.deleteSession(sessionId);
    debug.session.notice("Invalidated session", sessionId);
  };
  invalidateAllUserSessions = async (userId) => {
    await this.adapter.deleteSessionsByUserId(userId);
  };
  deleteDeadUserSessions = async (userId) => {
    const databaseSessions = await this.adapter.getSessionsByUserId(userId);
    const deadSessionIds = databaseSessions.filter((databaseSession) => {
      return !isValidDatabaseSession(databaseSession);
    }).map((databaseSession) => databaseSession.id);
    await Promise.all(deadSessionIds.map((deadSessionId) => {
      this.adapter.deleteSession(deadSessionId);
    }));
  };
  /**
   * @deprecated To be removed in next major release
   */
  validateRequestOrigin = (request) => {
    if (request.method === null) {
      debug.request.fail("Request method unavailable");
      throw new LuciaError("AUTH_INVALID_REQUEST");
    }
    if (request.url === null) {
      debug.request.fail("Request url unavailable");
      throw new LuciaError("AUTH_INVALID_REQUEST");
    }
    if (request.method.toUpperCase() !== "GET" && request.method.toUpperCase() !== "HEAD") {
      const requestOrigin = request.headers.origin;
      if (!requestOrigin) {
        debug.request.fail("No request origin available");
        throw new LuciaError("AUTH_INVALID_REQUEST");
      }
      try {
        const url = safeParseUrl(request.url);
        const allowedSubDomains = typeof this.csrfProtection === "object" ? this.csrfProtection.allowedSubDomains ?? [] : [];
        if (url === null || !isAllowedOrigin(requestOrigin, url.origin, allowedSubDomains)) {
          throw new LuciaError("AUTH_INVALID_REQUEST");
        }
        debug.request.info("Valid request origin", requestOrigin);
      } catch {
        debug.request.fail("Invalid origin string", requestOrigin);
        throw new LuciaError("AUTH_INVALID_REQUEST");
      }
    } else {
      debug.request.notice("Skipping CSRF check");
    }
  };
  readSessionCookie = (cookieHeader) => {
    if (!cookieHeader) {
      debug.request.info("No session cookie found");
      return null;
    }
    const cookies = parseCookie(cookieHeader);
    const sessionCookieName = this.sessionCookieConfig.name ?? DEFAULT_SESSION_COOKIE_NAME;
    const sessionId = cookies[sessionCookieName] ?? null;
    if (sessionId) {
      debug.request.info("Found session cookie", sessionId);
    } else {
      debug.request.info("No session cookie found");
    }
    return sessionId;
  };
  readBearerToken = (authorizationHeader) => {
    if (!authorizationHeader) {
      debug.request.info("No token found in authorization header");
      return null;
    }
    const [authScheme, token] = authorizationHeader.split(" ");
    if (authScheme !== "Bearer") {
      debug.request.fail("Invalid authorization header auth scheme", authScheme);
      return null;
    }
    return token ?? null;
  };
  handleRequest = (...args) => {
    const middleware = this.middleware;
    const sessionCookieName = this.sessionCookieConfig.name ?? DEFAULT_SESSION_COOKIE_NAME;
    return new AuthRequest(this, {
      csrfProtection: this.csrfProtection,
      requestContext: transformRequestContext(middleware({
        args,
        env: this.env,
        sessionCookieName
      }))
    });
  };
  createSessionCookie = (session) => {
    return createSessionCookie(session, {
      env: this.env,
      cookie: this.sessionCookieConfig
    });
  };
  createKey = async (options) => {
    const keyId = createKeyId(options.providerId, options.providerUserId);
    let hashedPassword = null;
    if (options.password !== null) {
      hashedPassword = await this.passwordHash.generate(options.password);
    }
    const userId = options.userId;
    await this.adapter.setKey({
      id: keyId,
      user_id: userId,
      hashed_password: hashedPassword
    });
    return {
      providerId: options.providerId,
      providerUserId: options.providerUserId,
      passwordDefined: !!options.password,
      userId
    };
  };
  deleteKey = async (providerId, providerUserId) => {
    const keyId = createKeyId(providerId, providerUserId);
    await this.adapter.deleteKey(keyId);
  };
  getKey = async (providerId, providerUserId) => {
    const keyId = createKeyId(providerId, providerUserId);
    const databaseKey = await this.adapter.getKey(keyId);
    if (!databaseKey) {
      throw new LuciaError("AUTH_INVALID_KEY_ID");
    }
    const key = this.transformDatabaseKey(databaseKey);
    return key;
  };
  getAllUserKeys = async (userId) => {
    const [databaseKeys] = await Promise.all([
      await this.adapter.getKeysByUserId(userId),
      this.getUser(userId)
    ]);
    return databaseKeys.map((databaseKey) => this.transformDatabaseKey(databaseKey));
  };
  updateKeyPassword = async (providerId, providerUserId, password) => {
    const keyId = createKeyId(providerId, providerUserId);
    const hashedPassword = password === null ? null : await this.passwordHash.generate(password);
    await this.adapter.updateKey(keyId, {
      hashed_password: hashedPassword
    });
    return await this.getKey(providerId, providerUserId);
  };
}
const auth = lucia({
  adapter: prisma(prisma$1),
  env: "PROD",
  middleware: sveltekit(),
  transformDatabaseUser: (userData) => {
    return {
      userId: userData.id,
      username: userData.username,
      role: userData.role
    };
  },
  getUserAttributes: (user) => {
    return {
      userId: user.userId,
      username: user.username,
      role: user.role
    };
  }
});
export {
  auth as a
};
