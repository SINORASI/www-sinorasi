<script setup lang="ts">
import type { MajorName } from "~/models/MajorName";
import { majorColorSchemes } from "~/utils/majorColors";

const props = defineProps<{
  major: MajorName;
}>();

const majorColor = computed(() => majorColorSchemes[props.major]);

// Define tools for each major
const toolsData = {
  rpl: [
    {
      name: "Visual Studio Code",
      icon: "vscode-icons:file-type-vscode",
      description: "Integrated Development Environment (IDE) untuk pengembangan web dan aplikasi",
    },
    {
      name: "Node.js",
      icon: "logos:nodejs",
      description: "Runtime JavaScript untuk pengembangan backend dan server-side",
    },
    {
      name: "React",
      icon: "logos:react",
      description: "Library JavaScript untuk membangun antarmuka pengguna interaktif",
    },
    {
      name: "Python",
      icon: "logos:python",
      description: "Bahasa pemrograman untuk analisis data dan machine learning",
    },
    {
      name: "MySQL",
      icon: "logos:mysql",
      description: "Sistem manajemen basis data relasional",
    },
    {
      name: "Git",
      icon: "logos:git",
      description: "Sistem kontrol versi untuk kolaborasi pengembangan perangkat lunak",
    },
  ],
  dkv: [
    {
      name: "Adobe Photoshop",
      icon: "logos:adobe-photoshop",
      description: "Software editing gambar dan desain grafis profesional",
    },
    {
      name: "Adobe Illustrator",
      icon: "logos:adobe-illustrator",
      description: "Software vektor untuk desain logo dan ilustrasi",
    },
    {
      name: "Figma",
      icon: "logos:figma",
      description: "Platform kolaboratif untuk desain antarmuka dan prototipe",
    },
    {
      name: "Adobe InDesign",
      icon: "logos:adobe-indesign",
      description: "Software untuk desain layout dan penerbitan",
    },
    {
      name: "Blender",
      icon: "logos:blender",
      description: "Software 3D modeling dan animasi open-source",
    },
    {
      name: "Sketch",
      icon: "logos:sketch",
      description: "Alat desain vektor untuk UI/UX design",
    },
  ],
  animasi: [
    {
      name: "Blender",
      icon: "logos:blender",
      description: "Software 3D modeling, animasi, dan rendering",
    },
    {
      name: "Adobe After Effects",
      icon: "logos:adobe-after-effects",
      description: "Software untuk motion graphics dan efek visual",
    },
    {
      name: "Autodesk Maya",
      icon: "logos:maya",
      description: "Software 3D modeling dan animasi profesional",
    },
    {
      name: "Cinema 4D",
      icon: "logos:cinema4d",
      description: "Software 3D modeling dan animasi untuk film dan TV",
    },
    {
      name: "Toon Boom Harmony",
      icon: "logos:toon-boom",
      description: "Software animasi 2D untuk produksi kartun",
    },
    {
      name: "ZBrush",
      icon: "logos:zbrush",
      description: "Software sculpting digital untuk karakter dan model 3D",
    },
  ],
  tkj: [
    {
      name: "Cisco Packet Tracer",
      icon: "logos:cisco",
      description: "Simulator jaringan untuk latihan konfigurasi Cisco",
    },
    {
      name: "Wireshark",
      icon: "logos:wireshark",
      description: "Analisis paket jaringan untuk troubleshooting",
    },
    {
      name: "Router Cisco",
      icon: "logos:cisco",
      description: "Perangkat routing untuk menghubungkan jaringan",
    },
    {
      name: "Switch Network",
      icon: "lucide:network",
      description: "Perangkat switching untuk distribusi data dalam LAN",
    },
    {
      name: "Kabel UTP",
      icon: "lucide:network",
      description: "Kabel twisted pair untuk koneksi Ethernet",
    },
    {
      name: "Access Point",
      icon: "lucide:wifi",
      description: "Perangkat untuk menghubungkan perangkat ke jaringan Wi-Fi",
    },
  ],
  tei: [
    {
      name: "Multimeter Digital",
      icon: "lucide:zap",
      description: "Alat ukur tegangan, arus, dan resistansi",
    },
    {
      name: "Oscilloscope",
      icon: "lucide:activity",
      description: "Alat untuk mengukur dan menampilkan sinyal listrik",
    },
    {
      name: "Soldering Iron",
      icon: "lucide:flame",
      description: "Alat untuk menyolder komponen elektronik",
    },
    {
      name: "PLC (Programmable Logic Controller)",
      icon: "lucide:cpu",
      description: "Controller untuk otomasi sistem industri",
    },
    {
      name: "Arduino Board",
      icon: "logos:arduino",
      description: "Platform prototyping elektronik berbasis mikrokontroler",
    },
    {
      name: "Breadboard",
      icon: "lucide:circuit-board",
      description: "Papan prototyping untuk merakit sirkuit elektronik",
    },
  ],
  mekatronika: [
    {
      name: "CNC Machine",
      icon: "lucide:cog",
      description: "Mesin CNC untuk pemotongan dan pembentukan presisi",
    },
    {
      name: "Sensor Proximity",
      icon: "lucide:eye",
      description: "Sensor untuk mendeteksi keberadaan objek tanpa kontak",
    },
    {
      name: "Actuator Linear",
      icon: "lucide:move",
      description: "Aktuator untuk gerakan linear dalam sistem mekanik",
    },
    {
      name: "PLC Controller",
      icon: "lucide:cpu",
      description: "Controller untuk mengontrol proses otomasi",
    },
    {
      name: "CAD Software (AutoCAD)",
      icon: "logos:autocad",
      description: "Software desain assisten untuk model mekanik",
    },
    {
      name: "Servo Motor",
      icon: "lucide:rotate-cw",
      description: "Motor servo untuk kontrol posisi presisi",
    },
  ],
  tav: [
    {
      name: "Kamera DSLR",
      icon: "lucide:camera",
      description: "Kamera digital untuk produksi video profesional",
    },
    {
      name: "Mikrofon Kondensor",
      icon: "lucide:mic",
      description: "Mikrofon untuk rekaman audio berkualitas tinggi",
    },
    {
      name: "Lighting Equipment",
      icon: "lucide:lightbulb",
      description: "Peralatan pencahayaan untuk produksi video",
    },
    {
      name: "Adobe Premiere Pro",
      icon: "logos:adobe-premiere",
      description: "Software editing video profesional",
    },
    {
      name: "DaVinci Resolve",
      icon: "logos:davinci-resolve",
      description: "Software color grading dan finishing video",
    },
    {
      name: "Tripod",
      icon: "lucide:video",
      description: "Kaki tiga untuk stabilisasi kamera",
    },
  ],
  broadcasting: [
    {
      name: "Transmitter FM",
      icon: "lucide:radio",
      description: "Peralatan untuk transmisi siaran radio FM",
    },
    {
      name: "Antena Yagi",
      icon: "lucide:antenna",
      description: "Antena directional untuk siaran televisi",
    },
    {
      name: "Audio Mixer",
      icon: "lucide:volume-2",
      description: "Konsol mixing untuk kontrol audio siaran",
    },
    {
      name: "Kamera Broadcast",
      icon: "lucide:video",
      description: "Kamera profesional untuk produksi siaran",
    },
    {
      name: "Video Switcher",
      icon: "lucide:switch-camera",
      description: "Perangkat untuk switching sumber video",
    },
    {
      name: "Editing Software",
      icon: "lucide:edit",
      description: "Software untuk editing dan post-produksi siaran",
    },
  ],
};

