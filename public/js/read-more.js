document.addEventListener('DOMContentLoaded', function () {
	var cards = document.querySelectorAll('.project-card, .project-card1');

	cards.forEach(function (card) {
		var text = card.querySelector('p.project-card-tech, p.project-card1-tech');
		if (!text) return;

		// Metin satır sınırını taşıyor mu kontrol et
		if (text.scrollHeight - text.clientHeight > 4) {
			var btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'read-more-btn';
			btn.textContent = 'Devamını Oku';

			btn.addEventListener('click', function () {
				var expanded = card.classList.toggle('is-expanded');
				btn.textContent = expanded ? 'Daha Az Göster' : 'Devamını Oku';
			});

			text.insertAdjacentElement('afterend', btn);
		}
	});
});
