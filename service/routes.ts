export const BaseUrl = "http://localhost:8080";
export const Routes = {
  health: "/health",
  chats: {
    _: "/chats",
    id: {
      _: "/chats/:id",
      title: { _: "/chats/:id/title" },
      message: {
        new: {
          _: "/chats/:id/message/new",
        },
      },
    },
    start: {
      _: "/chats/start",
    },
    messages: {
      _: "/chats/messages",
    },
  },
  models: {
    _: "/models",
  },
} as const;

export function generateRoute(
  routeTemplate: string,
  params: Record<string, string | number>
): string {
  let route = routeTemplate;
  for (const [key, value] of Object.entries(params)) {
    route = route.replace(`:${key}`, String(value));
  }
  return route;
}
