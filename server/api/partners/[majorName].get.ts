import type { MajorName } from "~/models/MajorName";

interface Company {
  id: number;
  name: string;
  logo: string;
  website?: string;
}

const partnersData: Record<MajorName, Company[]> = {
  rpl: [
    { id: 1, name: "Microsoft", logo: "/images/logo.webp", website: "https://microsoft.com" },
    { id: 2, name: "Google", logo: "/images/logo.webp", website: "https://google.com" },
    { id: 3, name: "IBM", logo: "/images/logo.webp", website: "https://ibm.com" },
    { id: 4, name: "Amazon", logo: "/images/logo.webp", website: "https://amazon.com" },
    { id: 5, name: "Oracle", logo: "/images/logo.webp", website: "https://oracle.com" },
    { id: 6, name: "Cisco", logo: "/images/logo.webp", website: "https://cisco.com" },
  ],
  tkj: [
    { id: 1, name: "Microsoft", logo: "/images/logo.webp", website: "https://microsoft.com" },
    { id: 2, name: "Google", logo: "/images/logo.webp", website: "https://google.com" },
    { id: 3, name: "IBM", logo: "/images/logo.webp", website: "https://ibm.com" },
    { id: 4, name: "Amazon", logo: "/images/logo.webp", website: "https://amazon.com" },
    { id: 5, name: "Oracle", logo: "/images/logo.webp", website: "https://oracle.com" },
    { id: 6, name: "Cisco", logo: "/images/logo.webp", website: "https://cisco.com" },
  ],
  dkv: [
    { id: 1, name: "Adobe", logo: "/images/logo.webp", website: "https://adobe.com" },
    { id: 2, name: "Canva", logo: "/images/logo.webp", website: "https://canva.com" },
    { id: 3, name: "Figma", logo: "/images/logo.webp", website: "https://figma.com" },
    { id: 4, name: "Dribbble", logo: "/images/logo.webp", website: "https://dribbble.com" },
    { id: 5, name: "Behance", logo: "/images/logo.webp", website: "https://behance.net" },
    { id: 6, name: "Pinterest", logo: "/images/logo.webp", website: "https://pinterest.com" },
  ],
  animasi: [
    { id: 1, name: "Pixar", logo: "/images/logo.webp", website: "https://pixar.com" },
    { id: 2, name: "Disney", logo: "/images/logo.webp", website: "https://disney.com" },
    { id: 3, name: "DreamWorks", logo: "/images/logo.webp", website: "https://dreamworks.com" },
    { id: 4, name: "Studio Ghibli", logo: "/images/logo.webp" },
    { id: 5, name: "Blender", logo: "/images/logo.webp", website: "https://blender.org" },
    { id: 6, name: "Autodesk", logo: "/images/logo.webp", website: "https://autodesk.com" },
  ],
  broadcasting: [
    { id: 1, name: "Netflix", logo: "/images/logo.webp", website: "https://netflix.com" },
    { id: 2, name: "HBO", logo: "/images/logo.webp", website: "https://hbo.com" },
    { id: 3, name: "BBC", logo: "/images/logo.webp", website: "https://bbc.com" },
    { id: 4, name: "CNN", logo: "/images/logo.webp", website: "https://cnn.com" },
    { id: 5, name: "YouTube", logo: "/images/logo.webp", website: "https://youtube.com" },
    { id: 6, name: "Twitch", logo: "/images/logo.webp", website: "https://twitch.tv" },
  ],
  tei: [
    { id: 1, name: "Siemens", logo: "/images/logo.webp", website: "https://siemens.com" },
    { id: 2, name: "Schneider Electric", logo: "/images/logo.webp", website: "https://se.com" },
    { id: 3, name: "ABB", logo: "/images/logo.webp", website: "https://abb.com" },
    { id: 4, name: "Mitsubishi Electric", logo: "/images/logo.webp", website: "https://mitsubishielectric.com" },
    { id: 5, name: "Omron", logo: "/images/logo.webp", website: "https://omron.com" },
    { id: 6, name: "Rockwell", logo: "/images/logo.webp", website: "https://rockwellautomation.com" },
  ],
  mekatronika: [
    { id: 1, name: "Fanuc", logo: "/images/logo.webp", website: "https://fanuc.com" },
    { id: 2, name: "KUKA", logo: "/images/logo.webp", website: "https://kuka.com" },
    { id: 3, name: "ABB Robotics", logo: "/images/logo.webp", website: "https://abb.com" },
    { id: 4, name: "Yaskawa", logo: "/images/logo.webp", website: "https://yaskawa.com" },
    { id: 5, name: "Universal Robots", logo: "/images/logo.webp", website: "https://universal-robots.com" },
    { id: 6, name: "Bosch", logo: "/images/logo.webp", website: "https://bosch.com" },
  ],
  tav: [
    { id: 1, name: "Yamaha", logo: "/images/logo.webp", website: "https://yamaha.com" },
    { id: 2, name: "Sony", logo: "/images/logo.webp", website: "https://sony.com" },
    { id: 3, name: "Shure", logo: "/images/logo.webp", website: "https://shure.com" },
    { id: 4, name: "Bose", logo: "/images/logo.webp", website: "https://bose.com" },
    { id: 5, name: "JBL", logo: "/images/logo.webp", website: "https://jbl.com" },
    { id: 6, name: "Sennheiser", logo: "/images/logo.webp", website: "https://sennheiser.com" },
  ],
};

export default defineEventHandler((event) => {
  const majorName = getRouterParam(event, "majorName") as MajorName;

  if (!majorName || !partnersData[majorName]) {
    throw createError({
      statusCode: 404,
      statusMessage: "Major not found",
    });
  }

  return partnersData[majorName];
});
