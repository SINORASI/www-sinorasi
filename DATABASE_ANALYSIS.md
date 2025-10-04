# Database Analysis for SMK Negeri 2 Singosari Website

## Overview

This document outlines all the data entities currently using static data in the Nuxt.js project that would benefit from database implementation. The project currently stores all data in `app/datas/data.ts` which should be migrated to a proper database system.

## Priority Implementation Order

### 🔴 High Priority
- [News/Berita](#1-news-berita)
- [Events/Acara](#2-events-acara)
- [Staff Data](#3-staff-data)

### 🟡 Medium Priority
- [Major Data](#4-major-data-jurusan)
- [Achievements/Prestasi](#6-achievements-prestasi)
- [Facilities](#7-facilities-sarana-prasarana)

### 🟢 Low Priority
- [Organizations](#8-organizations-organisasi)
- [Partners/Companies](#10-partners-companies)
- [Timeline Events](#12-timeline-history)

---

## Database Entities

### 1. News (Berita)

**Current Implementation:** Static data in `app/datas/data.ts` as `newsData`

**Used In:**
- `app/pages/berita/index.vue` - News listing page
- `app/pages/berita/[slug].vue` - Individual news detail page
- `app/components/NewsCard.vue` - News card component
- `app/components/HotNews.vue` - Featured news component
- `app/components/CardNews.vue` - News card display
- `app/components/FeaturedCardNews.vue` - Featured news display

**Database Schema:**
```sql
-- Main news table
CREATE TABLE news (
  id VARCHAR PRIMARY KEY,
  slug VARCHAR UNIQUE NOT NULL,
  title VARCHAR NOT NULL,
  subtitle TEXT,
  thumbnail VARCHAR,
  content TEXT, -- Markdown content for rich text
  published_at TIMESTAMP,
  author VARCHAR,
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- News categories/tags
CREATE TABLE news_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  color VARCHAR DEFAULT '#3B82F6'
);

-- Many-to-many relationship for news categories
CREATE TABLE news_category_relations (
  id SERIAL PRIMARY KEY,
  news_id VARCHAR REFERENCES news(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES news_categories(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_news_published_at ON news(published_at DESC);
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_featured ON news(is_featured);
```

**Features to Implement:**
- Content management system for creating/editing news
- Category filtering
- Featured news selection
- SEO-friendly slugs
- View counting
- Image upload for thumbnails

---

### 2. Events (Acara)

**Current Implementation:** Static data in `app/datas/data.ts` as `eventData`

**Used In:**
- `app/pages/acara/index.vue` - Events listing page
- `app/pages/acara/[eventSlug].vue` - Individual event detail page
- `app/components/EventCard.vue` - Event card component
- `app/components/UpcomingEvents.vue` - Upcoming events display

**Database Schema:**
```sql
-- Main events table
CREATE TABLE events (
  id VARCHAR PRIMARY KEY,
  slug VARCHAR UNIQUE NOT NULL,
  title VARCHAR NOT NULL,
  description TEXT,
  content TEXT, -- Detailed markdown content
  event_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  location VARCHAR,
  image_url VARCHAR,
  registration_url VARCHAR,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  status VARCHAR DEFAULT 'upcoming', -- upcoming, ongoing, completed, cancelled
  published_at TIMESTAMP,
  author VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Event categories
CREATE TABLE event_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  color VARCHAR DEFAULT '#10B981'
);

-- Many-to-many relationship for event categories
CREATE TABLE event_category_relations (
  id SERIAL PRIMARY KEY,
  event_id VARCHAR REFERENCES events(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES event_categories(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_featured ON events(is_featured);
```

**Features to Implement:**
- Event calendar integration
- Registration system
- Capacity management
- Event status tracking
- Category filtering
- Image galleries for events

---

### 3. Staff Data

**Current Implementation:** Static data in `app/datas/data.ts` as `staffData`

**Used In:**
- `app/pages/informasi/struktur-organisasi.vue` - Organizational structure page
- `app/components/StaffCard.vue` - Staff member display

**Database Schema:**
```sql
-- Staff categories (organizational units)
CREATE TABLE staff_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL, -- kepsek, wakasek, kurikulum, etc.
  display_name VARCHAR NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Main staff table
CREATE TABLE staff (
  id SERIAL PRIMARY KEY,
  nip VARCHAR UNIQUE, -- Employee ID
  name VARCHAR NOT NULL,
  position VARCHAR NOT NULL,
  email VARCHAR,
  phone VARCHAR,
  image VARCHAR,
  bio TEXT,
  education TEXT,
  specialization VARCHAR,
  start_date DATE,
  category_id INTEGER REFERENCES staff_categories(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Staff responsibilities/subjects
CREATE TABLE staff_subjects (
  id SERIAL PRIMARY KEY,
  staff_id INTEGER REFERENCES staff(id) ON DELETE CASCADE,
  subject_name VARCHAR NOT NULL,
  grade_level VARCHAR
);

-- Insert default categories


**Features to Implement:**
- Staff directory with search
- Contact information management
- Organizational chart visualization
- Staff profile pages
- Subject/responsibility assignment

---

### 4. Major Data (Jurusan)

**Current Implementation:** Static data in `app/datas/data.ts` as `majorDatas`

**Used In:**
- `app/pages/jurusan/[majorName].vue` - Major detail pages
- `app/components/Major/` - All major-related components
- `app/components/MajorCarousel.vue` - Major carousel display

**Database Schema:**
```sql
-- Main majors table
CREATE TABLE majors (
  id VARCHAR PRIMARY KEY, -- rpl, tkj, dkv, etc.
  short_name VARCHAR NOT NULL,
  full_name VARCHAR NOT NULL,
  description TEXT,
  logo VARCHAR,
  header_color VARCHAR,
  bg_color VARCHAR,
  hover_bg_color VARCHAR,
  text_color VARCHAR,
  btn_color VARCHAR,
  is_active BOOLEAN DEFAULT TRUE,
  student_capacity INTEGER,
  current_students INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Major curriculum/subjects
CREATE TABLE major_subjects (
  id SERIAL PRIMARY KEY,
  major_id VARCHAR REFERENCES majors(id) ON DELETE CASCADE,
  subject_name VARCHAR NOT NULL,
  semester INTEGER,
  credit_hours INTEGER,
  is_core BOOLEAN DEFAULT TRUE
);

-- Major facilities
CREATE TABLE major_facilities (
  id SERIAL PRIMARY KEY,
  major_id VARCHAR REFERENCES majors(id) ON DELETE CASCADE,
  facility_name VARCHAR NOT NULL,
  description TEXT,
  image VARCHAR,
  quantity INTEGER DEFAULT 1
);

-- Major menu items (for major-specific navigation)
CREATE TABLE major_menu_items (
  id SERIAL PRIMARY KEY,
  major_id VARCHAR REFERENCES majors(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  parent_id INTEGER REFERENCES major_menu_items(id),
  description TEXT,
  icon VARCHAR,
  url VARCHAR,
  external BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0
);

-- Insert default majors
INSERT INTO majors (id, short_name, full_name, header_color, bg_color) VALUES
('rpl', 'RPL', 'Rekayasa Perangkat Lunak', '#3B82F6', '#EFF6FF'),
('tkj', 'TKJ', 'Teknik Komputer dan Jaringan', '#10B981', '#ECFDF5'),
('dkv', 'DKV', 'Desain Komunikasi Visual', '#F59E0B', '#FFFBEB'),
('tei', 'TEI', 'Teknik Elektronika Industri', '#EF4444', '#FEF2F2'),
('tav', 'TAV', 'Teknik Audio Video', '#8B5CF6', '#F5F3FF'),
('mekatronika', 'Mekatronika', 'Teknik Mekatronika', '#06B6D4', '#ECFEFF'),
('animasi', 'Animasi', 'Animasi', '#EC4899', '#FDF2F8'),
('broadcasting', 'Broadcasting', 'Broadcasting dan Perfilman', '#F97316', '#FFF7ED');
```

**Features to Implement:**
- Major information management
- Curriculum tracking
- Student enrollment tracking
- Facility management per major
- Dynamic color theming

---

### 5. Job Titles/Career Opportunities

**Current Implementation:** Static data in `app/datas/data.ts` as `JobTitles`

**Used In:**
- Major-related components for career opportunities
- `app/components/Major/ReferenceCareers.vue`

**Database Schema:**
```sql
-- Career opportunities table
CREATE TABLE career_opportunities (
  id SERIAL PRIMARY KEY,
  major_id VARCHAR REFERENCES majors(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT,
  image VARCHAR,
  salary_range VARCHAR,
  skill_requirements TEXT,
  job_outlook VARCHAR, -- high demand, moderate, low
  related_companies TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Career skills mapping
CREATE TABLE career_skills (
  id SERIAL PRIMARY KEY,
  career_id INTEGER REFERENCES career_opportunities(id) ON DELETE CASCADE,
  skill_name VARCHAR NOT NULL,
  proficiency_level VARCHAR -- beginner, intermediate, advanced
);
```

---

### 6. Achievements (Prestasi)

**Current Implementation:** Components suggest achievement data exists

**Used In:**
- `app/components/AchievementCarousel.vue` - Achievement showcase
- `app/components/Major/MajorAchievement.vue` - Major-specific achievements

**Database Schema:**
```sql
-- Main achievements table
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  image VARCHAR,
  major_id VARCHAR REFERENCES majors(id), -- NULL for school-wide achievements
  student_name VARCHAR,
  student_class VARCHAR,
  achievement_date DATE,
  level VARCHAR, -- local, regional, national, international
  category VARCHAR, -- academic, sports, arts, technology, etc.
  competition_name VARCHAR,
  rank_position VARCHAR, -- 1st place, 2nd place, participant, etc.
  certificate_url VARCHAR,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Achievement categories
CREATE TABLE achievement_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  icon VARCHAR,
  color VARCHAR DEFAULT '#F59E0B'
);

-- Many-to-many for achievement categories
CREATE TABLE achievement_category_relations (
  id SERIAL PRIMARY KEY,
  achievement_id INTEGER REFERENCES achievements(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES achievement_categories(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_achievements_date ON achievements(achievement_date DESC);
CREATE INDEX idx_achievements_level ON achievements(level);
CREATE INDEX idx_achievements_featured ON achievements(is_featured);
```

**Features to Implement:**
- Achievement gallery
- Filter by level/category/major
- Student achievement tracking
- Certificate management
- Achievement statistics

---

### 7. Facilities (Sarana Prasarana)

**Current Implementation:** Referenced in navigation and pages

**Used In:**
- `app/pages/informasi/sarana-prasarana.vue` - Facilities information page
- `app/components/saranaPrasarana/ruangLingkup.vue` - Facility scope component

**Database Schema:**
```sql
-- Facility categories
CREATE TABLE facility_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  icon VARCHAR,
  sort_order INTEGER DEFAULT 0
);

-- Main facilities table
CREATE TABLE facilities (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  image VARCHAR,
  condition VARCHAR DEFAULT 'good', -- excellent, good, fair, needs_repair
  capacity INTEGER,
  location VARCHAR,
  category_id INTEGER REFERENCES facility_categories(id),
  major_id VARCHAR REFERENCES majors(id), -- NULL for general facilities
  acquisition_date DATE,
  last_maintenance DATE,
  next_maintenance DATE,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Facility images (multiple images per facility)
CREATE TABLE facility_images (
  id SERIAL PRIMARY KEY,
  facility_id INTEGER REFERENCES facilities(id) ON DELETE CASCADE,
  image_url VARCHAR NOT NULL,
  caption TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0
);

-- Insert default categories
INSERT INTO facility_categories (name, description, sort_order) VALUES
('Ruang Kelas', 'Ruang pembelajaran utama', 1),
('Laboratorium', 'Laboratorium praktikum dan penelitian', 2),
('Workshop', 'Ruang praktik kejuruan', 3),
('Perpustakaan', 'Fasilitas pembelajaran dan literasi', 4),
('Olahraga', 'Fasilitas olahraga dan kesehatan', 5),
('Penunjang', 'Fasilitas penunjang kegiatan sekolah', 6);
```

**Features to Implement:**
- Facility catalog with images
- Condition tracking
- Maintenance scheduling
- Capacity management
- Booking system (optional)

---

### 8. Organizations (Organisasi)

**Current Implementation:** Dedicated pages exist

**Used In:**
- `app/pages/organisasi/index.vue` - Organizations listing
- `app/pages/organisasi/[organisasi].vue` - Individual organization pages

**Database Schema:**
```sql
-- Main organizations table
CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  description TEXT,
  history TEXT,
  logo VARCHAR,
  member_count INTEGER DEFAULT 0,
  established_date DATE,
  meeting_schedule VARCHAR,
  contact_person VARCHAR,
  contact_email VARCHAR,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Organization structure/positions
CREATE TABLE organization_positions (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
  position_name VARCHAR NOT NULL,
  student_name VARCHAR,
  student_class VARCHAR,
  term_start DATE,
  term_end DATE,
  sort_order INTEGER DEFAULT 0
);

-- Organization activities
CREATE TABLE organization_activities (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT,
  image VARCHAR,
  activity_date DATE,
  participants_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Organization achievements
CREATE TABLE organization_achievements (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
  achievement_id INTEGER REFERENCES achievements(id) ON DELETE CASCADE
);
```

**Features to Implement:**
- Organization directory
- Member management
- Activity tracking
- Achievement linking
- Organization profiles

---

### 9. Extracurricular Activities

**Current Implementation:** Dedicated pages exist

**Used In:**
- `app/pages/ekstrakurikuler/index.vue` - Extracurricular listing
- `app/pages/ekstrakurikuler/[extra].vue` - Individual extracurricular pages

**Database Schema:**
```sql
-- Main extracurriculars table
CREATE TABLE extracurriculars (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR, -- sports, arts, academic, technology, etc.
  member_count INTEGER DEFAULT 0,
  max_members INTEGER,
  meeting_frequency VARCHAR,
  meeting_day VARCHAR,
  meeting_time TIME,
  meeting_location VARCHAR,
  coach_name VARCHAR,
  coach_contact VARCHAR,
  registration_fee DECIMAL(10,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Extracurricular members
CREATE TABLE extracurricular_members (
  id SERIAL PRIMARY KEY,
  extracurricular_id INTEGER REFERENCES extracurriculars(id) ON DELETE CASCADE,
  student_name VARCHAR NOT NULL,
  student_class VARCHAR,
  join_date DATE,
  is_active BOOLEAN DEFAULT TRUE
);

-- Extracurricular activities/events
CREATE TABLE extracurricular_activities (
  id SERIAL PRIMARY KEY,
  extracurricular_id INTEGER REFERENCES extracurriculars(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT,
  image VARCHAR,
  activity_date DATE,
  location VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Extracurricular achievements
CREATE TABLE extracurricular_achievements (
  id SERIAL PRIMARY KEY,
  extracurricular_id INTEGER REFERENCES extracurriculars(id) ON DELETE CASCADE,
  achievement_id INTEGER REFERENCES achievements(id) ON DELETE CASCADE
);
```

**Features to Implement:**
- Extracurricular directory
- Registration system
- Member tracking
- Activity scheduling
- Achievement linking

---

### 10. Partners/Companies

**Current Implementation:** Referenced in major components

**Used In:**
- `app/components/Major/MajorPartnerSlider.vue` - Partner showcase

**Database Schema:**
```sql
-- Main partners table
CREATE TABLE partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  logo VARCHAR,
  website VARCHAR,
  description TEXT,
  industry VARCHAR,
  contact_person VARCHAR,
  contact_email VARCHAR,
  contact_phone VARCHAR,
  address TEXT,
  established_date DATE,
  partnership_start DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Partnership types
CREATE TABLE partnership_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL,
  description TEXT
);

-- Many-to-many relationship between majors and partners
CREATE TABLE major_partnerships (
  id SERIAL PRIMARY KEY,
  major_id VARCHAR REFERENCES majors(id) ON DELETE CASCADE,
  partner_id INTEGER REFERENCES partners(id) ON DELETE CASCADE,
  partnership_type_id INTEGER REFERENCES partnership_types(id),
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  notes TEXT
);

-- Partnership activities/collaborations
CREATE TABLE partnership_activities (
  id SERIAL PRIMARY KEY,
  partnership_id INTEGER REFERENCES major_partnerships(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT,
  activity_date DATE,
  participants_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default partnership types
INSERT INTO partnership_types (name, description) VALUES
('Magang/PKL', 'Praktik Kerja Lapangan siswa'),
('Pelatihan', 'Pelatihan untuk siswa dan guru'),
('Sertifikasi', 'Program sertifikasi keahlian'),
('Donasi', 'Bantuan peralatan atau dana'),
('Guest Lecture', 'Pembicara tamu dari industri'),
('Job Fair', 'Bursa kerja untuk alumni');
```

**Features to Implement:**
- Partner directory
- Partnership tracking
- Collaboration management
- Industry connections
- Alumni job placement

---

### 11. Anonymous BK Submissions

**Current Implementation:** Form exists for anonymous counseling

**Used In:**
- `app/pages/utilitas/anonymous-bk.vue` - Anonymous counseling form

**Database Schema:**
```sql
-- Anonymous counseling submissions
CREATE TABLE anonymous_submissions (
  id SERIAL PRIMARY KEY,
  story TEXT NOT NULL,
  category VARCHAR, -- personal, academic, social, family, etc.
  grade_level VARCHAR,
  gender VARCHAR,
  submission_code VARCHAR UNIQUE, -- for follow-up reference
  ip_address INET,
  user_agent TEXT,
  submitted_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR DEFAULT 'pending', -- pending, in_review, resolved, closed
  priority VARCHAR DEFAULT 'normal', -- low, normal, high, urgent
  counselor_id INTEGER, -- assigned counselor
  counselor_notes TEXT,
  follow_up_required BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP
);

-- Counseling categories
CREATE TABLE counseling_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR DEFAULT '#6B7280'
);

-- Counselor responses (if follow-up is needed)
CREATE TABLE counselor_responses (
  id SERIAL PRIMARY KEY,
  submission_id INTEGER REFERENCES anonymous_submissions(id) ON DELETE CASCADE,
  response_text TEXT NOT NULL,
  counselor_name VARCHAR,
  response_date TIMESTAMP DEFAULT NOW(),
  is_public BOOLEAN DEFAULT FALSE -- whether response can be shared
);

-- Insert default categories
INSERT INTO counseling_categories (name, description) VALUES
('Pribadi', 'Masalah personal dan emosional'),
('Akademik', 'Kesulitan belajar dan prestasi'),
('Sosial', 'Hubungan dengan teman dan lingkungan'),
('Keluarga', 'Masalah keluarga dan rumah tangga'),
('Karir', 'Pilihan jurusan dan masa depan'),
('Bullying', 'Intimidasi dan kekerasan'),
('Lainnya', 'Masalah lain yang tidak terkategori');
```

**Features to Implement:**
- Anonymous submission system
- Counselor dashboard
- Case tracking
- Follow-up system
- Statistics and reporting

---

### 12. Timeline/History

**Current Implementation:** Timeline component exists

**Used In:**
- `app/components/Timeline.vue` - School history timeline

**Database Schema:**
```sql
-- Historical timeline events
CREATE TABLE timeline_events (
  id SERIAL PRIMARY KEY,
  year INTEGER NOT NULL,
  month INTEGER, -- optional for more specific dates
  title VARCHAR NOT NULL,
  description TEXT,
  image VARCHAR,
  icon VARCHAR,
  category VARCHAR, -- establishment, achievement, facility, program, etc.
  is_major_milestone BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Timeline categories
CREATE TABLE timeline_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL,
  color VARCHAR DEFAULT '#3B82F6',
  icon VARCHAR
);

-- Create indexes
CREATE INDEX idx_timeline_year ON timeline_events(year);
CREATE INDEX idx_timeline_category ON timeline_events(category);
```

**Features to Implement:**
- Interactive timeline
- Historical milestone tracking
- Image galleries for events
- Category filtering
- Administrative interface

---

### 13. Site Configuration

**For dynamic content management:**

**Database Schema:**
```sql
-- Site-wide settings and configurations
CREATE TABLE site_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  data_type VARCHAR DEFAULT 'string', -- string, number, boolean, json
  is_public BOOLEAN DEFAULT FALSE, -- whether setting is exposed to frontend
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by VARCHAR
);

-- Page content management
CREATE TABLE page_contents (
  id SERIAL PRIMARY KEY,
  page_identifier VARCHAR NOT NULL, -- home, about, contact, etc.
  section_key VARCHAR NOT NULL,
  content TEXT,
  content_type VARCHAR DEFAULT 'text', -- text, html, markdown, json
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by VARCHAR,
  UNIQUE(page_identifier, section_key)
);

-- Insert default settings
INSERT INTO site_settings (key, value, description, is_public) VALUES
('school_name', 'SMK Negeri 2 Singosari', 'Nama sekolah', true),
('school_motto', 'INORASI - Inovasi Raih Prestasi', 'Moto sekolah', true),
('contact_email', 'info@smkn2singosari.sch.id', 'Email kontak utama', true),
('contact_phone', '(0341) 123456', 'Nomor telepon sekolah', true),
('school_address', 'Jl. Raya Singosari, Malang, Jawa Timur', 'Alamat sekolah', true),
('principal_name', 'Sumijah S. Pd M.Si', 'Nama kepala sekolah', true),
('established_year', '1985', 'Tahun berdiri sekolah', true),
('student_count_target', '1000', 'Target jumlah siswa untuk counter', true),
('achievement_count_target', '50', 'Target jumlah prestasi untuk counter', true);
```

---

## Implementation Recommendations

### Database Technology Stack
- **Primary Database:** PostgreSQL (recommended for complex relationships)
- **Alternative:** MySQL/MariaDB
- **ORM:** Prisma (excellent TypeScript support)
- **Admin Interface:** AdminJS or custom-built with Nuxt

### Migration Strategy
1. **Phase 1:** Implement high-priority entities (News, Events, Staff)
2. **Phase 2:** Add medium-priority entities (Majors, Achievements, Facilities)
3. **Phase 3:** Complete with low-priority entities
4. **Phase 4:** Add advanced features (search, analytics, caching)

### Additional Features to Consider
- **Full-text search** across all content
- **Image optimization** and CDN integration
- **Caching layer** (Redis) for better performance
- **API versioning** for future mobile app development
- **Backup and restoration** procedures
- **Analytics tracking** for content performance
- **SEO optimization** with meta tags and sitemaps
- **Multi-language support** (Indonesian/English)

### Security Considerations
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Rate limiting for forms
- File upload security
- Admin authentication and authorization

### Performance Optimizations
- Database indexing strategy
- Query optimization
- Image lazy loading
- Content pagination
- Caching strategies
- CDN implementation

This database structure will provide a solid foundation for the SMK Negeri 2 Singosari website, enabling dynamic content management and future scalability.