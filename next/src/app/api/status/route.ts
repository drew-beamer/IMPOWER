

export async function GET(request: Request) {
  const message = {
    "status": "up and running!"
  }
  return new Response(JSON.stringify(message))
}
