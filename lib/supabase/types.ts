// Scaffold types matching the Manas Care schema.
// Replace this file by running:
//   npx supabase gen types typescript --project-id <your-project-id> > lib/supabase/types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          display_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          date_of_birth: string | null;
          timezone: string;
          onboarding_done: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          date_of_birth?: string | null;
          timezone?: string;
          onboarding_done?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          date_of_birth?: string | null;
          timezone?: string;
          onboarding_done?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      onboarding_responses: {
        Row: {
          id: string;
          user_id: string;
          mental_health_goals: string[] | null;
          known_triggers: string[] | null;
          preferred_coping: string[] | null;
          therapy_history: boolean | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          mental_health_goals?: string[] | null;
          known_triggers?: string[] | null;
          preferred_coping?: string[] | null;
          therapy_history?: boolean | null;
          created_at?: string;
        };
        Update: {
          mental_health_goals?: string[] | null;
          known_triggers?: string[] | null;
          preferred_coping?: string[] | null;
          therapy_history?: boolean | null;
        };
        Relationships: [];
      };
      mood_logs: {
        Row: {
          id: string;
          user_id: string;
          logged_at: string;
          mood_emoji: string;
          mood_label: string;
          score: number;
          notes: string | null;
          tags: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          logged_at?: string;
          mood_emoji: string;
          mood_label: string;
          score: number;
          notes?: string | null;
          tags?: string[] | null;
          created_at?: string;
        };
        Update: {
          mood_emoji?: string;
          mood_label?: string;
          score?: number;
          notes?: string | null;
          tags?: string[] | null;
        };
        Relationships: [];
      };
      journal_entries: {
        Row: {
          id: string;
          user_id: string;
          entry_type: "free" | "cbt" | "gratitude" | "vent";
          title: string | null;
          content_encrypted: string;
          content_iv: string;
          prompt_id: string | null;
          mood_log_id: string | null;
          is_pinned: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          entry_type: "free" | "cbt" | "gratitude" | "vent";
          title?: string | null;
          content_encrypted: string;
          content_iv: string;
          prompt_id?: string | null;
          mood_log_id?: string | null;
          is_pinned?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          entry_type?: "free" | "cbt" | "gratitude";
          title?: string | null;
          content_encrypted?: string;
          content_iv?: string;
          prompt_id?: string | null;
          mood_log_id?: string | null;
          is_pinned?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      chat_sessions: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      chat_messages: {
        Row: {
          id: string;
          session_id: string;
          user_id: string;
          role: "user" | "assistant";
          content: string;
          flagged: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          user_id: string;
          role: "user" | "assistant";
          content: string;
          flagged?: boolean;
          created_at?: string;
        };
        Update: {
          flagged?: boolean;
        };
        Relationships: [];
      };
      streaks: {
        Row: {
          id: string;
          user_id: string;
          current_streak: number;
          longest_streak: number;
          last_active_at: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          current_streak?: number;
          longest_streak?: number;
          last_active_at?: string | null;
          updated_at?: string;
        };
        Update: {
          current_streak?: number;
          longest_streak?: number;
          last_active_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      privacy_settings: {
        Row: {
          user_id: string;
          data_retention_days: number;
          allow_ai_context: boolean;
          share_anonymous_insights: boolean;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          data_retention_days?: number;
          allow_ai_context?: boolean;
          share_anonymous_insights?: boolean;
          updated_at?: string;
        };
        Update: {
          data_retention_days?: number;
          allow_ai_context?: boolean;
          share_anonymous_insights?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
