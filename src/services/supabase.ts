import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://durxknflcnpxxiadbnib.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1cnhrbmZsY25weHhpYWRibmliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1NTA0MjIsImV4cCI6MjAxODEyNjQyMn0.disR3mcipk62nMH0fYFSJ2tE-Z_DvtMS8rXofoRHzSA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
