import { NextResponse } from 'next/server';

// Пример для ЮKassa / Тинькофф (структура общая)
export async function POST(req: Request) {
  try {
    const { amount, description, orderId, email } = await req.json();

    // 1. Получаем секретные ключи из .env (никогда не пишите их в коде напрямую!)
    const shopId = process.env.PAYMENT_SHOP_ID;
    const secretKey = process.env.PAYMENT_SECRET_KEY;
    
    // Базовая авторизация (зависит от банка, часто это Basic Auth)
    const authHeader = 'Basic ' + Buffer.from(`${shopId}:${secretKey}`).toString('base64');

    // 2. Формируем запрос к Банку
    // (URL зависит от провайдера, здесь примерный)
    const bankResponse = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'Idempotence-Key': crypto.randomUUID(), // Защита от двойных списаний
      },
      body: JSON.stringify({
        amount: {
          value: amount.toFixed(2),
          currency: 'RUB',
        },
        capture: true, // Сразу списывать деньги (без холдирования)
        confirmation: {
          type: 'redirect',
          return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`, // Куда вернуть юзера
        },
        description: `Заказ #${orderId} (${description})`,
        metadata: {
          order_id: orderId, // Чтобы потом понять, за что пришли деньги
        },
        receipt: { // Для 54-ФЗ (онлайн-кассы)
            customer: { email: email },
            items: [
                {
                    description: "Чай (Ассортимент)",
                    quantity: "1.00",
                    amount: { value: amount.toFixed(2), currency: "RUB" },
                    vat_code: "1", // НДС
                }
            ]
        }
      }),
    });

    const paymentData = await bankResponse.json();

    if (!bankResponse.ok) {
      console.error('Ошибка банка:', paymentData);
      return NextResponse.json({ error: 'Ошибка создания платежа' }, { status: 500 });
    }

    // 3. Возвращаем ссылку на оплату на фронтенд
    return NextResponse.json({ 
      paymentUrl: paymentData.confirmation.confirmation_url,
      paymentId: paymentData.id 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}