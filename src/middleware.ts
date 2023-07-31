import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: ["/", "/auth/:path*", "/bantin/:path", "/danhmuc/:path"],
	ignoredRoutes: ["/api/clerk/event/:path"],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
