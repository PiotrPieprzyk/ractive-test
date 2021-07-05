(() => {
	function Translator() {
		const self = this;

		self.dictionary = [
			{
				en: 'I',
				pl: 'ja'
			},
			{
				en: 'apple',
				pl: 'jabłko'
			},
			{
				en: 'love',
				pl: 'kocham'
			},
		];

		self.languages = {
			en: 'en',
			pl: 'pl'
		};

		self.translateSentence = function (sentence, languageLeft, languageRight) {
			return sentence
				.split(' ')
				.map((word) => self.translateWord(word, languageLeft, languageRight))
				.join(' ');
		}

		self.translateWord = function (word, languageLeft, languageRight) {
			const translations = self.dictionary.find((item) => item[languageLeft] === word);
			if (translations) {
				return translations[languageRight];
			}
			return word;
		}
	}

	window.Translator = new Translator();
})()
