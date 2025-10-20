import { defineEventHandler, getQuery, readBody, createError, setCookie, getCookie } from 'h3';
import type { JobTitle } from "~/models/JobTitle";
import type { MajorName } from "~/models/MajorName";

const JobTitles: Record<MajorName, JobTitle[]> = {
  rpl: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "Software Engineer",
      description:
        "profesional yang merancang, mengembangkan, menguji, dan memelihara perangkat lunak komputer, aplikasi, dan sistem untuk memecahkan masalah dunia nyata",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "Web Developer",
      description:
        "Profesional yang membangun, mengembangkan, dan memelihara situs web dan aplikasi web",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Frontend Developer",
      description:
        "profesional yang berfokus pada sisi visual dan interaktif aplikasi atau situs web yang langsung dilihat dan digunakan oleh pengguna",
    },
  ],
  tkj: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "System Administrator",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "Network Administrator",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Cyber Security Analyst",
      description: "lorem ipsum dolo    r sit amet liraz vira noedn edjd ask to vom ti",
    },
  ],
  dkv: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "Graphic Designer",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "Brand Designer",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Advertising Creative",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
  ],
  animasi: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "3D Animator",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "Visual Effects Artist",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Motion Graphics Designer",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
  ],
  broadcasting: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "Production Assistant",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "Content Creator",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Camera Operator",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
  ],
  tei: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "Industrial Electrician",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "Instrumentation Technician",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Process Control Operator",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
  ],
  mekatronika: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "Operator Robotik",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "PLC Programmer",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Automation Engineer",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
  ],
  tav: [
    {
      id: "1",
      image: "/images/logo.webp",
      title: "Audio Engineer",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "2",
      image: "/images/logo.webp",
      title: "Sound System Technician",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
    {
      id: "3",
      image: "/images/logo.webp",
      title: "Electronics Repair Specialist",
      description: "lorem ipsum dolor sit amet liraz vira noedn edjd ask to vom ti",
    },
  ],
};

export default defineEventHandler(async (event) => {
  const majorName = getRouterParam(event, "majorName") as MajorName;

  const jobTitles = JobTitles[majorName];

  if (!jobTitles) {
    throw createError({
      statusCode: 404,
      statusMessage: "Job titles not found for this major",
    });
  }

  return jobTitles;
});
