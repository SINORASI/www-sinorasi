import type { Activity } from '~/models/Activity';

export default defineEventHandler(async (event): Promise<{ data: Activity[], total: number }> => {
  // TODO: Replace with actual API call
  // const response = await $fetch('https://your-api.com/api/activities');
  
  const query = getQuery(event);
  const limit = parseInt(query.limit as string) || 10;
  const offset = parseInt(query.offset as string) || 0;
  const extracurricular = query.extracurricular as string;

  // Mock data
  const allActivities: Activity[] = [
    {
      id: '1',
      image: '/images/placeholder.jpg',
      title: 'Kejuaraan Antar Sekolah Se-Surabaya',
      description: 'Tim basket putra berhasil meraih juara 2 dalam kompetisi bergengsi yang diikuti 32 sekolah menengah atas di Surabaya dengan persaingan yang sangat ketat',
      date: '2024-03-15',
      extracurricular: 'basket'
    },
    {
      id: '2',
      image: '/images/placeholder.jpg',
      title: 'Pelatihan Intensif Teknik Dasar',
      description: 'Mengadakan pelatihan khusus bersama pelatih profesional untuk meningkatkan kemampuan dribbling, shooting, dan passing seluruh anggota ekstrakurikuler',
      date: '2024-04-20',
      extracurricular: 'basket'
    },
    {
      id: '3',
      image: '/images/placeholder.jpg',
      title: 'Turnamen Internal Antar Kelas',
      description: 'Event tahunan yang melibatkan seluruh siswa sekolah dalam kompetisi basket antar kelas untuk mempererat tali persaudaraan dan sportivitas',
      date: '2024-05-10',
      extracurricular: 'basket'
    },
    {
      id: '4',
      image: '/images/placeholder.jpg',
      title: 'Workshop Strategi Permainan',
      description: 'Sesi pembelajaran mendalam tentang taktik dan strategi permainan basket modern yang dipimpin langsung oleh mantan pemain profesional',
      date: '2024-06-05',
      extracurricular: 'basket'
    }
  ];

  let filteredActivities = allActivities;
  
  if (extracurricular) {
    filteredActivities = allActivities.filter(a => a.extracurricular === extracurricular);
  }

  const paginatedData = filteredActivities.slice(offset, offset + limit);

  return {
    data: paginatedData,
    total: filteredActivities.length
  };
});
