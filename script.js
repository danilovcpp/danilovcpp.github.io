// Abacus class to manage the soroban
class Abacus {
    constructor(columns = 6) {
        this.columns = columns;
        this.values = new Array(columns).fill(0);
        this.init();
    }

    init() {
        const abacusElement = document.getElementById('abacus');
        abacusElement.innerHTML = '';

        // Create columns from right to left (ones, tens, hundreds, etc.)
        for (let i = this.columns - 1; i >= 0; i--) {
            const column = this.createColumn(i);
            abacusElement.appendChild(column);
        }

        this.updateDisplay();
    }

    createColumn(index) {
        const column = document.createElement('div');
        column.className = 'column';
        column.dataset.column = index;

        // Add label
        const label = document.createElement('div');
        label.className = 'column-label';
        const power = this.columns - 1 - index;
        label.textContent = power === 0 ? '1' : `10${this.getSuperscript(power)}`;
        column.appendChild(label);

        // Create rod
        const rod = document.createElement('div');
        rod.className = 'rod';

        // Create divider
        const divider = document.createElement('div');
        divider.className = 'divider';
        rod.appendChild(divider);

        // Create top beads container (1 bead worth 5)
        const topBeads = document.createElement('div');
        topBeads.className = 'top-beads';
        const topBead = this.createBead('top', index);
        topBeads.appendChild(topBead);
        rod.appendChild(topBeads);

        // Create bottom beads container (4 beads worth 1 each)
        const bottomBeads = document.createElement('div');
        bottomBeads.className = 'bottom-beads';
        for (let j = 0; j < 4; j++) {
            const bottomBead = this.createBead('bottom', index, j);
            bottomBeads.appendChild(bottomBead);
        }
        rod.appendChild(bottomBeads);

        column.appendChild(rod);
        return column;
    }

    createBead(type, columnIndex, beadIndex = 0) {
        const bead = document.createElement('div');
        bead.className = 'bead';
        bead.dataset.type = type;
        bead.dataset.column = columnIndex;
        bead.dataset.index = beadIndex;

        bead.addEventListener('click', () => {
            this.toggleBead(bead);
        });

        return bead;
    }

    toggleBead(bead) {
        const column = parseInt(bead.dataset.column);
        const type = bead.dataset.type;

        if (type === 'top') {
            // Toggle top bead (worth 5)
            bead.classList.toggle('active');
        } else {
            // Toggle bottom bead (worth 1)
            const index = parseInt(bead.dataset.index);
            const columnElement = document.querySelector(`[data-column="${column}"]`);
            const bottomBeads = columnElement.querySelectorAll('.bead[data-type="bottom"]');

            // If clicking on a bead, toggle it and all beads below it
            if (bead.classList.contains('active')) {
                // Deactivate this bead and all above it
                for (let i = 0; i <= index; i++) {
                    bottomBeads[i].classList.remove('active');
                }
            } else {
                // Activate this bead and all below it
                for (let i = index; i < bottomBeads.length; i++) {
                    bottomBeads[i].classList.add('active');
                }
            }
        }

        this.calculateValue(column);
        this.updateDisplay();
    }

    calculateValue(column) {
        const columnElement = document.querySelector(`[data-column="${column}"]`);
        const topBead = columnElement.querySelector('.bead[data-type="top"]');
        const bottomBeads = columnElement.querySelectorAll('.bead[data-type="bottom"]');

        let value = 0;

        // Add top bead value (5)
        if (topBead.classList.contains('active')) {
            value += 5;
        }

        // Add bottom beads value (1 each)
        bottomBeads.forEach(bead => {
            if (bead.classList.contains('active')) {
                value += 1;
            }
        });

        this.values[column] = value;
    }

    getValue() {
        let total = 0;
        for (let i = 0; i < this.columns; i++) {
            const power = this.columns - 1 - i;
            total += this.values[i] * Math.pow(10, power);
        }
        return total;
    }

    setValue(number) {
        // Convert number to digits
        const digits = String(number).padStart(this.columns, '0').split('').map(Number);

        // Reset all beads
        this.reset();

        // Set each column
        digits.forEach((digit, index) => {
            const column = index;
            this.setColumnValue(column, digit);
        });

        this.updateDisplay();
    }

