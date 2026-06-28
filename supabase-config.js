
// Configuracion central de Supabase para todo el sitio.
// Reemplaza estos valores con los de tu proyecto en:
// Supabase Dashboard > Project Settings > API.
const SUPABASE_URL = 'https://azeceudkljvejbmuxmun.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZWNldWRrbGp2ZWpibXV4bXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1ODI0NjIsImV4cCI6MjA5ODE1ODQ2Mn0.nvkoTb0uXZkrXApSBvN1mT_5H9S9WIHs3cJtSePGXew';

// 1. Creamos la conexión oficial
const misupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Definimos la caja global limpia para todo el sitio
window.supabaseApp = {};

// 3. Guardamos la función para insertar tus datos
window.supabaseApp.insertReserva = function (reserva) {
    return misupabase.from('reservas').insert([reserva]).select();
};
