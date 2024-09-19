import './scss/style.scss';
// import APP from "./app/App"

// window.addEventListener('DOMContentLoaded', () => {
// 	const canvasElement = document.querySelector('canvas') as HTMLCanvasElement
// 	if (!canvasElement) return console.error('Failed to load canvas!')

// 	APP.getInstance(canvasElement)
// })

const typewriterEffect = (
	element: HTMLElement,
	typeSpeed: number = 300,
	deleteSpeed: number = 100,
	delayBetweenWords: number = 100
) => {
	const words: string[] = element.getAttribute('data-words')!.split(',') || [];
	let wordIndex: number = 0;
	let charIndex: number = 0;
	let isDeleting: boolean = false;
	let currentWord: string = '';

	const type = () => {
		// get the current word to type
		if (wordIndex < words.length) {
			currentWord = words[wordIndex];
		}
		// determine the text to display
		const displayText = isDeleting ? currentWord.substring(0, charIndex--) : currentWord.substring(0, charIndex++);

		// update the element's text
		element.textContent = displayText;

		// determine the delay before the next action
		let delay = isDeleting ? deleteSpeed : typeSpeed;

		// if the word is fully typed, start deleting after a delay
		if (!isDeleting && charIndex === currentWord.length) {
			isDeleting = true;
			delay = delayBetweenWords;
		}

		// if the word is fully deleted, move to the next word
		if (isDeleting && charIndex === 0) {
			isDeleting = false;
			wordIndex = (wordIndex + 1) % words.length;
			delay = typeSpeed;
		}

		setTimeout(type, delay);
	};
	type();
};

const initProgressBars = (): void => {
	const progressBars = document.querySelectorAll('.progressbar__container');

	progressBars.forEach((bar) => {
		const progress = bar.getAttribute('data-progress'); // Get progress percentage from data attribute
		const progressBar = bar.querySelector('.progressbar');

		// Cast the Element to HTMLElement to access the style property
		if (progressBar && progress !== null) {
			(progressBar as HTMLElement).style.width = progress + '%'; // Set the width dynamically
			progressBar.innerHTML = `${progress}%`; // Set the label dynamically with the percentage` progress + '%'; // Display the percentage inside the progress bar
		}
	});
};

window.addEventListener('DOMContentLoaded', () => {
	const typewriterElement = document.getElementById('typewriter') as HTMLElement;
	if (typewriterElement) {
		typewriterEffect(typewriterElement);
	}

	initProgressBars();
});
