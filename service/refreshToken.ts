export async function getNewAccessToken(refreshToken: string) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
      {
        method: "POST",
        headers: { Cookie: `refreshToken=${refreshToken}` },
        cache: "no-store",
      },
    );

    const json = await res.json();

    if (!res.ok || !json.success) {
      return {
        success: false as const,
        message: json?.message ?? "Failed to refresh token",
      };
    }

    return {
      success: true as const,
      data: json.data as { accessToken: string },
    };
  } catch {
    return { success: false as const, message: "Failed to refresh token" };
  }
}
