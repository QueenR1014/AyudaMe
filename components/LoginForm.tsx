'use client';

'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí podrías hacer una llamada real a tu API
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-2xl shadow-lg">
      {isLoggedIn ? (
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold">Bienvenido, {email}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Acceder a Ayudame</h2>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 border rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            Log In
          </button>
        </form>
      )}
    </div>
  );
}

