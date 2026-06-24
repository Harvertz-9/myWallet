import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import { authService } from "../services/authService";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/SplashPage.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    component: () => import("@/views/RegisterPage.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/tabs/",
    component: TabsPage,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "/tabs/dashboard",
      },
      {
        path: "dashboard",
        component: () => import("@/views/DashboardPage.vue"),
      },
      {
        path: "transactions",
        component: () => import("@/views/TransactionsPage.vue"),
      },
      {
        path: "statistics",
        component: () => import("@/views/StatisticsPage.vue"),
      },
      {
        path: "profile",
        component: () => import("@/views/ProfilePage.vue"),
      },
      {
        path: "profile/edit",
        component: () => import("@/views/EditProfilePage.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guard
router.beforeEach((to, _from, next) => {
  const isAuthenticated = authService.isAuthenticated();

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Not logged in, redirect to login
    next("/login");
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // Already logged in, redirect to dashboard
    next("/tabs/dashboard");
  } else {
    next();
  }
});

export default router;
