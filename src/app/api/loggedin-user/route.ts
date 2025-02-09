export async function GET(req: Request){  
  const res = await fetch("http://localhost:8080/api/user/loggedin-user", {
    method: "GET",
    headers: req.headers
  });
  return res;
}