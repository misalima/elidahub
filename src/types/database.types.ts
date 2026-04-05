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
    PostgrestVersion: "13.0.4"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      alunos_boletins: {
        Row: {
          created_at: string | null
          data_nascimento: string
          id: string
          matricula: string | null
          nome_completo: string
          storage_path: string
          turma: string
        }
        Insert: {
          created_at?: string | null
          data_nascimento: string
          id?: string
          matricula?: string | null
          nome_completo: string
          storage_path: string
          turma: string
        }
        Update: {
          created_at?: string | null
          data_nascimento?: string
          id?: string
          matricula?: string | null
          nome_completo?: string
          storage_path?: string
          turma?: string
        }
        Relationships: []
      }
      exam_questions: {
        Row: {
          exam_id: string
          id: string
          position: number
          question_id: string
        }
        Insert: {
          exam_id: string
          id?: string
          position?: number
          question_id: string
        }
        Update: {
          exam_id?: string
          id?: string
          position?: number
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_questions_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_questions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          created_at: string
          created_by: string | null
          date_label: string | null
          description: string | null
          duration: string | null
          grade: string | null
          id: string
          instructions: string | null
          school_name: string
          school_year: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          date_label?: string | null
          description?: string | null
          duration?: string | null
          grade?: string | null
          id?: string
          instructions?: string | null
          school_name?: string
          school_year?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          date_label?: string | null
          description?: string | null
          duration?: string | null
          grade?: string | null
          id?: string
          instructions?: string | null
          school_name?: string
          school_year?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exams_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      faq_entries: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          keywords: string[]
          question: string
          updated_at: string
          usage_count: number
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          keywords: string[]
          question: string
          updated_at?: string
          usage_count?: number
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          keywords?: string[]
          question?: string
          updated_at?: string
          usage_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "faq_entries_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          channel: string
          citizen_id: string | null
          created_at: string
          delivery_status: string | null
          direction: string
          external_id: string | null
          id: string
          is_automated: boolean
          message_body: string
          message_template: string | null
          message_type: string
          phone_number: string | null
          related_entity_id: string | null
          related_module: string | null
          sent_by: string | null
        }
        Insert: {
          channel?: string
          citizen_id?: string | null
          created_at?: string
          delivery_status?: string | null
          direction: string
          external_id?: string | null
          id?: string
          is_automated?: boolean
          message_body: string
          message_template?: string | null
          message_type?: string
          phone_number?: string | null
          related_entity_id?: string | null
          related_module?: string | null
          sent_by?: string | null
        }
        Update: {
          channel?: string
          citizen_id?: string | null
          created_at?: string
          delivery_status?: string | null
          direction?: string
          external_id?: string | null
          id?: string
          is_automated?: boolean
          message_body?: string
          message_template?: string | null
          message_type?: string
          phone_number?: string | null
          related_entity_id?: string | null
          related_module?: string | null
          sent_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_sent_by_fkey"
            columns: ["sent_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          is_active: boolean
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          is_active?: boolean
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          answer: string
          created_at: string
          difficulty: string | null
          id: string
          image_url: string | null
          knowledge_area: string
          level: string | null
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          option_e: string
          statement: string
          subject: string
          teacher_name: string | null
          topic: string | null
          updated_at: string
        }
        Insert: {
          answer: string
          created_at?: string
          difficulty?: string | null
          id?: string
          image_url?: string | null
          knowledge_area: string
          level?: string | null
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          option_e: string
          statement: string
          subject: string
          teacher_name?: string | null
          topic?: string | null
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          difficulty?: string | null
          id?: string
          image_url?: string | null
          knowledge_area?: string
          level?: string | null
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          option_e?: string
          statement?: string
          subject?: string
          teacher_name?: string | null
          topic?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  vqdt: {
    Tables: {
      bulk_message_batches: {
        Row: {
          completed_at: string | null
          created_at: string
          error_details: string | null
          failed_count: number
          filters: Json | null
          id: string
          message_template: string
          sent_count: number
          started_at: string | null
          started_by: string
          status: string
          title: string
          total_recipients: number
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_details?: string | null
          failed_count?: number
          filters?: Json | null
          id?: string
          message_template: string
          sent_count?: number
          started_at?: string | null
          started_by: string
          status?: string
          title: string
          total_recipients?: number
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_details?: string | null
          failed_count?: number
          filters?: Json | null
          id?: string
          message_template?: string
          sent_count?: number
          started_at?: string | null
          started_by?: string
          status?: string
          title?: string
          total_recipients?: number
        }
        Relationships: []
      }
      citizen_schedules: {
        Row: {
          approval_date: string | null
          approved: boolean | null
          attendance_status: string | null
          citizen_id: string
          confirmation_sent_at: string | null
          created_at: string
          created_by: string | null
          id: string
          notes: string | null
          reagendamento_count: number | null
          response_received_at: string | null
          schedule_id: string
          status: string
          updated_at: string
        }
        Insert: {
          approval_date?: string | null
          approved?: boolean | null
          attendance_status?: string | null
          citizen_id: string
          confirmation_sent_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          reagendamento_count?: number | null
          response_received_at?: string | null
          schedule_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          approval_date?: string | null
          approved?: boolean | null
          attendance_status?: string | null
          citizen_id?: string
          confirmation_sent_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          reagendamento_count?: number | null
          response_received_at?: string | null
          schedule_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "citizen_schedules_citizen_id_fkey"
            columns: ["citizen_id"]
            isOneToOne: false
            referencedRelation: "citizens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "citizen_schedules_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "citizen_schedules_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "v_schedule_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      citizens: {
        Row: {
          consent_whatsapp: boolean
          created_at: string
          created_by: string | null
          email: string | null
          full_name: string
          id: string
          is_active: boolean
          observations: string | null
          phone: string
          updated_at: string
        }
        Insert: {
          consent_whatsapp?: boolean
          created_at?: string
          created_by?: string | null
          email?: string | null
          full_name: string
          id?: string
          is_active?: boolean
          observations?: string | null
          phone: string
          updated_at?: string
        }
        Update: {
          consent_whatsapp?: boolean
          created_at?: string
          created_by?: string | null
          email?: string | null
          full_name?: string
          id?: string
          is_active?: boolean
          observations?: string | null
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      monthly_targets: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          month: number
          target_approved: number
          year: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          month: number
          target_approved?: number
          year: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          month?: number
          target_approved?: number
          year?: number
        }
        Relationships: []
      }
      schedules: {
        Row: {
          capacity: number | null
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          observations: string | null
          scheduled_date: string
          scheduled_time: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          observations?: string | null
          scheduled_date: string
          scheduled_time: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          observations?: string | null
          scheduled_date?: string
          scheduled_time?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      v_monthly_progress: {
        Row: {
          actual_approved: number | null
          month: number | null
          progress_percentage: number | null
          target_approved: number | null
          year: number | null
        }
        Relationships: []
      }
      v_schedule_stats: {
        Row: {
          ausentes: number | null
          confirmados: number | null
          id: string | null
          pendentes: number | null
          reagendados: number | null
          scheduled_date: string | null
          scheduled_time: string | null
          title: string | null
          total_inscricoes: number | null
          type: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
  vqdt: {
    Enums: {},
  },
} as const
