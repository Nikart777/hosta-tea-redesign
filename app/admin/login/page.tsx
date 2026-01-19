'use client';

import { useActionState } from 'react';
import { login } from '../actions';
import { Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
    const [state, formAction, isPending] = useActionState(login, null);

    return (
        <div className="min-h-screen bg-hosta-dark flex items-center justify-center p-4">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-lg border border-white/10 w-full max-w-md shadow-2xl">
                <h1 className="text-3xl font-playfair text-hosta-gold mb-2 text-center">Hosta Tea Admin</h1>
                <p className="text-white/40 text-center mb-8 font-inter text-sm">Вход в панель управления</p>

                <form action={formAction} className="space-y-6">
                    <div>
                        <label className="block text-white/60 text-sm mb-2 font-inter">Пароль администратора</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="w-full bg-black/20 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-hosta-gold transition-colors font-inter"
                            required
                        />
                    </div>

                    {state?.error && (
                        <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded border border-red-400/20">
                            {state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-hosta-gold text-hosta-dark font-bold py-3 rounded hover:bg-white transition-colors flex items-center justify-center gap-2"
                    >
                        {isPending ? <Loader2 className="animate-spin" size={20} /> : 'Войти'}
                    </button>
                </form>
            </div>
        </div>
    );
}
