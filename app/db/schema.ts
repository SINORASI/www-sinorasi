import { pgTable, text, timestamp, boolean, integer, jsonb, serial } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username"),
  phone: text("phone"),
  bio: text("bio"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// Achievement table
export const achievement = pgTable("achievement", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date"),
  category: text("category"),
});

// Activity table
export const activity = pgTable("activity", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  extracurricularId: integer("extracurricular_id").references(() => extracurricular.id),
});

// CareerProps table (assuming this is for careers)
export const career = pgTable("career", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

// Event table
export const event = pgTable("event", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  details: text("details").notNull(),
  date: text("date").notNull(),
  imageUrl: text("image_url").notNull(),
  content: text("content").notNull(),
  publishedAt: text("published_at").notNull(),
  author: text("author"),
});

// Extracurricular table
export const extracurricular = pgTable("extracurricular", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category"),
  icon: text("icon"),
  image: text("image"),
  established: text("established"),
  memberCount: integer("member_count"),
  achievementCount: integer("achievement_count"),
  yearEstablished: integer("year_established"),
  meetingsPerWeek: integer("meetings_per_week"),
  coach: text("coach"),
  schedule: text("schedule"),
  location: text("location"),
  fee: text("fee"),
  fullDescription: text("full_description"),
  requirements: jsonb("requirements"),
  activities: jsonb("activities"),
  registrationOpen: boolean("registration_open"),
  registrationPeriod: text("registration_period"),
  contactInfo: text("contact_info"),
  statistics: jsonb("statistics"),
  registrationInfo: jsonb("registration_info"),
});

// JobTitle table
export const jobTitle = pgTable("job_title", {
  id: serial("id").primaryKey(),
  icon: text("icon").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

// KaproProfile table
export const kaproProfile = pgTable("kapro_profile", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  jabatan: text("jabatan").notNull(),
  kaproName: text("kapro_name").notNull(),
  quote: text("quote").notNull(),
});

// MajorData table
export const majorData = pgTable("major_data", {
  id: serial("id").primaryKey(),
  logo: text("logo").notNull(),
  short: text("short").notNull(),
  nameMajor: text("name_major").notNull(),
  headerColor: text("header_color").notNull(),
  bgColor: text("bg_color").notNull(),
  hoverBgColor: text("hover_bg_color").notNull(),
  textColor: text("text_color").notNull(),
  btnColor: text("btn_color").notNull(),
  description: text("description").notNull(),
  prerequisites: jsonb("prerequisites").notNull(),
  relatedCourses: jsonb("related_courses").notNull(),
});

// MajorTopic table
export const majorTopic = pgTable("major_topic", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

// News table
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  thumbnail: text("thumbnail"),
  tags: jsonb("tags").notNull(),
  content: text("content").notNull(),
  publishedAt: text("published_at").notNull(),
  author: text("author"),
});

// Organization table
export const organization = pgTable("organization", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  nickname: text("nickname"),
  logo: text("logo").notNull(),
  logoDescription: text("logo_description"),
  description: text("description").notNull(),
  history: text("history"),
  established: text("established"),
  contactInfo: jsonb("contact_info"),
  statistics: jsonb("statistics").notNull(),
  leadership: jsonb("leadership").notNull(),
  sections: jsonb("sections").notNull(),
  photos: jsonb("photos"),
  recruitmentPoster: text("recruitment_poster"),
  recruitmentPeriod: text("recruitment_period"),
});

// OrganizationActivity table (junction table for organization activities)
export const organizationActivity = pgTable("organization_activity", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id").notNull().references(() => organization.id, { onDelete: "cascade" }),
  activityId: integer("activity_id").notNull().references(() => activity.id, { onDelete: "cascade" }),
});

// Staff table
export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  name: text("name").notNull(),
  position: text("position").notNull(),
});

// Teacher table
export const teacher = pgTable("teacher", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  degree: text("degree"),
  university: text("university"),
  quote: text("quote"),
  image: text("image"),
});

// TeacherCategory table
export const teacherCategory = pgTable("teacher_category", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  pagination: text("pagination").notNull(),
  description: text("description").notNull(),
  classes: jsonb("classes").notNull(),
  materialsByClass: jsonb("materials_by_class").notNull(),
  teachingFocus: text("teaching_focus").notNull(),
});

// TeacherCategoryTeacher table (junction table for teacher categories and teachers)
export const teacherCategoryTeacher = pgTable("teacher_category_teacher", {
  id: serial("id").primaryKey(),
  teacherCategoryId: integer("teacher_category_id").notNull().references(() => teacherCategory.id, { onDelete: "cascade" }),
  teacherId: integer("teacher_id").notNull().references(() => teacher.id, { onDelete: "cascade" }),
});

// Timeline table
export const timeline = pgTable("timeline", {
  id: serial("id").primaryKey(),
  year: text("year").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
});
