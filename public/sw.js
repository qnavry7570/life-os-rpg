self.addEventListener('push', function (event) {
    const data = event.data ? event.data.json() : {};
    event.waitUntil(
        self.registration.showNotification(data.title || '⚔️ Life OS', {
            body: data.body || 'Czas na misję!',
            icon: 'assets/tokens/token_focus.webp',
            badge: 'assets/tokens/token_focus.webp',
            vibrate: [200, 100, 200],
            data: { url: data.url || '/life-os-rpg/#dashboard' }
        })
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(self.clients.openWindow(event.notification.data.url));
});
