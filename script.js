<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kalkulator 7F</title>
    <style>
        :root {
            --bg-color: white;
            --text-color: black;
            --btn-bg: lightgray;
            --btn-hover: gray;
            --border-color: #ccc;
        }
        .dark-mode {
            --bg-color: #222;
            --text-color: white;
            --btn-bg: #333;
            --btn-hover: #555;
            --border-color: #444;
        }
        * {
            box-sizing: border-box;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        body {
            background: var(--bg-color);
            color: var(--text-color);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
            padding: 20px;
        }
        #calculator {
            width: 100%;
            max-width: 400px;
            border: 2px solid var(--border-color);
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            background: var(--bg-color);
        }
        #display {
            width: 100%;
            height: 60px;
            text-align: right;
            font-size: 1.8em;
            border: none;
            padding: 10px;
            margin-bottom: 15px;
            background: var(--bg-color);
            color: var(--text-color);
            border-bottom: 3px solid var(--text-color);
        }
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }
        button {
            width: 100%;
            padding: 20px;
            font-size: 1.3em;
            border: none;
            border-radius: 8px;
            background: var(--btn-bg);
            color: var(--text-color);
            cursor: pointer;
            transition: 0.2s;
        }
        button:hover {
            background: var(--btn-hover);
        }
        #settings-menu {
            display: none;
            position: absolute;
            top: 50px;
            right: 10px;
            background: var(--bg-color);
            border: 1px solid var(--text-color);
            padding: 10px;
            border-radius: 5px;
        }
        .settings-option {
            cursor: pointer;
            padding: 5px;
            font-size: 1em;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .settings-option:hover {
            background: var(--btn-bg);
        }
    </style>
</head>
<body>
    <button onclick="toggleSettings()">⚙ Pengaturan</button>
    <div id="settings-menu">
        <div class="settings-option" onclick="toggleTheme()">🌙 Ganti Tema</div>
        <div class="settings-option" onclick="toggleAutoCalculate()">🧮 Perhitungan Otomatis</div>
        <div class="settings-option" onclick="toggleDecimal()">🔢 Bulatkan Desimal</div>
    </div>
    <div id="calculator">
        <input type="text" id="display" disabled>
        <div class="buttons">
            <button onclick="clearDisplay()">C</button>
            <button onclick="deleteLast()">DEL</button>
            <button onclick="appendToDisplay('(')">(</button>
            <button onclick="appendToDisplay(')')">)</button>

            <button onclick="appendToDisplay('7')">7</button>
            <button onclick="appendToDisplay('8')">8</button>
            <button onclick="appendToDisplay('9')">9</button>
            <button onclick="appendOperator('/')">÷</button>

            <button onclick="appendToDisplay('4')">4</button>
            <button onclick="appendToDisplay('5')">5</button>
            <button onclick="appendToDisplay('6')">6</button>
            <button onclick="appendOperator('*')">×</button>

            <button onclick="appendToDisplay('1')">1</button>
            <button onclick="appendToDisplay('2')">2</button>
            <button onclick="appendToDisplay('3')">3</button>
            <button onclick="appendOperator('-')">−</button>

            <button onclick="appendToDisplay('0')">0</button>
            <button onclick="appendToDisplay('.')">.</button>
            <button onclick="calculate()">=</button>
            <button onclick="appendOperator('+')">+</button>

            <button onclick="appendToDisplay('Math.sqrt(')">√</button>
            <button onclick="appendToDisplay('Math.sin(')">sin</button>
            <button onclick="appendToDisplay('Math.cos(')">cos</button>
            <button onclick="appendToDisplay('Math.PI')">π</button>
        </div>
    </div>
    <script>
        let autoCalculate = false;
        let roundDecimal = false;

        function appendToDisplay(value) {
            let display = document.getElementById("display");
            display.value += value;
            if (autoCalculate && !isLastInputOperator()) calculate();
        }

        function appendOperator(value) {
            let display = document.getElementById("display");
            if (display.value !== "" && !isLastInputOperator()) {
                display.value += value;
                if (autoCalculate) calculate();
            }
        }

        function clearDisplay() {
            document.getElementById("display").value = "";
        }

        function deleteLast() {
            let display = document.getElementById("display");
            display.value = display.value.slice(0, -1);
        }

        function calculate() {
            let display = document.getElementById("display");
            try {
                if (isLastInputOperator()) return;
                let result = eval(display.value);
                display.value = roundDecimal ? parseFloat(result.toFixed(5)) : result;
            } catch {
                display.value = "Error";
            }
        }

        function isLastInputOperator() {
            let display = document.getElementById("display").value;
            return /[+\-*/]$/.test(display);
        }

        function toggleSettings() {
            let menu = document.getElementById("settings-menu");
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        }

        function toggleTheme() {
            document.body.classList.toggle("dark-mode");
        }

        function toggleAutoCalculate() {
            autoCalculate = !autoCalculate;
            alert("Perhitungan otomatis " + (autoCalculate ? "diaktifkan" : "dinonaktifkan"));
        }

        function toggleDecimal() {
            roundDecimal = !roundDecimal;
            alert("Pembulatan desimal " + (roundDecimal ? "diaktifkan" : "dinonaktifkan"));
        }
    </script>
</body>
  </html>
