import { ref, onMounted } from "vue";

export interface PageSection {
  id: string;
  title: string;
  label: string;
}

const pageSections = ref<PageSection[]>([]);

export const usePageSections = () => {
  const extractSections = () => {
    // Look for all sections with id attributes
    const sections: PageSection[] = [];
    const sectionElements = document.querySelectorAll(
      'section[id], [id*="section"], [id*="tentang"], [id*="kepala"], [id*="materi"], [id*="tools"], [id*="kesempatan"], [id*="mitra"], [id*="minigame"], [id*="prestasi"]'
    );

    sectionElements.forEach((element) => {
      const id = element.getAttribute("id");
      if (id) {
        // Convert kebab-case to Title Case
        const title = id
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        sections.push({
          id,
          title,
          label: formatSectionLabel(id),
        });
      }
    });

    pageSections.value = sections;
    return sections;
  };

  const formatSectionLabel = (id: string): string => {
    const labelMap: Record<string, string> = {
      "tentang-jurusan": "Tentang Jurusan",
      "kepala-program": "Kepala Program",
      "materi-pembelajaran": "Materi Pembelajaran",
      "tools-software": "Tools & Software",
      "kesempatan-kerja": "Kesempatan Kerja",
      "mitra-kerja": "Mitra Kerja",
      minigame: "Mini Game",
      prestasi: "Prestasi",
    };

    return (
      labelMap[id] ||
      id
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  onMounted(() => {
    extractSections();
    // Re-extract if DOM updates
    window.addEventListener("load", extractSections);
    return () => {
      window.removeEventListener("load", extractSections);
    };
  });

  return {
    pageSections,
    extractSections,
    scrollToSection,
    formatSectionLabel,
  };
};
