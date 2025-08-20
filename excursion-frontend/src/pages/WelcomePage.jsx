export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold text-sky-900 mb-4">
          Sveiki atvykę į <span className="text-sky-600">Ekskursijų Pasaulį</span>
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Prisijunk arba susikurk paskyrą ir pradėk savo kelionių nuotykį – atrask įspūdingas ekskursijas, dalinkis patirtimis ir kurk prisiminimus.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
          >
            Prisijungti
          </a>
          <a
            href="/register"
            className="px-6 py-3 border border-sky-600 text-sky-600 rounded-lg hover:bg-sky-50 transition"
          >
            Registruotis
          </a>
        </div>
      </div>
    </div>
  );
}
