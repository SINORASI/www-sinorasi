import { defineEventHandler } from "h3";
import type { JobTitle } from "~/models/JobTitle";
import type { MajorName } from "~/models/MajorName";

const JobTitles: Record<MajorName, JobTitle[]> = {
  rpl: [
    {
      id: "1",
      icon: "code",
      title: "Software Engineer",
      description:
        "Software Engineer adalah profesional yang merancang, mengembangkan, menguji, dan memelihara perangkat lunak komputer, aplikasi, dan sistem untuk memecahkan masalah dunia nyata. Tanggung jawab utama: pengembangan kode, debugging, kolaborasi tim, dan memastikan kualitas perangkat lunak. Keterampilan yang diperlukan: bahasa pemrograman seperti Java, Python, C++, pemecahan masalah, kontrol versi (Git). Prospek karir: permintaan tinggi di perusahaan teknologi, startup, pemerintah; potensi untuk peran senior, spesialisasi di bidang AI atau keamanan siber; gaji rata-rata kompetitif.",
    },
    {
      id: "2",
      icon: "globe",
      title: "Web Developer",
      description:
        "Web Developer adalah profesional yang membangun, mengembangkan, dan memelihara situs web dan aplikasi web. Tanggung jawab utama: pengembangan frontend dan backend, integrasi API, optimasi performa, dan responsivitas. Keterampilan yang diperlukan: HTML, CSS, JavaScript, framework seperti React atau Vue.js, database. Prospek karir: peluang di agensi digital, perusahaan e-commerce, startup; kemungkinan menjadi full-stack developer atau spesialis frontend/backend; gaji menarik dengan bonus.",
    },
    {
      id: "3",
      icon: "palette",
      title: "Frontend Developer",
      description:
        "Frontend Developer adalah profesional yang berfokus pada sisi visual dan interaktif aplikasi atau situs web yang langsung dilihat dan digunakan oleh pengguna. Tanggung jawab utama: implementasi UI/UX, pengembangan antarmuka, optimasi untuk berbagai perangkat. Keterampilan yang diperlukan: HTML, CSS, JavaScript, framework seperti React, Angular, atau Vue.js. Prospek karir: permintaan tinggi di industri digital, perusahaan teknologi; potensi untuk peran lead developer atau UX designer; gaji kompetitif dengan peluang remote work.",
    },
    {
      id: "4",
      icon: "database",
      title: "Data Scientist",
      description:
        "Data Scientist adalah profesional yang menganalisis dan menginterpretasi data kompleks untuk membantu organisasi membuat keputusan yang lebih baik. Tanggung jawab utama: pengumpulan data, analisis statistik, pembuatan model prediktif, visualisasi data. Keterampilan yang diperlukan: Python, R, SQL, machine learning, statistik. Prospek karir: peluang di perusahaan teknologi, keuangan, kesehatan; kemungkinan menjadi data engineer atau AI specialist; gaji tinggi dengan bonus berbasis performa.",
    },
    {
      id: "5",
      icon: "settings",
      title: "DevOps Engineer",
      description:
        "DevOps Engineer adalah profesional yang mengintegrasikan pengembangan perangkat lunak dengan operasi IT untuk meningkatkan efisiensi dan kecepatan pengiriman aplikasi. Tanggung jawab utama: otomasi proses, manajemen infrastruktur cloud, monitoring sistem. Keterampilan yang diperlukan: scripting (Bash, Python), tools seperti Docker, Kubernetes, AWS. Prospek karir: permintaan tinggi di perusahaan teknologi besar; potensi untuk peran senior atau cloud architect; gaji kompetitif dengan peluang kerja remote.",
    },
  ],
  tkj: [
    {
      id: "1",
      icon: "server",
      title: "System Administrator",
      description:
        "System Administrator adalah profesional yang mengelola dan memelihara sistem komputer dan jaringan dalam organisasi. Tanggung jawab utama: instalasi dan konfigurasi server, pemantauan performa, keamanan sistem, troubleshooting. Keterampilan yang diperlukan: Linux/Windows server, networking, scripting, keamanan IT. Prospek karir: peluang di perusahaan IT, pemerintah, perusahaan besar; kemungkinan menjadi network administrator atau IT manager; gaji stabil dengan tunjangan.",
    },
    {
      id: "2",
      icon: "network",
      title: "Network Administrator",
      description:
        "Network Administrator adalah profesional yang merancang, mengimplementasikan, dan mengelola jaringan komputer dalam organisasi. Tanggung jawab utama: konfigurasi router/switch, pemantauan jaringan, troubleshooting koneksi, keamanan jaringan. Keterampilan yang diperlukan: TCP/IP, Cisco certification, firewall, VPN. Prospek karir: permintaan di perusahaan telekomunikasi, IT services; potensi untuk peran senior atau network engineer; gaji kompetitif dengan sertifikasi.",
    },
    {
      id: "3",
      icon: "shield",
      title: "Cyber Security Analyst",
      description:
        "Cyber Security Analyst adalah profesional yang melindungi sistem informasi dari ancaman keamanan siber. Tanggung jawab utama: deteksi intrusi, analisis risiko, implementasi keamanan, respons insiden. Keterampilan yang diperlukan: ethical hacking, firewall, encryption, tools seperti SIEM. Prospek karir: peluang tinggi di semua industri; kemungkinan menjadi security engineer atau consultant; gaji tinggi dengan bonus.",
    },
    {
      id: "4",
      icon: "headphones",
      title: "IT Support Specialist",
      description:
        "IT Support Specialist adalah profesional yang memberikan dukungan teknis dan pemecahan masalah untuk sistem komputer dan jaringan. Tanggung jawab utama: troubleshooting hardware/software, dukungan pengguna, instalasi perangkat. Keterampilan yang diperlukan: OS Windows/Linux, networking basics, komunikasi. Prospek karir: peluang di perusahaan kecil hingga besar; potensi untuk peran senior support atau system admin; gaji stabil.",
    },
    {
      id: "5",
      icon: "cloud",
      title: "Cloud Engineer",
      description:
        "Cloud Engineer adalah profesional yang merancang, mengimplementasikan, dan mengelola infrastruktur cloud untuk organisasi. Tanggung jawab utama: migrasi ke cloud, optimasi biaya, keamanan cloud, monitoring. Keterampilan yang diperlukan: AWS/Azure/GCP, Docker, Kubernetes, scripting. Prospek karir: permintaan tinggi di era digital; potensi untuk cloud architect; gaji kompetitif dengan peluang remote.",
    },
  ],
  dkv: [
    {
      id: "1",
      icon: "palette",
      title: "Graphic Designer",
      description:
        "Graphic Designer adalah profesional yang menciptakan konten visual untuk komunikasi dan branding. Tanggung jawab utama: desain logo, poster, materi promosi, editing gambar. Keterampilan yang diperlukan: Adobe Creative Suite, typography, color theory, software desain. Prospek karir: peluang di agensi iklan, perusahaan media; kemungkinan menjadi art director atau freelancer; gaji berdasarkan portofolio.",
    },
    {
      id: "2",
      icon: "tag",
      title: "Brand Designer",
      description:
        "Brand Designer adalah profesional yang mengembangkan identitas visual merek untuk perusahaan. Tanggung jawab utama: riset merek, desain logo dan packaging, panduan merek. Keterampilan yang diperlukan: branding principles, Adobe tools, market research. Prospek karir: peluang di perusahaan konsumen, startup; potensi untuk brand manager; gaji menarik dengan bonus.",
    },
    {
      id: "3",
      icon: "megaphone",
      title: "Advertising Creative",
      description:
        "Advertising Creative adalah profesional yang menciptakan konsep kreatif untuk kampanye iklan. Tanggung jawab utama: brainstorming ide, desain materi iklan, kolaborasi tim kreatif. Keterampilan yang diperlukan: kreativitas, Adobe Suite, copywriting, presentasi. Prospek karir: di agensi iklan besar; kemungkinan menjadi creative director; gaji tinggi dengan bonus.",
    },
    {
      id: "4",
      icon: "layout",
      title: "UI/UX Designer",
      description:
        "UI/UX Designer adalah profesional yang merancang antarmuka pengguna dan pengalaman pengguna untuk aplikasi dan situs web yang intuitif dan menarik. Tanggung jawab utama: riset pengguna, wireframing, prototyping, testing usability. Keterampilan yang diperlukan: Figma, Adobe XD, user research, psychology. Prospek karir: permintaan tinggi di tech; potensi untuk product designer; gaji kompetitif.",
    },
    {
      id: "5",
      icon: "edit-3",
      title: "Digital Illustrator",
      description:
        "Digital Illustrator adalah profesional yang menciptakan ilustrasi digital untuk media cetak, web, dan animasi menggunakan perangkat lunak desain. Tanggung jawab utama: konseptualisasi, digital drawing, coloring, adaptasi untuk media. Keterampilan yang diperlukan: Adobe Illustrator, Photoshop, Wacom tablet, style development. Prospek karir: di publishing, game industry; kemungkinan menjadi concept artist; gaji berdasarkan karya.",
    },
  ],
  animasi: [
    {
      id: "1",
      icon: "box",
      title: "3D Animator",
      description:
        "3D Animator adalah profesional yang menciptakan animasi tiga dimensi untuk film, permainan, dan visual effects. Tanggung jawab utama: modeling, rigging, animating, rendering. Keterampilan yang diperlukan: Maya, Blender, 3ds Max, motion capture. Prospek karir: di industri film, game, VFX; potensi untuk lead animator; gaji tinggi.",
    },
    {
      id: "2",
      icon: "sparkles",
      title: "Visual Effects Artist",
      description:
        "Visual Effects Artist adalah profesional yang menciptakan efek visual untuk film dan media digital. Tanggung jawab utama: compositing, particle effects, motion tracking, color grading. Keterampilan yang diperlukan: Nuke, After Effects, Houdini, compositing techniques. Prospek karir: di Hollywood, studio VFX; kemungkinan menjadi VFX supervisor; gaji premium.",
    },
    {
      id: "3",
      icon: "play-circle",
      title: "Motion Graphics Designer",
      description:
        "Motion Graphics Designer adalah profesional yang menciptakan animasi grafis untuk video dan presentasi. Tanggung jawab utama: desain grafis animasi, typography animation, video editing. Keterampilan yang diperlukan: After Effects, Cinema 4D, Premiere, sound design. Prospek karir: di agensi, perusahaan media; potensi untuk broadcast designer; gaji kompetitif.",
    },
    {
      id: "4",
      icon: "user",
      title: "Character Animator",
      description:
        "Character Animator adalah profesional yang menciptakan animasi karakter untuk film, permainan, dan media interaktif dengan fokus pada gerakan dan ekspresi. Tanggung jawab utama: keyframing, lip sync, facial animation, performance capture. Keterampilan yang diperlukan: Maya, Blender, acting knowledge, anatomy. Prospek karir: di Pixar, game studios; kemungkinan menjadi animation director; gaji tinggi.",
    },
    {
      id: "5",
      icon: "gamepad-2",
      title: "Game Developer",
      description:
        "Game Developer adalah profesional yang merancang dan mengembangkan permainan video, termasuk pemrograman, desain, dan pengujian. Tanggung jawab utama: coding gameplay, level design, debugging, collaboration. Keterampilan yang diperlukan: Unity, Unreal Engine, C#, game design principles. Prospek karir: di indie studios, big companies; potensi untuk lead developer; gaji menarik dengan royalty.",
    },
  ],
  broadcasting: [
    {
      id: "1",
      icon: "clipboard",
      title: "Production Assistant",
      description:
        "Production Assistant adalah profesional yang membantu dalam produksi acara televisi dan media. Tanggung jawab utama: persiapan set, koordinasi tim, pengelolaan peralatan, dukungan logistik. Keterampilan yang diperlukan: organisasi, komunikasi, basic tech knowledge. Prospek karir: entry level di TV stations; potensi untuk producer; gaji awal dengan pengalaman.",
    },
    {
      id: "2",
      icon: "file-text",
      title: "Content Creator",
      description:
        "Content Creator adalah profesional yang menghasilkan konten untuk media digital dan sosial. Tanggung jawab utama: scripting, filming, editing, publishing content. Keterampilan yang diperlukan: video editing, social media, storytelling, Adobe Premiere. Prospek karir: di YouTube, perusahaan media; kemungkinan menjadi influencer atau content manager; gaji berdasarkan engagement.",
    },
    {
      id: "3",
      icon: "camera",
      title: "Camera Operator",
      description:
        "Camera Operator adalah profesional yang mengoperasikan kamera untuk produksi video dan live broadcast. Tanggung jawab utama: framing shots, adjusting settings, following action, lighting. Keterampilan yang diperlukan: cinematography, camera equipment, composition. Prospek karir: di film, TV, events; potensi untuk cinematographer; gaji kompetitif.",
    },
    {
      id: "4",
      icon: "scissors",
      title: "Video Editor",
      description:
        "Video Editor adalah profesional yang mengedit dan memproduksi konten video untuk siaran, iklan, dan media digital. Tanggung jawab utama: cutting footage, adding effects, sound design, color correction. Keterampilan yang diperlukan: Premiere, After Effects, DaVinci Resolve, timing. Prospek karir: di post-production houses; kemungkinan menjadi editor senior; gaji stabil.",
    },
    {
      id: "5",
      icon: "mic",
      title: "Broadcast Journalist",
      description:
        "Broadcast Journalist adalah profesional yang melaporkan berita dan acara melalui media penyiaran, termasuk penelitian, wawancara, dan penyiaran langsung. Tanggung jawab utama: researching stories, conducting interviews, on-air presentation, fact-checking. Keterampilan yang diperlukan: journalism ethics, public speaking, research, media law. Prospek karir: di TV networks, online media; potensi untuk anchor or producer; gaji menarik.",
    },
  ],
  tei: [
    {
      id: "1",
      icon: "zap",
      title: "Industrial Electrician",
      description:
        "Industrial Electrician adalah profesional yang menginstal, memelihara, dan memperbaiki sistem elektrik di lingkungan industri. Tanggung jawab utama: wiring, troubleshooting, safety compliance, preventive maintenance. Keterampilan yang diperlukan: electrical codes, tools, PLC basics, safety protocols. Prospek karir: di manufaktur, konstruksi; potensi untuk electrical supervisor; gaji stabil.",
    },
    {
      id: "2",
      icon: "gauge",
      title: "Instrumentation Technician",
      description:
        "Instrumentation Technician adalah profesional yang menginstal dan memelihara instrumen kontrol proses di industri. Tanggung jawab utama: calibration, testing, repair, documentation. Keterampilan yang diperlukan: sensors, controllers, calibration tools, process knowledge. Prospek karir: di oil&gas, chemical; kemungkinan menjadi control engineer; gaji kompetitif.",
    },
    {
      id: "3",
      icon: "sliders",
      title: "Process Control Operator",
      description:
        "Process Control Operator adalah profesional yang mengawasi dan mengontrol proses industri menggunakan sistem otomasi. Tanggung jawab utama: monitoring systems, adjusting parameters, troubleshooting, reporting. Keterampilan yang diperlukan: SCADA, PLC, process engineering, safety. Prospek karir: di pabrik, utilities; potensi untuk process engineer; gaji dengan shift allowance.",
    },
    {
      id: "4",
      icon: "cpu",
      title: "Electronics Engineer",
      description:
        "Electronics Engineer adalah profesional yang merancang dan mengembangkan sistem elektronik untuk aplikasi industri dan konsumen. Tanggung jawab utama: circuit design, prototyping, testing, documentation. Keterampilan yang diperlukan: circuit theory, CAD software, embedded systems, programming. Prospek karir: di R&D, manufacturing; kemungkinan menjadi senior engineer; gaji tinggi.",
    },
    {
      id: "5",
      icon: "wrench",
      title: "Maintenance Technician",
      description:
        "Maintenance Technician adalah profesional yang melakukan perawatan dan perbaikan peralatan elektronik dan sistem industri. Tanggung jawab utama: preventive maintenance, repairs, diagnostics, inventory. Keterampilan yang diperlukan: mechanical skills, electrical knowledge, tools, CMMS. Prospek karir: di berbagai industri; potensi untuk maintenance manager; gaji stabil.",
    },
  ],
  mekatronika: [
    {
      id: "1",
      icon: "bot",
      title: "Operator Robotik",
      description:
        "Operator Robotik adalah profesional yang mengoperasikan dan memprogram robot industri untuk otomasi produksi. Tanggung jawab utama: programming robots, maintenance, troubleshooting, safety. Keterampilan yang diperlukan: robotics programming, PLC, mechanical knowledge. Prospek karir: di manufaktur otomotif; potensi untuk robotics engineer; gaji kompetitif.",
    },
    {
      id: "2",
      icon: "code",
      title: "PLC Programmer",
      description:
        "PLC Programmer adalah profesional yang mengembangkan program untuk programmable logic controllers dalam sistem otomasi. Tanggung jawab utama: ladder logic, HMI development, testing, commissioning. Keterampilan yang diperlukan: PLC software, electrical engineering, programming. Prospek karir: di automation companies; kemungkinan menjadi automation engineer; gaji tinggi.",
    },
    {
      id: "3",
      icon: "settings",
      title: "Automation Engineer",
      description:
        "Automation Engineer adalah profesional yang merancang dan mengimplementasikan sistem otomasi untuk proses industri. Tanggung jawab utama: system design, integration, testing, optimization. Keterampilan yang diperlukan: PLC, SCADA, sensors, project management. Prospek karir: di engineering firms; potensi untuk project manager; gaji premium.",
    },
    {
      id: "4",
      icon: "cog",
      title: "Robotics Engineer",
      description:
        "Robotics Engineer adalah profesional yang merancang dan mengembangkan sistem robotik untuk otomasi dan aplikasi industri. Tanggung jawab utama: mechanical design, control systems, prototyping, testing. Keterampilan yang diperlukan: mechanics, electronics, programming, AI basics. Prospek karir: di research, manufacturing; kemungkinan menjadi R&D lead; gaji tinggi.",
    },
    {
      id: "5",
      icon: "sliders",
      title: "Control Systems Engineer",
      description:
        "Control Systems Engineer adalah profesional yang merancang dan mengimplementasikan sistem kontrol untuk mesin dan proses otomatis. Tanggung jawab utama: PID control, system modeling, simulation, commissioning. Keterampilan yang diperlukan: control theory, MATLAB, PLC, instrumentation. Prospek karir: di process industries; potensi untuk senior engineer; gaji kompetitif.",
    },
  ],
  tav: [
    {
      id: "1",
      icon: "headphones",
      title: "Audio Engineer",
      description:
        "Audio Engineer adalah profesional yang merekam, mencampur, dan memproduksi audio untuk musik, film, dan media. Tanggung jawab utama: recording, mixing, mastering, equipment maintenance. Keterampilan yang diperlukan: DAW software, acoustics, microphones, signal processing. Prospek karir: di studio rekaman; kemungkinan menjadi producer; gaji berdasarkan proyek.",
    },
    {
      id: "2",
      icon: "speaker",
      title: "Sound System Technician",
      description:
        "Sound System Technician adalah profesional yang menginstal dan mengoperasikan sistem suara untuk acara live dan instalasi. Tanggung jawab utama: setup equipment, mixing live, troubleshooting, maintenance. Keterampilan yang diperlukan: audio equipment, wiring, acoustics, live sound. Prospek karir: di event companies; potensi untuk sound designer; gaji dengan per event.",
    },
    {
      id: "3",
      icon: "wrench",
      title: "Electronics Repair Specialist",
      description:
        "Electronics Repair Specialist adalah profesional yang mendiagnosis dan memperbaiki peralatan elektronik konsumen dan industri. Tanggung jawab utama: diagnostics, component replacement, testing, soldering. Keterampilan yang diperlukan: electronics theory, tools, schematics, safety. Prospek karir: di service centers; kemungkinan menjadi technician lead; gaji stabil.",
    },
    {
      id: "4",
      icon: "video",
      title: "Video Production Specialist",
      description:
        "Video Production Specialist adalah profesional yang mengelola produksi video dari pra-produksi hingga pasca-produksi untuk berbagai media. Tanggung jawab utama: planning, shooting, editing, post-production. Keterampilan yang diperlukan: camera work, editing software, lighting, directing. Prospek karir: di production houses; potensi untuk director; gaji kompetitif.",
    },
    {
      id: "5",
      icon: "lightbulb",
      title: "Lighting Technician",
      description:
        "Lighting Technician adalah profesional yang merancang dan mengoperasikan pencahayaan untuk produksi video, teater, dan acara live. Tanggung jawab utama: lighting design, setup, operation, maintenance. Keterampilan yang diperlukan: lighting equipment, electricity, color theory, software. Prospek karir: di entertainment industry; kemungkinan menjadi lighting designer; gaji dengan bonus event.",
    },
  ],
};

export default defineEventHandler(async (_event) => {
  return JobTitles;
});
