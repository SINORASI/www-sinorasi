<script setup lang="ts">
import type { News } from "~/models/News";
import { type NewsForm, newsSchema } from "~/utils/schema";

const newsList = ref<News[]>([
  {
    id: "1",
    slug: "prestasi-siswa-juara-nasional",
    title: "Prestasi Siswa SMKN 2 Singosari Juara Nasional",
    subtitle: "Siswa kelas XII RPL berhasil meraih juara 1 dalam kompetisi nasional",
    thumbnail: "/images/placeholder.jpg",
    tags: ["prestasi", "kompetisi", "juara"],
    content: "Konten berita lengkap...",
    publishedAt: "2024-01-15T10:00:00Z",
    author: "Admin",
  },
  {
    id: "2",
    slug: "kegiatan-pramuka-2024",
    title: "Kegiatan Pramuka Tahun 2024",
    subtitle: "Berbagai kegiatan pramuka yang akan dilaksanakan tahun ini",
    thumbnail: "/images/placeholder.jpg",
    tags: ["pramuka", "kegiatan", "ekstrakurikuler"],
    content: "Konten berita lengkap...",
    publishedAt: "2024-01-10T08:00:00Z",
    author: "Admin",
  },
]);

const searchQuery = ref("");
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const editingNews = ref<News | null>(null);
const deletingNews = ref<News | null>(null);
const isSubmitting = ref(false);

const formData = ref<NewsForm>({
  title: "",
  subtitle: "",
  content: "",
  tags: "",
  publishedAt: new Date().toISOString().slice(0, 10),
});

const errors = ref<Record<string, string[]>>({});

const validateField = (field: keyof NewsForm) => {
  const result = newsSchema.safeParse(formData.value);
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    errors.value[field] = fieldErrors[field] || [];
  } else {
    errors.value[field] = [];
  }
};

const clearFieldError = (field: keyof NewsForm) => {
  if (errors.value[field]) {
    errors.value[field] = [];
  }
};

useHead({
  title: "Admin - Kelola Berita - SMKN 2 Singosari",
  meta: [
    {
      name: "description",
      content: "Panel admin untuk mengelola berita SMK Negeri 2 Singosari.",
    },
  ],
});

const filteredNews = computed(() => {
  if (!searchQuery.value.trim()) return newsList.value;
  const query = searchQuery.value.toLowerCase();
  return newsList.value.filter(
    (news) =>
      news.title.toLowerCase().includes(query) ||
      news.subtitle.toLowerCase().includes(query) ||
      news.tags.some((tag) => tag.toLowerCase().includes(query))
  );
});

const openCreateModal = () => {
  formData.value = {
    title: "",
    subtitle: "",
    content: "",
    tags: "",
    publishedAt: new Date().toISOString().slice(0, 10),
  };
  errors.value = {};
  showCreateModal.value = true;
};

const openEditModal = (news: News) => {
  editingNews.value = news;
  formData.value = {
    title: news.title,
    subtitle: news.subtitle,
    content: news.content,
    tags: news.tags.join(", "),
    publishedAt: new Date(news.publishedAt).toISOString().slice(0, 10),
  };
  errors.value = {};
  showEditModal.value = true;
};

const openDeleteModal = (news: News) => {
  deletingNews.value = news;
  showDeleteModal.value = true;
};

const submitNews = async () => {
  const result = newsSchema.safeParse(formData.value);

  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors;
    return;
  }

  errors.value = {};
  isSubmitting.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (editingNews.value) {
      const index = newsList.value.findIndex((n) => n.id === editingNews.value?.id);
      if (index !== -1) {
        const tags = formData.value.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);
        // mutate the existing object to preserve required fields (id, slug, thumbnail)
        Object.assign(newsList.value[index]!, {
          title: formData.value.title,
          subtitle: formData.value.subtitle,
          content: formData.value.content,
          tags,
          publishedAt: new Date(formData.value.publishedAt).toISOString(),
        });
      }
      showEditModal.value = false;
      editingNews.value = null;
    } else {
      const newNews: News = {
        id: Date.now().toString(),
        slug: formData.value.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        title: formData.value.title,
        subtitle: formData.value.subtitle,
        thumbnail: "/images/placeholder.jpg",
        tags: formData.value.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        content: formData.value.content,
        publishedAt: new Date(formData.value.publishedAt).toISOString(),
        author: "Admin",
      };
      newsList.value.unshift(newNews);
      showCreateModal.value = false;
    }

    formData.value = {
      title: "",
      subtitle: "",
      content: "",
      tags: "",
      publishedAt: new Date().toISOString().slice(0, 10),
    };
  } catch (error) {
    alert("Terjadi kesalahan saat menyimpan berita");
  } finally {
    isSubmitting.value = false;
  }
};

