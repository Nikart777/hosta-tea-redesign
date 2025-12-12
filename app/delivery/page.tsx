export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-[#0a120a] text-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-12">Оплата и Доставка</h1>
        
        <div className="grid gap-12">
          <section>
            <h2 className="text-2xl font-bold text-hosta-gold mb-4">Способы оплаты</h2>
            <ul className="list-disc list-inside text-white/70 space-y-2">
              <li>Банковской картой на сайте (Visa, Mastercard, МИР)</li>
              <li>Безналичный расчет (для юридических лиц)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-hosta-gold mb-4">Доставка</h2>
            <div className="text-white/70 space-y-4">
              <p>Мы доставляем наш чай по всей России.</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>СДЭК:</strong> до пункта выдачи или курьером до двери.</li>
                <li><strong>Почта России:</strong> во все регионы.</li>
              </ul>
              <div className="mt-6 p-4 bg-hosta-gold/10 border border-hosta-gold/20 rounded-sm inline-block">
                <p className="text-white font-medium">Бесплатная доставка при заказе от 5000 ₽</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}