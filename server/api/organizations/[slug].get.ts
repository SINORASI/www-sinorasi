import type { Organization } from '~/models/Organization';

export default defineEventHandler(async (event): Promise<Organization | null> => {
  const slug = getRouterParam(event, 'slug');
  
  // TODO: Replace with actual API call
  // const organization = await $fetch(`https://your-api.com/api/organizations/${slug}`);
  
  // Mock data - Full organization details
  const organizations: Record<string, Organization> = {
    'paskibra': {
      id: '1',
      slug: 'paskibra',
      name: 'PASKIBRA',
      logo: '/images/logo.webp',
      description: 'Pasukan Pengibar Bendera Pusaka adalah organisasi yang melatih kedisiplinan, kepemimpinan, dan kecintaan pada tanah air melalui latihan baris berbaris dan upacara.',
      history: 'Caranya gampang banget, kamu cuman perlu ngumpulin temen temen yang minat ekstrakurikulernya sama sepertimu, untuk membuat komunitas ekstrakurikuler baru baru, minimal kamu membutuhkan 10 orang atau lebih. setelah itu kalian dapat menghubungi pihak OSIS SMK Negeri 2 Singosari untuk menyampaikan bahwa kalian ingin membuat komunitas ekstrakurikuler baru, dan nantinya dari pihak OSIS akan menyampaikan aspirasi kalian kepada WAKA KESISWAAN atau yang bersangkutan. Nanti, dari pihak sekolah akan membuat keputusan "apakah komunitas ekstrakurikuler baru yang kamu buat itu sudah memenuhi standart atau tidak".',
      established: '2009',
      statistics: {
        members: 50,
        programs: 50,
        years: 15,
        meetings: 3
      },
      contactInfo: {
        instagram: [
          { label: 'Miftahul', handle: '@v_seto_v7' },
          { label: 'SMKn 2 SGS', handle: '@smkn2_singosari' },
          { label: 'OSIS', handle: '@osis.stemdasil' }
        ],
        whatsapp: [
          { label: 'Miftahul', number: '083839717167' },
          { label: 'Fauzia', number: '081234567890' },
          { label: 'Admin', number: '089876543210' }
        ],
        socialMedia: [
          { platform: 'facebook', handle: 'SmkndusSingosari' },
          { platform: 'tiktok', handle: 'smkn2_singosari' },
          { platform: 'instagram', handle: 'smkn2_singosari' },
          { platform: 'youtube', handle: 'SMK NEGERI 2 SINGOSARI Official' }
        ]
      },
      leadership: {
        sekretaris: [
          { id: 's1', name: 'Sekretaris 1', image: '/images/profile-placeholder.png', position: 'Sekretaris' }
        ],
        ketua: [
          { id: 'k1', name: 'Ketua PASKIBRA', image: '/images/profile-placeholder.png', position: 'Ketua' }
        ],
        wakil: [
          { id: 'w1', name: 'Wakil Ketua', image: '/images/profile-placeholder.png', position: 'Wakil Ketua' }
        ],
        bendahara: [
          { id: 'b1', name: 'Bendahara 1', image: '/images/profile-placeholder.png', position: 'Bendahara' }
        ]
      },
      sections: Array.from({ length: 10 }, (_, i) => ({
        id: `seksi-${i + 1}`,
        name: `SEKSI BIDANG ${i + 1}`,
        image: '/images/profile-placeholder.png',
        visi: 'claret dipajakan tentang area dui gyaru bidang terhadiat, sambattakan "tyaru berbeda indirektical di anak negeri Di Gunopun berubaha mengabartakan insalam mengpositin neperoleh yang 90 guhi area',
        misi: 'claret dipajakan tentang area dui gyaru bidang terhadiat, sambattakan "tyaru berbeda indirektical di anak negeri Di Gunopun berubaha mengabartakan insalam mengpositin neperoleh yang 90 guhi area',
        tasks: 'claret dipajakan tentang area dui gyaru bidang terhadiat, sambattakan "tyaru berbeda indirektical di anak negeri Di Gunopun berubaha mengabartakan insalam mengpositin neperoleh yang 90 guhi area',
        programs: [
          'claret dipajakan tentang asal dui guatu bidang terhadiat',
          'claret dipajakan tentang asal dui gyaru bidang terhadiat sambattakan "tyaru berbeda indirektical',
          'claret dipajakan tentang asal dui guatu bidang terhadiat',
          'claret dipajakan tentang asal dui gyaru bidang terhadiat sambattakan "tyaru berbeda',
          'claret dipajakan tentang asal dui guatu bidang terhadiat'
        ],
        members: [
          { id: 'm1', name: 'Sumiijah S.Pd M.Pd', image: '/images/profile-placeholder.png', position: 'Ketua Seksi' },
          { id: 'm2', name: 'Member 2', image: '/images/profile-placeholder.png', position: 'Anggota' },
          { id: 'm3', name: 'Member 3', image: '/images/profile-placeholder.png', position: 'Anggota' },
          { id: 'm4', name: 'Member 4', image: '/images/profile-placeholder.png', position: 'Anggota' },
          { id: 'm5', name: 'Member 5', image: '/images/profile-placeholder.png', position: 'Anggota' }
        ]
      })),
      activities: [
        {
          id: 'a1',
          image: '/images/placeholder.jpg',
          title: 'Judul Aktivitas',
          description: 'cadet dpenengs dimasa aktivitas terhadiat walker aktivitasunt tentang aktivitas terhadiat walker dipetiengu tentang aktivitas terhadiat walker...',
          date: '2045-03-10'
        },
        {
          id: 'a2',
          image: '/images/placeholder.jpg',
          title: 'Judul Aktivitas',
          description: 'cadet dpenengs dimasa aktivitas terhadiat walker aktivitasunt tentang aktivitas terhadiat walker dipetiengu tentang aktivitas terhadiat walker...',
          date: '2045-03-10'
        },
        {
          id: 'a3',
          image: '/images/placeholder.jpg',
          title: 'Judul Aktivitas',
          description: 'cadet dpenengs dimasa aktivitas terhadiat walker aktivitasunt tentang aktivitas terhadiat walker dipetiengu tentang aktivitas terhadiat walker...',
          date: '2045-03-10'
        },
        {
          id: 'a4',
          image: '/images/placeholder.jpg',
          title: 'Judul Aktivitas',
          description: 'cadet dpenengs dimasa aktivitas terhadiat walker aktivitasunt tentang aktivitas terhadiat walker dipetiengu tentang aktivitas terhadiat walker...',
          date: '2045-03-10'
        }
      ],
      recruitmentPoster: '/images/placeholder.jpg',
      recruitmentPeriod: '1-31 Juli 2024'
    }
  };

  const organization = organizations[slug || ''];
  
  if (!organization) {
    throw createError({
      statusCode: 404,
      message: 'Organization not found'
    });
  }

  return organization;
});
