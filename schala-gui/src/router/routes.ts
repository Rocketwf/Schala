import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../nolayout/NoLayout.vue'),
    children: [
      { path: '', component: () => import('../nolayout/homepage/HomePage.vue')},
    ],
  },
  {
    path: '/profile',
    component: () => import('../mainlayout/MainLayout.vue'),
    children: [
      { path: 'search', component: () => import('../mainlayout/searchresultspage/SearchResultsPage.vue')},
      { path: 'show', component: () => import('../mainlayout/profilepage/ProfilePage.vue')},
      { path: 'compare', component: () => import('../mainlayout/comparepage/ComparePage.vue')}
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
