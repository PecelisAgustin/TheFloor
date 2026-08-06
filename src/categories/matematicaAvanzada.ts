import type { CategoryQuestion } from "../DATA/categoriesAgrupment";

export const advancedMathQuestions: CategoryQuestion[] = [
  // Derivadas — potencias simples
  { text: "d/dx(x²)", answer: "2x" },
  { text: "d/dx(x³)", answer: "3x²" },
  { text: "d/dx(x⁴)", answer: "4x³" },
  { text: "d/dx(x⁵)", answer: "5x⁴" },
  { text: "d/dx(x⁶)", answer: "6x⁵" },
  { text: "d/dx(x⁷)", answer: "7x⁶" },
  { text: "d/dx(x)", answer: "1" },
  { text: "d/dx(7)", answer: "0" },
  { text: "d/dx(3x)", answer: "3" },
  { text: "d/dx(9x)", answer: "9" },

  // Derivadas — potencias con coeficiente
  { text: "d/dx(2x²)", answer: "4x" },
  { text: "d/dx(5x²)", answer: "10x" },
  { text: "d/dx(3x³)", answer: "9x²" },
  { text: "d/dx(4x³)", answer: "12x²" },
  { text: "d/dx(6x⁴)", answer: "24x³" },
  { text: "d/dx(-x²)", answer: "-2x" },
  { text: "d/dx(-3x³)", answer: "-9x²" },

  // Derivadas — sumas y restas de términos
  { text: "d/dx(x² + 3x)", answer: "2x + 3" },
  { text: "d/dx(x³ - 5x)", answer: "3x² - 5" },
  { text: "d/dx(2x² + 4x + 1)", answer: "4x + 4" },
  { text: "d/dx(5x² - 3x + 2)", answer: "10x - 3" },
  { text: "d/dx(x⁴ - 2x²)", answer: "4x³ - 4x" },

  // Derivadas — potencias negativas y racionales
  { text: "d/dx(x³/3)", answer: "x²" },
  { text: "d/dx(x⁴/4)", answer: "x³" },
  { text: "d/dx(1/x)", answer: "-1/x²" },
  { text: "d/dx(2/x)", answer: "-2/x²" },
  { text: "d/dx(1/x²)", answer: "-2/x³" },
  { text: "d/dx(√x)", answer: "1/(2√x)" },

  // Derivadas — trigonométricas
  { text: "d/dx(sen x)", answer: "cos x" },
  { text: "d/dx(cos x)", answer: "-sen x" },
  { text: "d/dx(tan x)", answer: "sec²x" },
  { text: "d/dx(cot x)", answer: "-csc²x" },
  { text: "d/dx(sec x)", answer: "sec x · tan x" },
  { text: "d/dx(csc x)", answer: "-csc x · cot x" },
  { text: "d/dx(3 sen x)", answer: "3cos x" },
  { text: "d/dx(4 cos x)", answer: "-4sen x" },
  { text: "d/dx(sen x + cos x)", answer: "cos x - sen x" },

  // Derivadas — exponencial y logaritmo
  { text: "d/dx(eˣ)", answer: "eˣ" },
  { text: "d/dx(2eˣ)", answer: "2eˣ" },
  { text: "d/dx(ln x)", answer: "1/x" },
  { text: "d/dx(3 ln x)", answer: "3/x" },

  // Derivadas — regla de la cadena simple
  { text: "d/dx(sen 2x)", answer: "2cos 2x" },
  { text: "d/dx(cos 3x)", answer: "-3sen 3x" },
  { text: "d/dx(e^(2x))", answer: "2e^(2x)" },
  { text: "d/dx(e^(3x))", answer: "3e^(3x)" },
  { text: "d/dx(ln 2x)", answer: "1/x" },
  { text: "d/dx(ln x²)", answer: "2/x" },
  { text: "d/dx((x+1)²)", answer: "2x + 2" },
  { text: "d/dx((2x+1)²)", answer: "8x + 4" },
  { text: "d/dx((x-3)³)", answer: "3(x-3)²" },
  { text: "d/dx(√(2x))", answer: "1/√(2x)" },

  // Derivadas evaluadas en un punto
  { text: "d/dx(x²) en x=3", answer: "6" },
  { text: "d/dx(x³) en x=2", answer: "12" },
  { text: "d/dx(x⁴) en x=1", answer: "4" },
  { text: "d/dx(x²) en x=5", answer: "10" },
  { text: "d/dx(x⁵) en x=1", answer: "5" },
  { text: "d/dx(2x³) en x=2", answer: "24" },
  { text: "d/dx(sen x) en x=0", answer: "1" },
  { text: "d/dx(cos x) en x=0", answer: "0" },
  { text: "d/dx(eˣ) en x=0", answer: "1" },
  { text: "d/dx(ln x) en x=1", answer: "1" },

  // Integrales indefinidas — potencias
  { text: "∫x dx", answer: "x²/2 + C" },
  { text: "∫x² dx", answer: "x³/3 + C" },
  { text: "∫x³ dx", answer: "x⁴/4 + C" },
  { text: "∫x⁴ dx", answer: "x⁵/5 + C" },
  { text: "∫1 dx", answer: "x + C" },
  { text: "∫5 dx", answer: "5x + C" },
  { text: "∫2x dx", answer: "x² + C" },
  { text: "∫3x² dx", answer: "x³ + C" },
  { text: "∫4x³ dx", answer: "x⁴ + C" },
  { text: "∫6x dx", answer: "3x² + C" },
  { text: "∫(2x + 3) dx", answer: "x² + 3x + C" },
  { text: "∫x⁻² dx", answer: "-1/x + C" },
  { text: "∫√x dx", answer: "(2/3)x^(3/2) + C" },

  // Integrales indefinidas — trigonométricas y exponenciales
  { text: "∫eˣ dx", answer: "eˣ + C" },
  { text: "∫2eˣ dx", answer: "2eˣ + C" },
  { text: "∫(1/x) dx", answer: "ln|x| + C" },
  { text: "∫cos x dx", answer: "sen x + C" },
  { text: "∫sen x dx", answer: "-cos x + C" },
  { text: "∫sec²x dx", answer: "tan x + C" },
  { text: "∫3cos x dx", answer: "3sen x + C" },

  // Integrales definidas
  { text: "∫₀¹ x dx", answer: "1/2" },
  { text: "∫₀² x dx", answer: "2" },
  { text: "∫₀¹ x² dx", answer: "1/3" },
  { text: "∫₀² x² dx", answer: "8/3" },
  { text: "∫₀¹ 2x dx", answer: "1" },
  { text: "∫₀² 3 dx", answer: "6" },
  { text: "∫₀¹ 3x² dx", answer: "1" },
  { text: "∫₀¹ 4x³ dx", answer: "1" },
  { text: "∫₁² (1/x) dx", answer: "ln 2" },
  { text: "∫₀^π sen x dx", answer: "2" },
  { text: "∫₀^(π/2) cos x dx", answer: "1" },
  { text: "∫₀¹ eˣ dx", answer: "e - 1" },
  { text: "∫₀³ 1 dx", answer: "3" },
  { text: "∫₁³ 2 dx", answer: "4" },
  { text: "∫₀¹ (2x + 1) dx", answer: "2" },

  // Logaritmos — base 10
  { text: "log₁₀(10)", answer: "1" },
  { text: "log₁₀(100)", answer: "2" },
  { text: "log₁₀(1000)", answer: "3" },
  { text: "log₁₀(10000)", answer: "4" },
  { text: "log₁₀(1)", answer: "0" },
  { text: "log₁₀(0.1)", answer: "-1" },
  { text: "log₁₀(0.01)", answer: "-2" },

  // Logaritmos — base 2
  { text: "log₂(2)", answer: "1" },
  { text: "log₂(4)", answer: "2" },
  { text: "log₂(8)", answer: "3" },
  { text: "log₂(16)", answer: "4" },
  { text: "log₂(32)", answer: "5" },
  { text: "log₂(64)", answer: "6" },
  { text: "log₂(128)", answer: "7" },
  { text: "log₂(1)", answer: "0" },
  { text: "log₂(1/2)", answer: "-1" },
  { text: "log₂(1/4)", answer: "-2" },

  // Logaritmos — otras bases
  { text: "log₃(9)", answer: "2" },
  { text: "log₃(27)", answer: "3" },
  { text: "log₃(81)", answer: "4" },
  { text: "log₄(16)", answer: "2" },
  { text: "log₄(64)", answer: "3" },
  { text: "log₅(25)", answer: "2" },
  { text: "log₅(125)", answer: "3" },
  { text: "log₆(36)", answer: "2" },
  { text: "log₇(49)", answer: "2" },
  { text: "log₉(81)", answer: "2" },

  // Logaritmo natural
  { text: "ln(e)", answer: "1" },
  { text: "ln(1)", answer: "0" },
  { text: "ln(e²)", answer: "2" },
  { text: "ln(e³)", answer: "3" },
  { text: "ln(e⁵)", answer: "5" },
  { text: "e^(ln 5)", answer: "5" },

  // Propiedades de logaritmos
  { text: "log₁₀2 + log₁₀5", answer: "1" },
  { text: "log₁₀100 - log₁₀10", answer: "1" },
  { text: "log₂8 + log₂4", answer: "5" },
  { text: "2 · log₁₀10", answer: "2" },
  { text: "log₁₀(10³)", answer: "3" },
  { text: "ln(eˣ)", answer: "x" },
  { text: "log₁₀(10ˣ)", answer: "x" },
];