    setColumnValue(column, value) {
        const columnElement = document.querySelector(`[data-column="${column}"]`);
        const topBead = columnElement.querySelector('.bead[data-type="top"]');
        const bottomBeads = columnElement.querySelectorAll('.bead[data-type="bottom"]');

        // Deactivate all beads first
        topBead.classList.remove('active');
        bottomBeads.forEach(bead => bead.classList.remove('active'));

        // Set top bead if value >= 5
        if (value >= 5) {
            topBead.classList.add('active');
            value -= 5;
        }

        // Set bottom beads
        for (let i = bottomBeads.length - 1; i >= bottomBeads.length - value; i--) {
            bottomBeads[i].classList.add('active');
        }

        this.values[column] = this.calculateColumnValue(column);
    }

    calculateColumnValue(column) {
        const columnElement = document.querySelector(`[data-column="${column}"]`);
        const topBead = columnElement.querySelector('.bead[data-type="top"]');
        const bottomBeads = columnElement.querySelectorAll('.bead[data-type="bottom"]');

        let value = 0;
        if (topBead.classList.contains('active')) {
            value += 5;
        }
        bottomBeads.forEach(bead => {
            if (bead.classList.contains('active')) {
                value += 1;
            }
        });

        return value;
    }

    reset() {
        const allBeads = document.querySelectorAll('.bead');
        allBeads.forEach(bead => bead.classList.remove('active'));
        this.values.fill(0);
        this.updateDisplay();
    }

    updateDisplay() {
        const displayValue = document.getElementById('display-value');
        displayValue.textContent = this.getValue().toLocaleString();
    }

    getSuperscript(num) {
        const superscripts = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
        return String(num).split('').map(d => superscripts[parseInt(d)]).join('');
    }
}

// Practice mode
class PracticeMode {
    constructor(abacus) {
        this.abacus = abacus;
        this.currentChallenge = 0;
        this.generateChallenge();
    }

    generateChallenge() {
        // Generate random number between 1 and 999999
        this.currentChallenge = Math.floor(Math.random() * 999999) + 1;
        document.getElementById('challenge-number').textContent = this.currentChallenge.toLocaleString();

        // Clear result message
        const resultMessage = document.getElementById('result-message');
        resultMessage.textContent = '';
        resultMessage.className = 'result-message';
    }

    checkAnswer() {
        const abacusValue = this.abacus.getValue();
        const resultMessage = document.getElementById('result-message');

        if (abacusValue === this.currentChallenge) {
            resultMessage.textContent = '🎉 Правильно! Отличная работа!';
            resultMessage.className = 'result-message success';

            // Auto-generate new challenge after 2 seconds
            setTimeout(() => {
                this.generateChallenge();
                this.abacus.reset();
            }, 2000);
        } else {
            resultMessage.textContent = `❌ Неправильно. Ваш ответ: ${abacusValue.toLocaleString()}. Попробуйте еще раз!`;
            resultMessage.className = 'result-message error';
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const abacus = new Abacus(6);
    const practice = new PracticeMode(abacus);

    // Set number button
    document.getElementById('set-number').addEventListener('click', () => {
        const input = document.getElementById('number-input');
        const value = parseInt(input.value) || 0;

        if (value >= 0 && value <= 999999) {
            abacus.setValue(value);
        } else {
            alert('Пожалуйста, введите число от 0 до 999999');
        }
    });

    // Reset button
    document.getElementById('reset').addEventListener('click', () => {
        abacus.reset();
        document.getElementById('number-input').value = 0;
    });

    // Random number button
    document.getElementById('random').addEventListener('click', () => {
        const randomNum = Math.floor(Math.random() * 999999);
        document.getElementById('number-input').value = randomNum;
        abacus.setValue(randomNum);
    });

    // Check answer button
    document.getElementById('check-answer').addEventListener('click', () => {
        practice.checkAnswer();
    });

    // New challenge button
    document.getElementById('new-challenge').addEventListener('click', () => {
        practice.generateChallenge();
        abacus.reset();
    });

    // Allow Enter key to set number
    document.getElementById('number-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('set-number').click();
        }
    });

    // Add some visual feedback on page load
    setTimeout(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
