import type { CategoryQuestion } from "../DATA/categoriesAgrupment";

export const geometria: CategoryQuestion[] = [
  // Lados
  { text: "Triángulo → lados", answer: "3" },
  { text: "Cuadrilátero → lados", answer: "4" },
  { text: "Pentágono → lados", answer: "5" },
  { text: "Hexágono → lados", answer: "6" },
  { text: "Heptágono → lados", answer: "7" },
  { text: "Octágono → lados", answer: "8" },
  { text: "Eneágono → lados", answer: "9" },
  { text: "Decágono → lados", answer: "10" },
  { text: "Endecágono → lados", answer: "11" },
  { text: "Dodecágono → lados", answer: "12" },
  { text: "Pentadecágono → lados", answer: "15" },
  { text: "Icosaedro → caras", answer: "20" },

  // Figura
  { text: "3 lados → figura", answer: "triángulo" },
  { text: "4 lados → figura", answer: "cuadrilátero" },
  { text: "5 lados → figura", answer: "pentágono" },
  { text: "6 lados → figura", answer: "hexágono" },
  { text: "7 lados → figura", answer: "heptágono" },
  { text: "8 lados → figura", answer: "octágono" },
  { text: "9 lados → figura", answer: "eneágono" },
  { text: "10 lados → figura", answer: "decágono" },
  { text: "12 lados → figura", answer: "dodecágono" },
  { text: "20 lados → figura", answer: "icoságono" },

  // Ángulos
  { text: "Angulo Recto → °", answer: "90" },
  { text: "Angulo Llano → °", answer: "180" },
  { text: "Angulo Completo → °", answer: "360" },
  { text: "Angulo Agudo → máximo", answer: "89" },
  { text: "Angulo Obtuso → mínimo", answer: "91" },

  { text: "90° → ángulo", answer: "recto" },
  { text: "180° → ángulo", answer: "llano" },
  { text: "360° → ángulo", answer: "completo" },
  { text: "<90° → ángulo", answer: "agudo" },
  { text: ">90° → ángulo", answer: "obtuso" },

  // Triángulos
  { text: "Triangulo 3 lados iguales", answer: "equilátero" },
  { text: "Triangulo 2 lados iguales", answer: "isósceles" },
  { text: "Triangulo lados distintos", answer: "escaleno" },
  { text: "Triangulo 1 ángulo recto", answer: "rectángulo" },

  { text: "Equilátero → lados iguales", answer: "3" },
  { text: "Isósceles → lados iguales", answer: "2" },
  { text: "Escaleno → lados iguales", answer: "0" },

  // Cuadriláteros
  { text: "4 lados iguales", answer: "rombo" },
  { text: "4 ángulos rectos", answer: "rectángulo" },
  { text: "Iguales + rectos", answer: "cuadrado" },
  { text: "1 par paralelo", answer: "trapecio" },

  { text: "Circunferencia → °", answer: "360" },

  // Cubo
  { text: "Cubo → caras", answer: "6" },
  { text: "Cubo → aristas", answer: "12" },
  { text: "Cubo → vértices", answer: "8" },


  // Octaedro
  { text: "Octaedro → caras", answer: "8" },
  { text: "Octaedro → aristas", answer: "12" },
  { text: "Octaedro → vértices", answer: "6" },

  // Dodecaedro
  { text: "Dodecaedro → caras", answer: "12" },
  { text: "Dodecaedro → vértices", answer: "20" },

  // Icosaedro
  { text: "Icosaedro → caras", answer: "20" },
  { text: "Icosaedro → vértices", answer: "12" },

  // Vértices
  { text: "Triángulo → vértices", answer: "3" },
  { text: "Cuadrado → vértices", answer: "4" },
  { text: "Pentágono → vértices", answer: "5" },
  { text: "Hexágono → vértices", answer: "6" },
  { text: "Octágono → vértices", answer: "8" },
  { text: "Decágono → vértices", answer: "10" },

  // Diagonales
  { text: "Cuadrado → diagonales", answer: "2" },
  { text: "Rectángulo → diagonales", answer: "2" },
  { text: "Pentágono → diagonales", answer: "5" },
  { text: "Hexágono → diagonales", answer: "9" },

  // Simetría
  { text: "Cuadrado → ejes", answer: "4" },
  { text: "Rectángulo → ejes", answer: "2" },
  { text: "Rombo → ejes", answer: "2" },
  { text: "Círculo → ejes", answer: "infinitos" },
  { text: "Triángulo equilátero → ejes", answer: "3" },
  { text: "Triángulo isósceles → ejes", answer: "1" },


  // Pi
  { text: "π ≈", answer: "3.14" },

  // Suma de ángulos
  { text: "Triángulo → ° suma", answer: "180" },
  { text: "Cuadrilátero → ° suma", answer: "360" },
  { text: "Pentágono → ° suma", answer: "540" },
  { text: "Hexágono → °suma", answer: "720" },
  { text: "Heptágono → ° suma", answer: "900" },
  { text: "Octágono → ° suma", answer: "1080" },
  { text: "Decágono → ° suma", answer: "1440" },

  // Figuras
  { text: "3 lados", answer: "triángulo" },
  { text: "4 lados iguales", answer: "cuadrado" },
  { text: "4 rectos", answer: "rectángulo" },
  { text: "Sin lados", answer: "círculo" },

  // Extras
  // Vueltas ↔ grados
{ text: "1 vuelta → grados", answer: "360" },
{ text: "2 vueltas → grados", answer: "720" },
{ text: "3 vueltas → grados", answer: "1080" },
{ text: "½ vuelta → grados", answer: "180" },
{ text: "¼ vuelta → grados", answer: "90" },
{ text: "¾ vuelta → grados", answer: "270" },
{ text: "⅛ vuelta → grados", answer: "45" },
{ text: "⅙ vuelta → grados", answer: "60" },
{ text: "⅓ vuelta → grados", answer: "120" },

{ text: "90° → vuelta", answer: "0.25" },
{ text: "180° → vuelta", answer: "0.5" },
{ text: "270° → vuelta", answer: "0.75" },
{ text: "360° → vuelta", answer: "1" },
{ text: "720° → vuelta", answer: "2" },

// Grados ↔ minutos
{ text: "1° → minutos", answer: "60" },
{ text: "2° → minutos", answer: "120" },
{ text: "5° → minutos", answer: "300" },
{ text: "10° → minutos", answer: "600" },
{ text: "15° → minutos", answer: "900" },
{ text: "30° → minutos", answer: "1800" },
{ text: "45° → minutos", answer: "2700" },
{ text: "90° → minutos", answer: "5400" },
{ text: "180° → minutos", answer: "10800" },
{ text: "360° → minutos", answer: "21600" },

{ text: "60' → grados", answer: "1" },
{ text: "120' → grados", answer: "2" },
{ text: "300' → grados", answer: "5" },
{ text: "600' → grados", answer: "10" },
{ text: "1800' → grados", answer: "30" },
{ text: "3600' → grados", answer: "60" },

// Minutos ↔ segundos
{ text: "1' → segundos", answer: "60" },
{ text: "2' → segundos", answer: "120" },
{ text: "5' → segundos", answer: "300" },
{ text: "10' → segundos", answer: "600" },
{ text: "30' → segundos", answer: "1800" },
{ text: "60' → segundos", answer: "3600" },

{ text: "60'' → minutos", answer: "1" },
{ text: "120'' → minutos", answer: "2" },
{ text: "300'' → minutos", answer: "5" },
{ text: "600'' → minutos", answer: "10" },

// Grados ↔ segundos
{ text: "1° → segundos", answer: "3600" },
{ text: "2° → segundos", answer: "7200" },
{ text: "5° → segundos", answer: "18000" },
{ text: "10° → segundos", answer: "36000" },

{ text: "3600'' → grados", answer: "1" },
{ text: "7200'' → grados", answer: "2" },
{ text: "18000'' → grados", answer: "5" },
{ text: "36000'' → grados", answer: "10" },

];