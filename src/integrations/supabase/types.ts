export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_title: string | null
          entity_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_title?: string | null
          entity_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_title?: string | null
          entity_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      faculty_profiles: {
        Row: {
          awards: Json | null
          bio: string | null
          conferences: Json | null
          created_at: string
          department: string | null
          designation: string | null
          education: Json | null
          email: string | null
          experiences: Json | null
          facebook_url: string | null
          faculty: string | null
          google_scholar_url: string | null
          id: string
          image_url: string | null
          linkedin_url: string | null
          memberships: Json | null
          name: string
          office: string | null
          phone: string | null
          publications: Json | null
          researchgate_url: string | null
          teaching_areas: Json | null
          title: string | null
          twitter_url: string | null
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          awards?: Json | null
          bio?: string | null
          conferences?: Json | null
          created_at?: string
          department?: string | null
          designation?: string | null
          education?: Json | null
          email?: string | null
          experiences?: Json | null
          facebook_url?: string | null
          faculty?: string | null
          google_scholar_url?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          memberships?: Json | null
          name: string
          office?: string | null
          phone?: string | null
          publications?: Json | null
          researchgate_url?: string | null
          teaching_areas?: Json | null
          title?: string | null
          twitter_url?: string | null
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          awards?: Json | null
          bio?: string | null
          conferences?: Json | null
          created_at?: string
          department?: string | null
          designation?: string | null
          education?: Json | null
          email?: string | null
          experiences?: Json | null
          facebook_url?: string | null
          faculty?: string | null
          google_scholar_url?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          memberships?: Json | null
          name?: string
          office?: string | null
          phone?: string | null
          publications?: Json | null
          researchgate_url?: string | null
          teaching_areas?: Json | null
          title?: string | null
          twitter_url?: string | null
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      homepage_sections: {
        Row: {
          content: Json
          created_at: string
          id: string
          is_visible: boolean
          order_index: number
          section_type: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          is_visible?: boolean
          order_index?: number
          section_type: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          is_visible?: boolean
          order_index?: number
          section_type?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      journal_archives: {
        Row: {
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          is_visible: boolean
          order_index: number
          pdf_url: string | null
          updated_at: string
          volume_name: string
          year: number
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_visible?: boolean
          order_index?: number
          pdf_url?: string | null
          updated_at?: string
          volume_name: string
          year: number
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_visible?: boolean
          order_index?: number
          pdf_url?: string | null
          updated_at?: string
          volume_name?: string
          year?: number
        }
        Relationships: []
      }
      journal_sections: {
        Row: {
          content: Json
          created_at: string
          id: string
          is_visible: boolean
          order_index: number
          section_key: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          is_visible?: boolean
          order_index?: number
          section_key: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          is_visible?: boolean
          order_index?: number
          section_key?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      media_files: {
        Row: {
          alt_text: string | null
          created_at: string
          file_name: string
          file_path: string
          file_size: number
          folder: string | null
          id: string
          mime_type: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_name: string
          file_path: string
          file_size?: number
          folder?: string | null
          id?: string
          mime_type: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number
          folder?: string | null
          id?: string
          mime_type?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      page_blocks: {
        Row: {
          block_type: string
          content: Json
          created_at: string
          id: string
          order_index: number
          page_id: string
          updated_at: string
        }
        Insert: {
          block_type: string
          content?: Json
          created_at?: string
          id?: string
          order_index?: number
          page_id: string
          updated_at?: string
        }
        Update: {
          block_type?: string
          content?: Json
          created_at?: string
          id?: string
          order_index?: number
          page_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_blocks_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      page_revisions: {
        Row: {
          blocks: Json | null
          content: Json | null
          created_at: string
          created_by: string | null
          id: string
          meta_description: string | null
          page_id: string
          revision_note: string | null
          slug: string
          title: string
        }
        Insert: {
          blocks?: Json | null
          content?: Json | null
          created_at?: string
          created_by?: string | null
          id?: string
          meta_description?: string | null
          page_id: string
          revision_note?: string | null
          slug: string
          title: string
        }
        Update: {
          blocks?: Json | null
          content?: Json | null
          created_at?: string
          created_by?: string | null
          id?: string
          meta_description?: string | null
          page_id?: string
          revision_note?: string | null
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_revisions_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      page_templates: {
        Row: {
          blocks: Json | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          thumbnail_url: string | null
          updated_at: string
        }
        Insert: {
          blocks?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          thumbnail_url?: string | null
          updated_at?: string
        }
        Update: {
          blocks?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          thumbnail_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: Json | null
          created_at: string
          created_by: string | null
          id: string
          is_published: boolean | null
          meta_description: string | null
          schedule_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          schedule_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          schedule_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_public_faculty_profiles: {
        Args: never
        Returns: {
          awards: Json
          bio: string
          conferences: Json
          created_at: string
          department: string
          designation: string
          education: Json
          experiences: Json
          facebook_url: string
          faculty: string
          google_scholar_url: string
          id: string
          image_url: string
          linkedin_url: string
          memberships: Json
          name: string
          office: string
          publications: Json
          researchgate_url: string
          teaching_areas: Json
          title: string
          twitter_url: string
          updated_at: string
          user_id: string
          website_url: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