const deleteNews = async () => {
  if (!deletingNews.value) return;

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = newsList.value.findIndex((n) => n.id === deletingNews.value?.id);
    if (index !== -1) {
      newsList.value.splice(index, 1);
    }

    showDeleteModal.value = false;
    deletingNews.value = null;
  } catch (error) {
    alert("Terjadi kesalahan saat menghapus berita");
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<template>
  <div class="min-h-screen py-24 bg-gradient-to-b from-white via-red-50 to-white">
    <div class="container px-4 mx-auto sm:px-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 md:text-4xl">Kelola Berita</h1>
            <p class="mt-2 text-gray-600">Panel admin untuk mengelola berita sekolah</p>
          </div>
          <button
            @click="openCreateModal"
            class="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-red-600 rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg"
          >
            <Icon name="lucide:plus" size="20" />
            Tambah Berita Baru
          </button>
        </div>

        <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
          <div class="md:col-span-3">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari berita berdasarkan judul, subjudul, atau tag..."
                class="w-full px-4 py-3 pr-12 text-lg transition border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <Icon
                name="lucide:search"
                size="24"
                class="absolute text-gray-400 transform -translate-y-1/2 right-4 top-1/2"
              />
            </div>
          </div>
          <div class="flex items-center justify-center p-4 bg-white border-2 border-red-100 shadow-xl rounded-xl">
            <div class="text-center">
              <p class="text-2xl font-bold text-red-600">{{ newsList.length }}</p>
              <p class="text-sm text-gray-600">Total Berita</p>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div
            v-for="news in filteredNews"
            :key="news.id"
            class="p-6 bg-white border-2 border-gray-100 shadow-xl rounded-xl hover:shadow-2xl transition-shadow"
          >
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div class="flex-1">
                <div class="flex items-start gap-4">
                  <NuxtImg
                    :src="news.thumbnail"
                    :alt="news.title"
                    class="object-cover w-16 h-16 rounded-lg flex-shrink-0"
                  />
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-gray-800 line-clamp-1">{{ news.title }}</h3>
                    <p class="text-gray-600 line-clamp-2">{{ news.subtitle }}</p>
                    <div class="flex flex-wrap items-center gap-2 mt-2">
                      <span class="text-xs text-gray-500">
                        {{ formatDate(news.publishedAt) }}
                      </span>
                      <div class="flex flex-wrap gap-1">
                        <span
                          v-for="tag in news.tags.slice(0, 3)"
                          :key="tag"
                          class="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
                        >
                          {{ tag }}
                        </span>
                        <span v-if="news.tags.length > 3" class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          +{{ news.tags.length - 3 }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex gap-2 md:flex-col">
                <button
                  @click="openEditModal(news)"
                  class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors bg-blue-100 rounded-lg hover:bg-blue-200"
                >
                  <Icon name="lucide:edit" size="16" />
                  Edit
                </button>
                <button
                  @click="openDeleteModal(news)"
                  class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 transition-colors bg-red-100 rounded-lg hover:bg-red-200"
                >
                  <Icon name="lucide:trash" size="16" />
                  Hapus
                </button>
              </div>
            </div>
          </div>

          <div
            v-if="filteredNews.length === 0"
            class="p-12 text-center bg-white border-2 border-gray-100 shadow-xl rounded-xl"
          >
            <Icon name="lucide:file-x" size="48" class="mx-auto mb-4 text-gray-400" />
            <h3 class="text-lg font-semibold text-gray-600 mb-2">Tidak ada berita ditemukan</h3>
            <p class="text-gray-500">Coba ubah kata kunci pencarian atau tambah berita baru</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="showCreateModal || showEditModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="
          showCreateModal = false;
          showEditModal = false;
        "
      >
        <div
          class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-red-100"
          @click.stop
        >
          <div class="p-8">
            <div class="flex items-center justify-between mb-6">
              <div class="px-6 py-3 border border-red-200 bg-gradient-to-r from-red-600 to-red-800 rounded-xl">
                <h3 class="text-lg font-bold text-white">
                  {{ editingNews ? "Edit Berita" : "Tambah Berita Baru" }}
                </h3>
              </div>
              <button
                @click="
                  showCreateModal = false;
                  showEditModal = false;
                "
                class="p-2 text-gray-500 transition-colors bg-gray-100 rounded-full hover:text-gray-700 hover:bg-gray-200"
              >
                <Icon name="lucide:x" size="24" />
              </button>
            </div>

            <form @submit.prevent="submitNews" class="space-y-6">
              <div>
                <label for="title" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                  <Icon name="lucide:type" size="18" class="mr-2 text-red-600" />
                  Judul Berita <span class="ml-1 text-red-500">*</span>
                </label>
                <input
                  id="title"
                  v-model="formData.title"
                  type="text"
                  :class="[
                    'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500',
                    errors.title ? 'border-red-500' : 'border-gray-200',
                  ]"
                  placeholder="Masukkan judul berita"
                  required
                  @input="clearFieldError('title')"
                  @blur="validateField('title')"
                />
                <p v-if="errors.title" class="mt-1 text-sm text-red-600">
                  {{ errors.title[0] }}
                </p>
              </div>

              <div>
                <label for="subtitle" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                  <Icon name="lucide:align-left" size="18" class="mr-2 text-red-600" />
                  Subjudul <span class="ml-1 text-red-500">*</span>
                </label>
                <input
                  id="subtitle"
                  v-model="formData.subtitle"
                  type="text"
                  :class="[
                    'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500',
                    errors.subtitle ? 'border-red-500' : 'border-gray-200',
                  ]"
                  placeholder="Masukkan subjudul berita"
                  required
                  @input="clearFieldError('subtitle')"
                  @blur="validateField('subtitle')"
                />
                <p v-if="errors.subtitle" class="mt-1 text-sm text-red-600">
                  {{ errors.subtitle[0] }}
                </p>
              </div>

              <div>
                <label for="content" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                  <Icon name="lucide:file-text" size="18" class="mr-2 text-red-600" />
                  Konten Berita <span class="ml-1 text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  v-model="formData.content"
                  rows="8"
                  :class="[
                    'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-vertical',
                    errors.content ? 'border-red-500' : 'border-gray-200',
                  ]"
                  placeholder="Masukkan konten berita (Markdown supported)"
                  required
                  @input="clearFieldError('content')"
                  @blur="validateField('content')"
                ></textarea>
                <p v-if="errors.content" class="mt-1 text-sm text-red-600">
                  {{ errors.content[0] }}
                </p>
              </div>

              <div>
                <label for="tags" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                  <Icon name="lucide:tag" size="18" class="mr-2 text-red-600" />
                  Tag <span class="ml-1 text-red-500">*</span>
                </label>
                <input
                  id="tags"
                  v-model="formData.tags"
                  type="text"
                  :class="[
                    'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500',
                    errors.tags ? 'border-red-500' : 'border-gray-200',
                  ]"
                  placeholder="Contoh: prestasi, kompetisi, juara (pisahkan dengan koma)"
                  required
                  @input="clearFieldError('tags')"
                  @blur="validateField('tags')"
                />
                <p v-if="errors.tags" class="mt-1 text-sm text-red-600">
                  {{ errors.tags[0] }}
                </p>
              </div>

              <div>
                <label for="publishedAt" class="flex items-center mb-3 text-sm font-bold text-gray-800">
                  <Icon name="lucide:calendar" size="18" class="mr-2 text-red-600" />
                  Tanggal Publikasi <span class="ml-1 text-red-500">*</span>
                </label>
                <input
                  id="publishedAt"
                  v-model="formData.publishedAt"
                  type="date"
                  :class="[
                    'w-full px-4 py-3 transition border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500',
                    errors.publishedAt ? 'border-red-500' : 'border-gray-200',
                  ]"
                  required
                  @input="clearFieldError('publishedAt')"
                  @blur="validateField('publishedAt')"
                />
                <p v-if="errors.publishedAt" class="mt-1 text-sm text-red-600">
                  {{ errors.publishedAt[0] }}
                </p>
              </div>

              <div class="flex gap-4">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="flex items-center gap-2 px-6 py-3 font-bold text-white transition duration-200 bg-red-600 shadow-md hover:bg-red-700 disabled:bg-red-400 rounded-xl hover:shadow-lg"
                >
                  <Icon v-if="isSubmitting" name="lucide:loader-2" class="animate-spin" size="20" />
                  <Icon v-else name="lucide:save" size="20" />
                  <span>{{
                    isSubmitting ? "Menyimpan..." : editingNews ? "Simpan Perubahan" : "Publikasikan Berita"
                  }}</span>
                </button>
                <button
                  type="button"
                  @click="
                    showCreateModal = false;
                    showEditModal = false;
                  "
                  class="px-6 py-3 font-semibold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="showDeleteModal = false"
      >
        <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl border-2 border-red-100" @click.stop>
          <div class="p-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                <Icon name="lucide:alert-triangle" size="24" class="text-red-600" />
              </div>
              <h3 class="text-lg font-bold text-gray-800">Hapus Berita</h3>
            </div>
            <p class="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus berita "<strong>{{ deletingNews?.title }}</strong
              >"? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div class="flex gap-3">
              <button
                @click="deleteNews"
                class="flex-1 px-4 py-3 font-semibold text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
              >
                Hapus
              </button>
              <button
                @click="showDeleteModal = false"
                class="flex-1 px-4 py-3 font-semibold text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
