export async function GET() {
  const result = { header: 'header-data', message: 'get request invoked successfully' };
  return new Response(JSON.stringify(result));
}
