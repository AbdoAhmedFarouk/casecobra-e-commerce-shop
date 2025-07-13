export async function GET() {
  const logoutUrl = `${process.env.KINDE_ISSUER_URL}/logout?client_id=${process.env.KINDE_CLIENT_ID}&logout_redirect=${encodeURIComponent(process.env.KINDE_POST_LOGOUT_REDIRECT_URL!)}`;
  return Response.redirect(logoutUrl, 302);
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
