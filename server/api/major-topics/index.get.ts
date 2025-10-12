import type { MajorName } from '~/models/MajorName';
import type { MajorTopic } from '~/models/MajorTopic';

const majorTopics: Record<MajorName, MajorTopic[]> = {
  rpl: [
    {
      id: "rpl-1",
      title: "Pemrograman Visual Berbasis Desktop",
      description: "Pelajari cara membuat aplikasi desktop menggunakan alat pemrograman visual seperti Visual Basic atau C# dengan Windows Forms. Fokus pada desain antarmuka pengguna dan pemrograman berbasis event untuk mengembangkan aplikasi praktis yang mudah digunakan."
    },
    {
      id: "rpl-2",
      title: "Pemrograman Web",
      description: "Kembangkan keterampilan dalam HTML, CSS, JavaScript, dan framework seperti React atau Vue.js untuk membangun situs web interaktif dan aplikasi web yang responsif dan modern."
    },
    {
      id: "rpl-3",
      title: "Database Management",
      description: "Kuasi bahasa SQL dan sistem database seperti MySQL atau PostgreSQL, termasuk pemodelan data, query, dan administrasi untuk mengelola data secara efisien dalam aplikasi."
    },
    {
      id: "rpl-4",
      title: "Mobile Application Development",
      description: "Buat aplikasi mobile untuk Android dan iOS menggunakan bahasa seperti Java, Kotlin, Swift, atau alat lintas platform seperti Flutter untuk memenuhi kebutuhan pengguna modern."
    },
    {
      id: "rpl-5",
      title: "Object Oriented Programming",
      description: "Pahami prinsip-prinsip OOP dalam bahasa seperti Java atau C++, termasuk kelas, pewarisan, polimorfisme, dan enkapsulasi untuk membangun kode yang terstruktur dan dapat dipelihara."
    },
    {
      id: "rpl-6",
      title: "Software Testing & Quality Assurance",
      description: "Pelajari metodologi pengujian, unit testing, integration testing, dan alat seperti JUnit atau Selenium untuk memastikan kualitas perangkat lunak yang handal dan bebas bug."
    },
    {
      id: "rpl-7",
      title: "Version Control & Git",
      description: "Gunakan Git untuk manajemen kode sumber, kolaborasi tim, branching, dan merging dalam pengembangan perangkat lunak profesional."
    },
    {
      id: "rpl-8",
      title: "UI/UX Design Fundamentals",
      description: "Rancang antarmuka pengguna dan pengalaman yang intuitif, dengan fokus pada kegunaan, aksesibilitas, dan alat seperti Figma atau Adobe XD untuk aplikasi yang user-friendly."
    }
  ],
  tkj: [
    {
      id: "tkj-1",
      title: "Jaringan Komputer Dasar",
      description: "Pelajari dasar-dasar jaringan komputer, termasuk model OSI, TCP/IP, perangkat jaringan, dan konfigurasi dasar untuk membangun infrastruktur jaringan yang handal."
    },
    {
      id: "tkj-2",
      title: "Routing & Switching",
      description: "Konfigurasi router dan switch, pelajari protokol routing seperti OSPF, BGP, dan VLAN untuk mengelola lalu lintas data dalam jaringan kompleks."
    },
    {
      id: "tkj-3",
      title: "Network Security",
      description: "Implementasikan firewall, VPN, enkripsi, dan praktik keamanan terbaik untuk melindungi jaringan dari ancaman cyber dan memastikan data aman."
    },
    {
      id: "tkj-4",
      title: "Server Administration",
      description: "Kelola server, termasuk instalasi, konfigurasi, virtualisasi, dan layanan cloud untuk mendukung operasi jaringan dan aplikasi perusahaan."
    },
    {
      id: "tkj-5",
      title: "Wireless Network",
      description: "Rancang dan terapkan jaringan Wi-Fi, pahami standar nirkabel, dan lakukan troubleshooting konektivitas untuk solusi jaringan modern."
    },
    {
      id: "tkj-6",
      title: "Cloud Computing",
      description: "Bekerja dengan platform cloud seperti AWS, Azure, atau Google Cloud untuk komputasi dan penyimpanan yang skalabel dan efisien."
    },
    {
      id: "tkj-7",
      title: "Network Troubleshooting",
      description: "Diagnosa dan perbaiki masalah jaringan menggunakan alat seperti Wireshark dan ping/traceroute untuk menjaga kinerja jaringan optimal."
    },
    {
      id: "tkj-8",
      title: "Fiber Optic & Cabling",
      description: "Pasang dan rawat sistem kabel fiber optik dan tembaga untuk transmisi data berkecepatan tinggi dan infrastruktur jaringan yang andal."
    }
  ],
  dkv: [
    {
      id: "dkv-1",
      title: "Desain Grafis",
      description: "Buat konten visual menggunakan Adobe Creative Suite, dengan fokus pada logo, poster, dan branding untuk komunikasi yang efektif dan menarik."
    },
    {
      id: "dkv-2",
      title: "Typography & Layout Design",
      description: "Kuasi pemilihan font, hierarki, dan prinsip layout untuk desain komunikasi yang jelas dan profesional dalam berbagai media."
    },
    {
      id: "dkv-3",
      title: "Digital Illustration",
      description: "Hasilkan karya seni digital menggunakan alat seperti Adobe Illustrator dan Photoshop untuk berbagai media dan keperluan kreatif."
    },
    {
      id: "dkv-4",
      title: "Branding & Identity Design",
      description: "Kembangkan identitas merek, termasuk logo, skema warna, dan pedoman merek untuk membangun citra yang konsisten dan kuat."
    },
    {
      id: "dkv-5",
      title: "Photography & Image Editing",
      description: "Tangkap dan edit foto, pahami komposisi, pencahayaan, dan pasca-pemrosesan untuk konten visual yang berkualitas tinggi."
    },
    {
      id: "dkv-6",
      title: "Video Production & Editing",
      description: "Buat dan edit video, termasuk penulisan skrip, pengambilan gambar, dan penggunaan software seperti Adobe Premiere untuk konten multimedia."
    },
    {
      id: "dkv-7",
      title: "Motion Graphics",
      description: "Rancang grafis animasi untuk video, situs web, dan presentasi menggunakan After Effects untuk elemen visual yang dinamis."
    },
    {
      id: "dkv-8",
      title: "Web & Mobile UI Design",
      description: "Rancang antarmuka untuk situs web dan aplikasi mobile, dengan fokus pada desain responsif dan pengalaman pengguna yang optimal."
    }
  ],
  animasi: [
    {
      id: "animasi-1",
      title: "2D Animation",
      description: "Buat animasi 2D menggunakan teknik tradisional dan digital, termasuk frame-by-frame dan tweening untuk cerita yang hidup dan menarik."
    },
    {
      id: "animasi-2",
      title: "3D Modeling & Animation",
      description: "Bangun model 3D dan animasikan menggunakan software seperti Blender atau Maya untuk proyek animasi yang realistis dan kompleks."
    },
    {
      id: "animasi-3",
      title: "Character Design",
      description: "Kembangkan karakter untuk animasi, termasuk konsep art, pemodelan, dan rigging untuk karakter yang ekspresif dan konsisten."
    },
    {
      id: "animasi-4",
      title: "Storyboarding",
      description: "Rencanakan animasi melalui storyboard, visualisasikan adegan dan urutan untuk memandu produksi animasi yang terstruktur."
    },
    {
      id: "animasi-5",
      title: "Visual Effects (VFX)",
      description: "Tambahkan efek khusus ke footage menggunakan kompositing dan sistem partikel untuk animasi yang spektakuler dan realistis."
    },
    {
      id: "animasi-6",
      title: "Stop Motion Animation",
      description: "Buat animasi dengan memotret objek dalam peningkatan kecil dan memutarnya kembali untuk teknik animasi yang unik dan kreatif."
    },
    {
      id: "animasi-7",
      title: "Rigging & Character Animation",
      description: "Siapkan rig karakter dan animasikan gerakan secara realistis untuk karakter yang hidup dan ekspresif dalam animasi."
    },
    {
      id: "animasi-8",
      title: "Compositing & Post-Production",
      description: "Gabungkan elemen dan finalkan animasi dengan koreksi warna dan efek untuk hasil akhir yang profesional dan siap tayang."
    }
  ],
  broadcasting: [
    {
      id: "broadcasting-1",
      title: "Camera Operation",
      description: "Pelajari cara mengoperasikan kamera profesional, termasuk framing, fokus, dan pencahayaan untuk produksi video berkualitas tinggi."
    },
    {
      id: "broadcasting-2",
      title: "Video Production",
      description: "Rencanakan dan produksi konten video, dari pra-produksi hingga pasca-produksi untuk program televisi dan digital."
    },
    {
      id: "broadcasting-3",
      title: "Broadcasting Journalism",
      description: "Laporkan berita, lakukan wawancara, dan buat konten siap siar untuk jurnalisme penyiaran yang akurat dan menarik."
    },
    {
      id: "broadcasting-4",
      title: "Audio Production",
      description: "Rekam, edit, dan mix audio untuk penyiaran menggunakan peralatan profesional dan teknik produksi suara."
    },
    {
      id: "broadcasting-5",
      title: "Scriptwriting & Directing",
      description: "Tulis skrip dan sutradarai produksi untuk televisi dan media digital, dari konsep hingga eksekusi."
    },
    {
      id: "broadcasting-6",
      title: "Live Broadcasting Techniques",
      description: "Kelola penyiaran langsung, termasuk switching dan editing real-time untuk acara yang dinamis dan interaktif."
    },
    {
      id: "broadcasting-7",
      title: "Program Production",
      description: "Kembangkan dan produksi program lengkap, dari konsep hingga siaran untuk konten yang menghibur dan informatif."
    },
    {
      id: "broadcasting-8",
      title: "Digital Media Content Creation",
      description: "Buat konten untuk platform online, termasuk media sosial dan streaming untuk audiens digital yang luas."
    }
  ],
  tei: [
    {
      id: "tei-1",
      title: "Elektronika Dasar",
      description: "Pelajari dasar-dasar elektronika, rangkaian, komponen, dan pengukuran dasar untuk memahami sistem elektronik industri."
    },
    {
      id: "tei-2",
      title: "Programmable Logic Controller (PLC)",
      description: "Program dan konfigurasikan PLC untuk otomasi industri, mengontrol proses manufaktur dan sistem otomatis."
    },
    {
      id: "tei-3",
      title: "Sistem Kontrol Industri",
      description: "Rancang sistem kontrol untuk proses industri dan mesin, memastikan operasi yang efisien dan aman."
    },
    {
      id: "tei-4",
      title: "Microcontroller & Embedded System",
      description: "Kembangkan sistem embedded menggunakan microcontroller seperti Arduino atau Raspberry Pi untuk aplikasi industri."
    },
    {
      id: "tei-5",
      title: "Sensor & Aktuator",
      description: "Bekerja dengan sensor dan aktuator untuk pemantauan dan kontrol aplikasi, mengintegrasikan input dan output dalam sistem."
    },
    {
      id: "tei-6",
      title: "Pneumatik & Hidrolik",
      description: "Rancang sistem pneumatik dan hidrolik untuk penggunaan industri, memahami prinsip dan aplikasi praktis."
    },
    {
      id: "tei-7",
      title: "Industrial Automation",
      description: "Integrasikan sistem otomatis untuk manufaktur dan kontrol proses, meningkatkan efisiensi dan produktivitas industri."
    },
    {
      id: "tei-8",
      title: "SCADA System",
      description: "Implementasikan sistem Supervisory Control and Data Acquisition untuk memantau dan mengontrol proses industri secara real-time."
    }
  ],
  mekatronika: [
    {
      id: "mekatronika-1",
      title: "Robotika",
      description: "Rancang dan program robot untuk berbagai aplikasi, menggabungkan mekanik, elektronika, dan kontrol untuk solusi otomatis."
    },
    {
      id: "mekatronika-2",
      title: "Sistem Mekanik",
      description: "Pahami sistem mekanik, roda gigi, motor, dan mekanisme untuk desain dan implementasi komponen mekatronik."
    },
    {
      id: "mekatronika-3",
      title: "Elektronika & Mikroprosesor",
      description: "Integrasikan elektronika dan mikroprosesor dalam sistem mekatronik untuk kontrol dan pemrosesan data yang cerdas."
    },
    {
      id: "mekatronika-4",
      title: "Sistem Kontrol Otomatis",
      description: "Kembangkan sistem kontrol otomatis menggunakan loop umpan balik untuk operasi yang presisi dan efisien."
    },
    {
      id: "mekatronika-5",
      title: "CAD/CAM Design",
      description: "Gunakan desain berbantuan komputer untuk komponen mekanik dan manufaktur, mempersiapkan prototipe dan produksi."
    },
    {
      id: "mekatronika-6",
      title: "IoT & Smart Systems",
      description: "Hubungkan perangkat dan sistem menggunakan Internet of Things untuk aplikasi cerdas dan terhubung."
    },
    {
      id: "mekatronika-7",
      title: "Artificial Intelligence & Machine Learning",
      description: "Terapkan AI dan ML dalam aplikasi mekatronik untuk pengambilan keputusan cerdas dan adaptif."
    },
    {
      id: "mekatronika-8",
      title: "Industrial Robotics",
      description: "Bekerja dengan robot industri untuk otomasi dan manufaktur, memprogram dan memelihara sistem robotik canggih."
    }
  ],
  tav: [
    {
      id: "tav-1",
      title: "Audio System Design",
      description: "Rancang sistem suara untuk venue, termasuk speaker dan amplifier untuk pengalaman audio yang optimal."
    },
    {
      id: "tav-2",
      title: "Video Engineering",
      description: "Rawat dan troubleshoot peralatan video dan sistem untuk memastikan kinerja yang handal dalam produksi."
    },
    {
      id: "tav-3",
      title: "Broadcasting Technology",
      description: "Bekerja dengan peralatan penyiaran dan standar untuk transmisi konten audio-visual yang profesional."
    },
    {
      id: "tav-4",
      title: "Sound Recording & Mixing",
      description: "Rekam dan mix audio secara profesional untuk produksi musik, film, dan acara langsung."
    },
    {
      id: "tav-5",
      title: "Live Sound Reinforcement",
      description: "Siapkan sistem suara untuk acara langsung, memastikan kualitas audio yang jernih dan kuat."
    },
    {
      id: "tav-6",
      title: "Home Theater Installation",
      description: "Pasang dan konfigurasikan sistem hiburan rumah untuk pengalaman multimedia yang imersif."
    },
    {
      id: "tav-7",
      title: "Digital Audio Workstation (DAW)",
      description: "Gunakan software untuk produksi dan editing audio, menciptakan konten musik dan suara profesional."
    },
    {
      id: "tav-8",
      title: "Video Streaming & Distribution",
      description: "Stream dan distribusikan konten video secara online untuk platform digital dan audiens global."
    }
  ]
};

export default defineEventHandler(async (event) => {
  return majorTopics;
});
