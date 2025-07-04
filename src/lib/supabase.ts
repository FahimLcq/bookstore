// lib/supabase.ts

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/database";

export const supabase = createPagesBrowserClient<Database>();
