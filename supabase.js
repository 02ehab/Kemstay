// supabase.js
const supabaseUrl = 'https://lejqseqsiprzlfqnyagl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlanFzZXFzaXByemxmcW55YWdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMTUzMzgsImV4cCI6MjA2OTc5MTMzOH0.Z3_1ux4lTyMWvOB4-VxU8LZADMAwyDZTF2kP6u_ZIQ8';

export const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
