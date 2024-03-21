import { createRouter, createWebHistory } from 'vue-router';
import roomList from '@/pages/roomList.vue';
import searchRoom from '@/pages/searchRoom.vue';

const routes = [
  {
    path: '/',
    name: "home",
    component: searchRoom,
  },
  {
    path: '/room_available',
    name: "roomAvailable",
    component: roomList,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;