const tools = computed(() => toolsData[props.major] || []);
</script>

<template>
  <section
    id="tools"
    class="min-h-screen py-16 md:py-24"
    :style="`background: linear-gradient(135deg, ${majorColor.primary}05, ${majorColor.accent}05)`"
  >
    <div class="container flex flex-col items-center justify-center gap-10 px-4 mx-auto md:gap-12">
      <!-- Section Header -->
      <div class="max-w-3xl space-y-4 text-center">
        <div class="inline-block">
          <span
            class="px-4 py-2 text-sm font-bold tracking-widest uppercase rounded-full md:text-base"
            :style="`background: ${majorColor.primary}; color: white`"
          >
            Tools & Equipment
          </span>
        </div>
        <h2
          class="text-3xl font-extrabold text-transparent md:text-5xl bg-gradient-to-r bg-clip-text"
          :style="`background-image: linear-gradient(135deg, ${majorColor.primary}, ${majorColor.accent})`"
        >
          Alat dan Peralatan
        </h2>
        <p class="max-w-2xl mx-auto text-sm text-gray-600 md:text-lg">
          Berbagai tools dan equipment yang digunakan dalam pembelajaran jurusan {{ major }}
        </p>
      </div>

      <!-- Tools Grid -->
      <div class="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="tool in tools"
          :key="tool.name"
          class="flex flex-col items-center p-6 transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-1"
        >
          <!-- Icon -->
          <div
            class="flex items-center justify-center w-16 h-16 mb-4 rounded-full shadow-md"
            :style="`background: ${majorColor.light}; color: ${majorColor.primary}`"
          >
            <Icon :name="tool.icon" :size="32" />
          </div>

          <!-- Name -->
          <h3 class="mb-2 text-lg font-bold text-center text-gray-800 md:text-xl">
            {{ tool.name }}
          </h3>

          <!-- Description -->
          <p class="text-sm text-center text-gray-600 md:text-base">
            {{ tool.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
