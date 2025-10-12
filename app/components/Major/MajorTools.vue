<script setup lang="ts">
import type { MajorName } from "~/models/MajorName";
import { majorColorSchemes } from "~/utils/majorColors";
import {
  Code,
  Server,
  Atom,
  Database,
  GitBranch,
  Palette,
  PenTool,
  Monitor,
  Layers,
  FileText,
  Video,
  Zap,
  Activity,
  Flame,
  Cpu,
  CircuitBoard,
  Cog,
  Eye,
  Move,
  Camera,
  Mic,
  Lightbulb,
  Radio,
  Antenna,
  Volume2,
  VideoIcon,
  SwitchCamera,
  Edit,
  Network,
  Wifi,
  RotateCw
} from "lucide-vue-next";

const props = defineProps<{
  major: MajorName;
}>();

const majorColor = computed(() => majorColorSchemes[props.major]);

// Define tools for each major
const toolsData = {
  rpl: [
    {
      name: "Visual Studio Code",
      icon: Code,
      description: "Integrated Development Environment (IDE) untuk pengembangan web dan aplikasi",
    },
    {
      name: "Node.js",
      icon: Server,
      description: "Runtime JavaScript untuk pengembangan backend dan server-side",
    },
    {
      name: "React",
      icon: Atom,
      description: "Library JavaScript untuk membangun antarmuka pengguna interaktif",
    },
    {
      name: "Python",
      icon: Code,
      description: "Bahasa pemrograman untuk analisis data dan machine learning",
    },
    {
      name: "MySQL",
      icon: Database,
      description: "Sistem manajemen basis data relasional",
    },
    {
      name: "Git",
      icon: GitBranch,
      description: "Sistem kontrol versi untuk kolaborasi pengembangan perangkat lunak",
    },
  ],
  dkv: [
    {
      name: "Adobe Photoshop",
      icon: Palette,
      description: "Software editing gambar dan desain grafis profesional",
    },
    {
      name: "Adobe Illustrator",
      icon: PenTool,
      description: "Software vektor untuk desain logo dan ilustrasi",
    },
    {
      name: "Figma",
      icon: Monitor,
      description: "Platform kolaboratif untuk desain antarmuka dan prototipe",
    },
    {
      name: "Adobe InDesign",
      icon: FileText,
      description: "Software untuk desain layout dan penerbitan",
    },
    {
      name: "Blender",
      icon: Layers,
      description: "Software 3D modeling dan animasi open-source",
    },
    {
      name: "Sketch",
      icon: PenTool,
      description: "Alat desain vektor untuk UI/UX design",
    },
  ],
  animasi: [
    {
      name: "Blender",
      icon: Video,
      description: "Software 3D modeling, animasi, dan rendering",
    },
    {
      name: "Adobe After Effects",
      icon: Video,
      description: "Software untuk motion graphics dan efek visual",
    },
    {
      name: "Autodesk Maya",
      icon: Layers,
      description: "Software 3D modeling dan animasi profesional",
    },
    {
      name: "Cinema 4D",
      icon: Video,
      description: "Software 3D modeling dan animasi untuk film dan TV",
    },
    {
      name: "Toon Boom Harmony",
      icon: Video,
      description: "Software animasi 2D untuk produksi kartun",
    },
    {
      name: "ZBrush",
      icon: Layers,
      description: "Software sculpting digital untuk karakter dan model 3D",
    },
  ],
  tkj: [
    {
      name: "Cisco Packet Tracer",
      icon: Network,
      description: "Simulator jaringan untuk latihan konfigurasi Cisco",
    },
    {
      name: "Wireshark",
      icon: Activity,
      description: "Analisis paket jaringan untuk troubleshooting",
    },
    {
      name: "Router Cisco",
      icon: Network,
      description: "Perangkat routing untuk menghubungkan jaringan",
    },
    {
      name: "Switch Network",
      icon: Network,
      description: "Perangkat switching untuk distribusi data dalam LAN",
    },
    {
      name: "Kabel UTP",
      icon: Network,
      description: "Kabel twisted pair untuk koneksi Ethernet",
    },
    {
      name: "Access Point",
      icon: Wifi,
      description: "Perangkat untuk menghubungkan perangkat ke jaringan Wi-Fi",
    },
  ],
  tei: [
    {
      name: "Multimeter Digital",
      icon: Zap,
      description: "Alat ukur tegangan, arus, dan resistansi",
    },
    {
      name: "Oscilloscope",
      icon: Activity,
      description: "Alat untuk mengukur dan menampilkan sinyal listrik",
    },
    {
      name: "Soldering Iron",
      icon: Flame,
      description: "Alat untuk menyolder komponen elektronik",
    },
    {
      name: "PLC (Programmable Logic Controller)",
      icon: Cpu,
      description: "Controller untuk otomasi sistem industri",
    },
    {
      name: "Arduino Board",
      icon: CircuitBoard,
      description: "Platform prototyping elektronik berbasis mikrokontroler",
    },
    {
      name: "Breadboard",
      icon: CircuitBoard,
      description: "Papan prototyping untuk merakit sirkuit elektronik",
    },
  ],
  mekatronika: [
    {
      name: "CNC Machine",
      icon: Cog,
      description: "Mesin CNC untuk pemotongan dan pembentukan presisi",
    },
    {
      name: "Sensor Proximity",
      icon: Eye,
      description: "Sensor untuk mendeteksi keberadaan objek tanpa kontak",
    },
    {
      name: "Actuator Linear",
      icon: Move,
      description: "Aktuator untuk gerakan linear dalam sistem mekanik",
    },
    {
      name: "PLC Controller",
      icon: Cpu,
      description: "Controller untuk mengontrol proses otomasi",
    },
    {
      name: "CAD Software (AutoCAD)",
      icon: Monitor,
      description: "Software desain assisten untuk model mekanik",
    },
    {
      name: "Servo Motor",
      icon: RotateCw,
      description: "Motor servo untuk kontrol posisi presisi",
    },
  ],
  tav: [
    {
      name: "Kamera DSLR",
      icon: Camera,
      description: "Kamera digital untuk produksi video profesional",
    },
    {
      name: "Mikrofon Kondensor",
      icon: Mic,
      description: "Mikrofon untuk rekaman audio berkualitas tinggi",
    },
    {
      name: "Lighting Equipment",
      icon: Lightbulb,
      description: "Peralatan pencahayaan untuk produksi video",
    },
    {
      name: "Adobe Premiere Pro",
      icon: Video,
      description: "Software editing video profesional",
    },
    {
      name: "DaVinci Resolve",
      icon: Video,
      description: "Software color grading dan finishing video",
    },
    {
      name: "Tripod",
      icon: Video,
      description: "Kaki tiga untuk stabilisasi kamera",
    },
  ],
  broadcasting: [
    {
      name: "Transmitter FM",
      icon: Radio,
      description: "Peralatan untuk transmisi siaran radio FM",
    },
    {
      name: "Antena Yagi",
      icon: Antenna,
      description: "Antena directional untuk siaran televisi",
    },
    {
      name: "Audio Mixer",
      icon: Volume2,
      description: "Konsol mixing untuk kontrol audio siaran",
    },
    {
      name: "Kamera Broadcast",
      icon: VideoIcon,
      description: "Kamera profesional untuk produksi siaran",
    },
    {
      name: "Video Switcher",
      icon: SwitchCamera,
      description: "Perangkat untuk switching sumber video",
    },
    {
      name: "Editing Software",
      icon: Edit,
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
            <component :is="tool.icon" :size="32" />
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
