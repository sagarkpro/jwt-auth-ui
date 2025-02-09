export async function POST(req: Request){
  const reqBody = await req.json();
  const header = new Headers();
  header.append("Content-Type", "application/json");

  const res = await fetch("http://localhost:8080/api/user/register", {
    body: JSON.stringify(reqBody),
    method: "POST",
    headers: header
  });
  return res;
}