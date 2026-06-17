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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          batch_id: string | null
          created_at: string
          date: string
          id: string
          remarks: string | null
          status: string
          student_id: string
        }
        Insert: {
          batch_id?: string | null
          created_at?: string
          date?: string
          id?: string
          remarks?: string | null
          status?: string
          student_id: string
        }
        Update: {
          batch_id?: string | null
          created_at?: string
          date?: string
          id?: string
          remarks?: string | null
          status?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          entity: string | null
          entity_id: string | null
          id: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          entity?: string | null
          entity_id?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          entity?: string | null
          entity_id?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      batches: {
        Row: {
          capacity: number
          course_id: string
          created_at: string
          end_date: string | null
          id: string
          name: string
          start_date: string
          timing: string | null
          updated_at: string
        }
        Insert: {
          capacity?: number
          course_id: string
          created_at?: string
          end_date?: string | null
          id?: string
          name: string
          start_date: string
          timing?: string | null
          updated_at?: string
        }
        Update: {
          capacity?: number
          course_id?: string
          created_at?: string
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string
          timing?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "batches_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          certificate_no: string
          course_id: string | null
          created_at: string
          grade: string | null
          id: string
          issue_date: string
          marks_obtained: number | null
          remarks: string | null
          student_id: string
          total_marks: number | null
        }
        Insert: {
          certificate_no: string
          course_id?: string | null
          created_at?: string
          grade?: string | null
          id?: string
          issue_date?: string
          marks_obtained?: number | null
          remarks?: string | null
          student_id: string
          total_marks?: number | null
        }
        Update: {
          certificate_no?: string
          course_id?: string | null
          created_at?: string
          grade?: string | null
          id?: string
          issue_date?: string
          marks_obtained?: number | null
          remarks?: string | null
          student_id?: string
          total_marks?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          code: string
          created_at: string
          description: string | null
          duration_months: number
          fees: number
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          duration_months?: number
          fees?: number
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          duration_months?: number
          fees?: number
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      exam_marks: {
        Row: {
          created_at: string
          exam_id: string
          id: string
          marks_obtained: number
          max_marks: number
          remarks: string | null
          student_id: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          exam_id: string
          id?: string
          marks_obtained?: number
          max_marks?: number
          remarks?: string | null
          student_id: string
          subject?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          exam_id?: string
          id?: string
          marks_obtained?: number
          max_marks?: number
          remarks?: string | null
          student_id?: string
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_marks_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          batch_id: string | null
          course_id: string | null
          created_at: string
          exam_date: string
          exam_type: string
          id: string
          max_marks: number
          name: string
          remarks: string | null
          updated_at: string
        }
        Insert: {
          batch_id?: string | null
          course_id?: string | null
          created_at?: string
          exam_date?: string
          exam_type?: string
          id?: string
          max_marks?: number
          name: string
          remarks?: string | null
          updated_at?: string
        }
        Update: {
          batch_id?: string | null
          course_id?: string | null
          created_at?: string
          exam_date?: string
          exam_type?: string
          id?: string
          max_marks?: number
          name?: string
          remarks?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      fees: {
        Row: {
          amount: number
          created_at: string
          due_date: string | null
          fee_type: string
          id: string
          paid_date: string | null
          payment_mode: string
          receipt_no: string | null
          remarks: string | null
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          due_date?: string | null
          fee_type?: string
          id?: string
          paid_date?: string | null
          payment_mode?: string
          receipt_no?: string | null
          remarks?: string | null
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string | null
          fee_type?: string
          id?: string
          paid_date?: string | null
          payment_mode?: string
          receipt_no?: string | null
          remarks?: string | null
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fees_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          course_interest: string | null
          created_at: string
          email: string | null
          follow_up_date: string | null
          full_name: string
          id: string
          message: string | null
          mobile: string
          source: string | null
          status: string
          updated_at: string
        }
        Insert: {
          course_interest?: string | null
          created_at?: string
          email?: string | null
          follow_up_date?: string | null
          full_name: string
          id?: string
          message?: string | null
          mobile: string
          source?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          course_interest?: string | null
          created_at?: string
          email?: string | null
          follow_up_date?: string | null
          full_name?: string
          id?: string
          message?: string | null
          mobile?: string
          source?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      parents: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          mobile: string
          occupation: string | null
          relation: string | null
          student_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          mobile: string
          occupation?: string | null
          relation?: string | null
          student_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          mobile?: string
          occupation?: string | null
          relation?: string | null
          student_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          id: string
          institute_name: string
          logo_url: string | null
          primary_color: string | null
          secondary_color: string | null
          theme_mode: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          id?: string
          institute_name?: string
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          theme_mode?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          id?: string
          institute_name?: string
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          theme_mode?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      staff: {
        Row: {
          created_at: string
          designation: string | null
          email: string | null
          full_name: string
          id: string
          joining_date: string | null
          mobile: string | null
          salary: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          designation?: string | null
          email?: string | null
          full_name: string
          id?: string
          joining_date?: string | null
          mobile?: string | null
          salary?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          designation?: string | null
          email?: string | null
          full_name?: string
          id?: string
          joining_date?: string | null
          mobile?: string | null
          salary?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          address: string | null
          admission_date: string
          batch_id: string | null
          course_id: string | null
          created_at: string
          dob: string | null
          email: string | null
          enrollment_no: string
          full_name: string
          gender: string | null
          id: string
          mobile: string
          photo_url: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          admission_date?: string
          batch_id?: string | null
          course_id?: string | null
          created_at?: string
          dob?: string | null
          email?: string | null
          enrollment_no: string
          full_name: string
          gender?: string | null
          id?: string
          mobile: string
          photo_url?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          admission_date?: string
          batch_id?: string | null
          course_id?: string | null
          created_at?: string
          dob?: string | null
          email?: string | null
          enrollment_no?: string
          full_name?: string
          gender?: string | null
          id?: string
          mobile?: string
          photo_url?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "staff"
        | "student"
        | "parent"
        | "teacher"
        | "accountant"
        | "receptionist"
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
      app_role: [
        "admin",
        "staff",
        "student",
        "parent",
        "teacher",
        "accountant",
        "receptionist",
      ],
    },
  },
} as const
