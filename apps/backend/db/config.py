import os
from dotenv import load_dotenv

load_dotenv()

if os.getenv("SUPABASE_URL") is None or os.getenv("SUPABASE_KEY") is None:
    raise EnvironmentError("SUPABASE_URL and SUPABASE_KEY must be set in environment variables")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")