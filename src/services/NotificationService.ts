export class NotificationService {
    static async requestPermission(): Promise<boolean> {
        if (!('Notification' in window)) {
            console.warn('Ta przeglądarka nie obsługuje powiadomień na pulpicie.')
            return false
        }

        if (Notification.permission === 'granted') {
            return true
        }

        if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission()
            return permission === 'granted'
        }

        return false
    }

    static async scheduleMorningReminder(): Promise<void> {
        const defaultTime = new Date()
        defaultTime.setHours(8, 0, 0, 0)

        // If it's already past 8:00 AM, schedule for tomorrow
        if (new Date() > defaultTime) {
            defaultTime.setDate(defaultTime.getDate() + 1)
        }

        const timeUntil = defaultTime.getTime() - new Date().getTime()

        setTimeout(() => {
            if (Notification.permission === 'granted') {
                // Show notification
                if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                    navigator.serviceWorker.ready.then(registration => {
                        registration.showNotification('⚔️ Life OS', {
                            body: 'Twoje misje na dziś są gotowe! Czas na przygodę.',
                            icon: 'assets/tokens/token_focus.webp',
                            badge: 'assets/tokens/token_focus.webp',
                            data: { url: '/life-os-rpg/#dashboard' }
                        })
                    })
                } else {
                    new Notification('⚔️ Life OS', {
                        body: 'Twoje misje na dziś są gotowe! Czas na przygodę.',
                        icon: 'assets/tokens/token_focus.webp',
                    })
                }
            }

            // Schedule next day
            this.scheduleMorningReminder()
        }, timeUntil)

        localStorage.setItem('lifeos_morning_scheduled', 'true')
    }

    static async scheduleEveningReminder(): Promise<void> {
        const defaultTime = new Date()
        defaultTime.setHours(20, 0, 0, 0)

        // If it's already past 8:00 PM, schedule for tomorrow
        if (new Date() > defaultTime) {
            defaultTime.setDate(defaultTime.getDate() + 1)
        }

        const timeUntil = defaultTime.getTime() - new Date().getTime()

        setTimeout(() => {
            if (Notification.permission === 'granted') {
                if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                    navigator.serviceWorker.ready.then(registration => {
                        registration.showNotification('📊 Life OS', {
                            body: 'Sprawdź postęp dzisiejszych misji!',
                            icon: 'assets/tokens/token_focus.webp',
                            badge: 'assets/tokens/token_focus.webp',
                            data: { url: '/life-os-rpg/#dashboard' }
                        })
                    })
                } else {
                    new Notification('📊 Life OS', {
                        body: 'Sprawdź postęp dzisiejszych misji!',
                        icon: 'assets/tokens/token_focus.webp',
                    })
                }
            }

            // Schedule next day
            this.scheduleEveningReminder()
        }, timeUntil)

        localStorage.setItem('lifeos_evening_scheduled', 'true')
    }

    static async sendQuestCompletedNotification(questTitle: string, xpEarned: number): Promise<void> {
        if (Notification.permission !== 'granted') return

        const title = '✅ Misja Ukończona!'
        const body = `${questTitle} +${xpEarned} XP`
        const icon = 'assets/tokens/token_focus.webp'

        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(title, {
                    body,
                    icon,
                    badge: icon,
                    data: { url: '/life-os-rpg/#dashboard' }
                })
            })
        } else {
            new Notification(title, { body, icon })
        }
    }

    static async sendAllQuestsCompletedNotification(totalXP: number): Promise<void> {
        if (Notification.permission !== 'granted') return

        const title = '🏆 Wszystkie Misje!'
        const body = `Zdobyłeś ${totalXP} XP dzisiaj! Niesamowite!`
        const icon = 'assets/tokens/token_focus.webp'

        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(title, {
                    body,
                    icon,
                    badge: icon,
                    data: { url: '/life-os-rpg/#dashboard' }
                })
            })
        } else {
            new Notification(title, { body, icon })
        }
    }
}
