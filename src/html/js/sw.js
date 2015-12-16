function initialize() {
	if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
		console.warn('no notifications for you. :(');
		return false;
	}
	if (!('PushManager' in window)) {
		console.warn('no pushing for you. :(');
		return false;
	}
	if (Notification.permission == 'denied')
}