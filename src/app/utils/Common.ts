export function setAuthToken(token: string) {
  console.log("setting cookie: ", token);
  
  document.cookie = `token=${token};`;
  console.log(document.cookie);
  
}