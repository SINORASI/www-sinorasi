import { defineEventHandler, getQuery, readBody, createError, setCookie, getCookie } from 'h3';
import type { Activity } from "~/models/Activity";

export default defineEventHandler(async (event): Promise<Activity | null> => {
  const id = getRouterParam(event, "id");

  const activities: Activity[] = [
    {
      id: "1",
      image: "/images/placeholder.jpg",
      title: "Kejuaraan Antar Sekolah Se-Surabaya",
      description:
        "Tim basket putra berhasil meraih juara 2 dalam kompetisi bergengsi yang diikuti 32 sekolah menengah atas di Surabaya dengan persaingan yang sangat ketat",
      date: "2024-03-15",
      extracurricular: "basket",
    },
  ];

  const activity = activities.find((a) => a.id === id);

  if (!activity) {
    throw createError({
      statusCode: 404,
      message: "Activity not found",
    });
  }

  return activity;
});
