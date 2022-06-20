export class Keyboard {
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGropuEl;
  #inputEl;
  #keyPress = false;
  #mousePress = false;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.querySelector('#container');
    this.#keyboardEl = this.#containerEl.querySelector('#keyboard');
    this.#switchEl = this.#containerEl.querySelector('#switch');
    this.#fontSelectEl = this.#containerEl.querySelector('#font');
    this.#inputGropuEl = this.#containerEl.querySelector('#input-group');
    this.#inputEl = this.#inputGropuEl.querySelector('#input');
  }

  #addEvent() {
    this.#switchEl.addEventListener('change', this.#onChangeTheme);
    this.#fontSelectEl.addEventListener('change', this.#onChangeFont);
    document.addEventListener('keydown', this.#onKeyDown.bind(this));
    document.addEventListener('keyup', this.#onKeyUp.bind(this));
    this.#inputEl.addEventListener('input', this.#onInput);
    this.#keyboardEl.addEventListener(
      'mousedown',
      this.#onMouseDown.bind(this)
    );
    document.addEventListener('mouseup', this.#onMouseUp.bind(this));
  }

  #onChangeTheme(event) {
    document.documentElement.setAttribute(
      'theme',
      event.target.checked ? 'dark-mode' : ''
    );
  }
  #onChangeFont(event) {
    document.querySelector('body').style.fontFamily = event.target.value;
  }

  #onInput(event) {
    event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, '');
  }
  #onKeyUp(event) {
    if (this.#mousePress) return;
    this.#keyPress = false;
    const findEl = this.#keyboardEl.querySelector(`[data-code=${event.code}]`);
    findEl?.classList.remove('active');
  }
  #onKeyDown(event) {
    if (this.#mousePress) return;
    this.#keyPress = true;
    const findEl = this.#keyboardEl.querySelector(`[data-code=${event.code}]`);
    this.#inputGropuEl.classList.toggle('error', 'Process' === event.key);

    findEl?.classList.add('active');
  }

  #onMouseDown(event) {
    if (this.#keyPress) return;
    this.#mousePress = true;
    event.target.closest('div.key')?.classList.add('active');
  }
  #onMouseUp() {
    if (this.#keyPress) return;
    this.#mousePress = false;
    const keyEl = event.target.closest('div.key');
    const isActive = !!keyEl?.classList.contains('active');
    const val = keyEl?.dataset.val;
    if (isActive && !!val && val !== 'Space' && val !== 'Backspace') {
      this.#inputEl.value += val;
    }
    if (isActive && val === 'Space') {
      this.#inputEl.value += ' ';
    }
    if (isActive && val === 'Backspace') {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    document.querySelector('.active')?.classList.remove('active');
  }
}
