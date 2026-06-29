// Gestión de sesiones seguras para la tesis y la arquitectura web orientada a servicios.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const message = document.getElementById('login-message');

  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const url = 'https://azeceudkljvejbmuxmun.supabase.co';
      const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZWNldWRrbGp2ZWpibXV4bXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1ODI0NjIsImV4cCI6MjA5ODE1ODQ2Mn0.nvkoTb0uXZkrXApSBvN1mT_5H9S9WIHs3cJtSePGXew';
      const miCliente = supabase.createClient(url, key);
      const { data, error } = await miCliente.auth.signInWithPassword({ email, password });
      if (error) {
        message.textContent = 'Credenciales inválidas. Intenta nuevamente.';
        console.error(error);
        return;
      }

      // Control de flujo basado en correo para la tesis y la gestión de roles en frontend.
      if (email === 'dueno@isabelatour.com') {
        sessionStorage.setItem('usuarioRol', 'dueño');
      } else if (email === 'empleado@isabelatour.com') {
        sessionStorage.setItem('usuarioRol', 'empleado');
      } else {
        sessionStorage.setItem('usuarioRol', 'empleado');
      }

      window.location.href = 'index.html';
    } catch (err) {
      message.textContent = 'No se pudo iniciar sesión.';
      console.error(err);
    }
  });
});
