import { jwtDecode } from "jwt-decode";

export default defineNuxtRouteMiddleware((_to, _from) => {
  const token = useCookie("recipe_token");
  if (!token || !token.value || !token.value.length)
    return navigateTo("/login");

  const decoded = jwtDecode(token.value);
  return decoded.exp && decoded.exp > Date.now() / 1000
    ? true
    : navigateTo("/login");

    
});
