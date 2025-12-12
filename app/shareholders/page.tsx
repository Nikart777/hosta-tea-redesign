export default function ShareholdersPage() {
  return (
    <div className="min-h-screen bg-[#0a120a] text-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-8">Информация для акционеров</h1>
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-white/60">
            Раздел находится в стадии наполнения. Здесь будет опубликована официальная отчетность и документы АО «Хоста-Чай».
          </p>
          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-sm">
             <h3 className="text-xl font-bold mb-4">Контакты корпоративного секретаря</h3>
             <p>Телефон: +7 (862) 265 98 35</p>
             <p>Email: hosta-chai@mail.ru</p>
          </div>
        </div>
      </div>
    </div>
  );
}