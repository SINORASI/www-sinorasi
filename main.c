#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dirent.h>
#include <sys/stat.h>
#include <time.h>
#include <unistd.h>

#define MAX_PATH 4096
#define MAX_DEPTH 20

typedef struct FileNode {
    char name[256];
    char path[MAX_PATH];
    int is_dir;
    off_t size;
    time_t mtime;
    int depth;
} FileNode;

void print_indent(int depth) {
    for (int i = 0; i < depth; i++) {
        printf("│   ");
    }
}

void get_file_extension(const char *filename, char *ext) {
    const char *dot = strrchr(filename, '.');
    if (dot && dot != filename) {
        strcpy(ext, dot + 1);
    } else {
        strcpy(ext, "none");
    }
}

void generate_ai_prompt_header(FILE *fp) {
    fprintf(fp, "\n=== AI AGENT FILE SYSTEM ANALYSIS PROMPT ===\n\n");
    fprintf(fp, "Task: Analyze the following file system structure and create a database schema to organize these files.\n\n");
    fprintf(fp, "Instructions:\n");
    fprintf(fp, "1. Identify file types and their purposes based on extensions and names\n");
    fprintf(fp, "2. Suggest a relational database schema with tables for:\n");
    fprintf(fp, "   - Files (id, name, path, type, size, modified_date, parent_dir)\n");
    fprintf(fp, "   - Directories (id, name, path, parent_id, depth)\n");
    fprintf(fp, "   - FileTypes (id, extension, category, description)\n");
    fprintf(fp, "3. Recommend categorization rules for different file types\n");
    fprintf(fp, "4. Suggest metadata to extract from each file type\n");
    fprintf(fp, "5. Propose indexing strategies for efficient querying\n\n");
    fprintf(fp, "=== FILE SYSTEM STRUCTURE ===\n\n");
}

void log_to_prompt(FILE *fp, FileNode *node, int is_last) {
    char ext[64];
    get_file_extension(node->name, ext);
    
    fprintf(fp, "DEPTH:%d|TYPE:%s|NAME:%s|PATH:%s|SIZE:%ld|EXT:%s|MTIME:%ld\n",
            node->depth,
            node->is_dir ? "DIR" : "FILE",
            node->name,
            node->path,
            node->size,
            ext,
            node->mtime);
}

void scan_directory(const char *path, int depth, FILE *prompt_file) {
    if (depth > MAX_DEPTH) return;
    
    DIR *dir = opendir(path);
    if (!dir) {
        perror("opendir");
        return;
    }
    
    struct dirent *entry;
    struct stat st;
    char full_path[MAX_PATH];
    
    // First pass: count entries
    int total = 0;
    while ((entry = readdir(dir)) != NULL) {
        if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0)
            continue;
        total++;
    }
    rewinddir(dir);
    
    // Second pass: process entries
    int current = 0;
    while ((entry = readdir(dir)) != NULL) {
        if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0)
            continue;
        
        snprintf(full_path, sizeof(full_path), "%s/%s", path, entry->d_name);
        
        if (stat(full_path, &st) == -1) {
            perror("stat");
            continue;
        }
        
        FileNode node;
        strncpy(node.name, entry->d_name, sizeof(node.name) - 1);
        strncpy(node.path, full_path, sizeof(node.path) - 1);
        node.is_dir = S_ISDIR(st.st_mode);
        node.size = st.st_size;
        node.mtime = st.st_mtime;
        node.depth = depth;
        
        current++;
        int is_last = (current == total);
        
        // Print to console
        print_indent(depth);
        printf("%s %s", is_last ? "└──" : "├──", entry->d_name);
        
        if (node.is_dir) {
            printf("/\n");
        } else {
            printf(" (%ld bytes)\n", node.size);
        }
        
        // Log to prompt file
        log_to_prompt(prompt_file, &node, is_last);
        
        // Recurse into directories
        if (node.is_dir) {
            scan_directory(full_path, depth + 1, prompt_file);
        }
    }
    
    closedir(dir);
}

void generate_ai_prompt_footer(FILE *fp) {
    fprintf(fp, "\n=== END FILE SYSTEM STRUCTURE ===\n\n");
    fprintf(fp, "Based on the above structure, please provide:\n\n");
    fprintf(fp, "1. SQL schema for the database tables\n");
    fprintf(fp, "2. Categorization mapping for file extensions\n");
    fprintf(fp, "3. Sample INSERT statements for organizing these files\n");
    fprintf(fp, "4. Suggested queries for common file operations:\n");
    fprintf(fp, "   - Find all files of a specific type\n");
    fprintf(fp, "   - List files modified within a date range\n");
    fprintf(fp, "   - Find largest files in each directory\n");
    fprintf(fp, "   - Search files by name pattern\n");
    fprintf(fp, "5. Recommendations for file management and organization\n");
}

int main(int argc, char *argv[]) {
    char *target_path = ".";
    
    if (argc > 1) {
        target_path = argv[1];
    }
    
    printf("File Tree Visualizer\n");
    printf("====================\n");
    printf("Scanning: %s\n\n", target_path);
    
    // Create prompt output file
    FILE *prompt_file = fopen("ai_agent_prompt.txt", "w");
    if (!prompt_file) {
        perror("fopen");
        return 1;
    }
    
    generate_ai_prompt_header(prompt_file);
    
    // Start scanning
    printf("%s/\n", target_path);
    scan_directory(target_path, 0, prompt_file);
    
    generate_ai_prompt_footer(prompt_file);
    fclose(prompt_file);
    
    printf("\n✓ Scan complete!\n");
    printf("✓ AI agent prompt generated: ai_agent_prompt.txt\n");
    printf("\nUsage: Pass the generated prompt to an AI agent to get database schema recommendations.\n");
    
    return 0;
}
