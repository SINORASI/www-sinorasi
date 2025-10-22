import { defineEventHandler, getRouterParam, createError } from "h3";
import type { MajorName } from "~/models/MajorName";

interface Company {
  id: number;
  name: string;
  logo: string;
}

const allPartners: Company[] = [
  {
    id: 1,
    name: "BACAMALANG.COM",
    logo: "/images/industri/BACAMALANG.COM/cropped-images-94-1.jpg",
  },
  {
    id: 2,
    name: "BATU LOVE GARDEN",
    logo: "/images/industri/BATU LOVE GARDEN/logo_wahana-12.png",
  },
  {
    id: 3,
    name: "CV. KAROSERI HARTONO",
    logo: "/images/industri/CV. KAROSERI HARTONO/images.png",
  },
  {
    id: 4,
    name: "GAJAYANA TV",
    logo: "/images/industri/GAJAYANA TV/Gajayana_TV.jpg",
  },
  {
    id: 5,
    name: "PT. ADIPUTRO WIRASEJATI",
    logo: "/images/industri/PT. ADIPUTRO WIRASEJATI/Gaji-PT-Adiputro-Wirasejati.webp",
  },
  {
    id: 6,
    name: "PT. ANUGERAH PUTRA",
    logo: "/images/industri/PT. ANUGERAH PUTRA/logo.png",
  },
  {
    id: 7,
    name: "PT. ARTHAWENA SAKTI",
    logo: "/images/industri/PT. ARTHAWENA SAKTI/img-logo.webp",
  },
  {
    id: 8,
    name: "PT. BEIERSDORF",
    logo: "/images/industri/PT. BEIERSDORF/Beiersdorf-Symbol.jpg",
  },
  {
    id: 9,
    name: "PT. INDIRATEX SPINDO",
    logo: "/images/industri/PT. INDIRATEX SPINDO/images.png",
  },
  {
    id: 10,
    name: "PT. MAVENS MITRA",
    logo: "/images/industri/PT. MAVENS MITRA/images.jpg",
  },
  {
    id: 11,
    name: "PT. MILLENIAL GLOW",
    logo: "/images/industri/PT. MILLENIAL GLOW/images.png",
  },
  {
    id: 12,
    name: "PT. NATHANIA FURNITURE",
    logo: "/images/industri/PT. NATHANIA FURNITURE/logo-nathania-furniture-pt-20250213150355.jpg",
  },
  {
    id: 13,
    name: "PT. OPTIMA NIAGA",
    logo: "/images/industri/PT. OPTIMA NIAGA/images.jpg",
  },
  {
    id: 14,
    name: "PT. QUANTUM NUSATAMA",
    logo: "/images/industri/PT. QUANTUM NUSATAMA/unnamed.png",
  },
  {
    id: 15,
    name: "PT. TENTREM SEJAHTERA",
    logo: "/images/industri/PT. TENTREM SEJAHTERA/PT-TENTREM-SEJAHTERA-Karoseri-Tentrem.jpg",
  },
  {
    id: 16,
    name: "PT. UTERO KREATIF",
    logo: "/images/industri/PT. UTERO KREATIF/28864c51af72c887c2e07fa822096918.webp",
  },
  {
    id: 17,
    name: "PT.AWECO INDOSTEEL",
    logo: "/images/industri/PT.AWECO INDOSTEEL/images.jpg",
  },
  {
    id: 18,
    name: "SENYUM WORLD HOTEL",
    logo: "/images/industri/SENYUM WORLD HOTEL/Untitled-1-03-1.jpg",
  },
];

export default defineEventHandler((event) => {
  const majorName = getRouterParam(event, "majorName") as MajorName;

  if (!majorName) {
    throw createError({
      statusCode: 404,
      statusMessage: "Major not found",
    });
  }

  return allPartners;
});
