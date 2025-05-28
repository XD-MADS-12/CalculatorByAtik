// Core display & calculation logic const display = document.getElementById("display"); let mode = "COMP";

function appendValue(value) { display.value += value; }

function clearDisplay() { display.value = ""; }

function deleteLast() { display.value = display.value.slice(0, -1); }

function calculateResult() { try { display.value = eval(display.value.replace(/×/g, '*').replace(/÷/g, '/')); } catch { display.value = "Error"; } }

function toggleTheme() { document.body.classList.toggle("dark"); const icon = document.getElementById("themeIcon"); icon.classList.toggle("fa-sun"); icon.classList.toggle("fa-moon"); }

// Mode handling function openModeMenu() { document.getElementById("modeModal").classList.remove("hidden"); }

function closeModeMenu() { document.getElementById("modeModal").classList.add("hidden"); }

function changeMode(selectedMode) { mode = selectedMode; document.getElementById("modeDisplay").innerText = selectedMode; closeModeMenu(); display.value = ""; if (mode === "MATRIX") display.value = "Enter as [[1,2],[3,4]]"; if (mode === "VECTOR") display.value = "Enter as [1,2,3]"; if (mode === "EQN") display.value = "e.g. x^2+2x+1=0"; }

// Memory, constants, etc. let memory = 0; function storeValue() { memory = parseFloat(display.value) || 0; }

function recallValue() { display.value += memory; }

function insertConstant(name) { const constants = { π: Math.PI, e: Math.E, g: 9.80665, c: 299792458, Na: 6.022e23 }; if (constants[name]) { display.value += constants[name]; } }

function convertValue(type) { if (type === "DegToRad") { display.value = (parseFloat(display.value) * Math.PI / 180).toFixed(5); } else if (type === "RadToDeg") { display.value = (parseFloat(display.value) * 180 / Math.PI).toFixed(5); } }

function limitApproach(expr, variable, target) { try { let val = expr.replaceAll(variable, (${target})); display.value = eval(val); } catch { display.value = "Limit Error"; } }

function solveEquation(eqn) { try { const [lhs, rhs] = eqn.split("="); const expr = ${lhs}-(${rhs}); let roots = math.solve(expr, 'x'); display.value = JSON.stringify(roots); } catch { display.value = "Eqn Error"; } }

function matrixOperation(input) { try { let matrix = JSON.parse(input); display.value = JSON.stringify(math.inv(matrix)); } catch { display.value = "Matrix Error"; } }

function vectorOperation(input) { try { let vector = JSON.parse(input); let mag = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0)); display.value = mag.toFixed(4); } catch { display.value = "Vector Error"; } }

// Button click handler const buttons = document.querySelectorAll(".btn"); buttons.forEach(btn => { btn.addEventListener("click", () => { const text = btn.innerText; switch (text) { case "AC": clearDisplay(); break; case "DEL": deleteLast(); break; case "=": calculateResult(); break; case "π": case "e": case "g": case "c": case "Na": insertConstant(text); break; case "STO": storeValue(); break; case "RCL": recallValue(); break; case "Ans": display.value += display.value; break; case "Deg→Rad": convertValue("DegToRad"); break; case "Rad→Deg": convertValue("RadToDeg"); break; case "Matrix": matrixOperation(display.value); break; case "Vector": vectorOperation(display.value); break; case "Solve": solveEquation(display.value); break; case "Limit": limitApproach(prompt("Expression in x:"), "x", prompt("x approaches:")); break; default: if (!isNaN(text) || /^[a-zA-Z()+-*/^.,]+$/.test(text)) { appendValue(text); } } }); });
