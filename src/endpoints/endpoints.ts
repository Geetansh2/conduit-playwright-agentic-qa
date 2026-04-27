export const Endpoints = {
  auth: {
    login: "/api/users/login",
    register: "/api/users",
    getCurrentUser: "/api/user",
  },

  article: {
    create: "/api/articles",
    getAll: "/api/articles",
    getBySlug: (slug: string) => `/api/articles/${slug}`,
  },
};