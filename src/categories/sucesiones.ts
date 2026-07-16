import type { CategoryQuestion } from "../DATA/categoriesAgrupment";

export const sucesiones: CategoryQuestion[] = [
  // Naturales
  { text: "1,2,3,4,?", answer: "5" },
  { text: "8,9,10,11,?", answer: "12" },
  { text: "25,26,27,28,?", answer: "29" },
  { text: "99,100,101,102,?", answer: "103" },

  // Pares
  { text: "2,4,6,8,?", answer: "10" },
  { text: "12,14,16,18,?", answer: "20" },
  { text: "20,22,24,26,?", answer: "28" },
  { text: "50,52,54,56,?", answer: "58" },

  // Impares
  { text: "1,3,5,7,?", answer: "9" },
  { text: "11,13,15,17,?", answer: "19" },
  { text: "21,23,25,27,?", answer: "29" },
  { text: "51,53,55,57,?", answer: "59" },

  // Múltiplos de 3
  { text: "3,6,9,12,?", answer: "15" },
  { text: "15,18,21,24,?", answer: "27" },
  { text: "30,33,36,39,?", answer: "42" },

  // Múltiplos de 5
  { text: "5,10,15,20,?", answer: "25" },
  { text: "25,30,35,40,?", answer: "45" },
  { text: "50,55,60,65,?", answer: "70" },

  // Potencias de 2
  { text: "2,4,8,16,?", answer: "32" },
  { text: "4,8,16,32,?", answer: "64" },
  { text: "8,16,32,64,?", answer: "128" },

  // Potencias de 3
  { text: "3,9,27,81,?", answer: "243" },
  { text: "1,3,9,27,?", answer: "81" },

  // Cuadrados
  { text: "1,4,9,16,?", answer: "25" },
  { text: "9,16,25,36,?", answer: "49" },
  { text: "25,36,49,64,?", answer: "81" },
  { text: "64,81,100,121,?", answer: "144" },

  // Cubos
  { text: "1,8,27,64,?", answer: "125" },
  { text: "8,27,64,125,?", answer: "216" },

  // Fibonacci
  { text: "1,1,2,3,5,?", answer: "8" },
  { text: "2,3,5,8,13,?", answer: "21" },
  { text: "5,8,13,21,?", answer: "34" },
  { text: "13,21,34,55,?", answer: "89" },
  { text: "34,55,89,144,?", answer: "233" },

  // Primos
  { text: "2,3,5,7,?", answer: "11" },
  { text: "5,7,11,13,?", answer: "17" },
  { text: "11,13,17,19,?", answer: "23" },
  { text: "17,19,23,29,?", answer: "31" },
  { text: "29,31,37,41,?", answer: "43" },
  { text: "41,43,47,53,?", answer: "59" },
  { text: "53,59,61,67,?", answer: "71" },
  { text: "71,73,79,83,?", answer: "89" },

  // Descendentes
  { text: "10,9,8,7,?", answer: "6" },
  { text: "20,18,16,14,?", answer: "12" },
  { text: "100,90,80,70,?", answer: "60" },

  // +10
  { text: "10,20,30,40,?", answer: "50" },
  { text: "30,40,50,60,?", answer: "70" },
  { text: "70,80,90,100,?", answer: "110" },

  // ×2
  { text: "1,2,4,8,?", answer: "16" },
  { text: "3,6,12,24,?", answer: "48" },
  { text: "5,10,20,40,?", answer: "80" },

  // ×3
  { text: "1,3,9,27,?", answer: "81" },
  { text: "2,6,18,54,?", answer: "162" },
  { text: "4,12,36,108,?", answer: "324" },

  // Alternadas
  { text: "1,2,1,2,?", answer: "1" },
  { text: "5,10,5,10,?", answer: "5" },
  { text: "2,4,2,4,?", answer: "2" },

  // Sumas crecientes
  { text: "1,2,4,7,?", answer: "11" },
  { text: "2,4,7,11,?", answer: "16" },
  { text: "3,6,10,15,?", answer: "21" },

  // Triangulares
  { text: "1,3,6,10,?", answer: "15" },
  { text: "3,6,10,15,?", answer: "21" },
  { text: "6,10,15,21,?", answer: "28" },

  // Restando
  { text: "100,95,90,85,?", answer: "80" },
  { text: "50,45,40,35,?", answer: "30" },
  { text: "30,27,24,21,?", answer: "18" },

  // Mixtas fáciles
  { text: "1,4,7,10,?", answer: "13" },
  { text: "2,6,10,14,?", answer: "18" },
  { text: "5,15,25,35,?", answer: "45" },
  { text: "100,80,60,40,?", answer: "20" },
  { text: "81,27,9,3,?", answer: "1" },
  // Días de la semana
{ text: "Lunes,Martes,?", answer: "miércoles" },
{ text: "Martes,Miércoles,?", answer: "jueves" },
{ text: "Miércoles,Jueves,?", answer: "viernes" },
{ text: "Jueves,Viernes,?", answer: "sábado" },
{ text: "Viernes,Sábado,?", answer: "domingo" },
{ text: "Sábado,Domingo,?", answer: "lunes" },
{ text: "Domingo,Lunes,?", answer: "martes" },

{ text: "Lunes,Miércoles,Viernes,?", answer: "domingo" },
{ text: "Martes,Jueves,Sábado,?", answer: "lunes" },
{ text: "Domingo,Viernes,Miércoles,?", answer: "lunes" },

// Meses
{ text: "Enero,Febrero,?", answer: "marzo" },
{ text: "Febrero,Marzo,?", answer: "abril" },
{ text: "Marzo,Abril,?", answer: "mayo" },
{ text: "Abril,Mayo,?", answer: "junio" },
{ text: "Mayo,Junio,?", answer: "julio" },
{ text: "Junio,Julio,?", answer: "agosto" },
{ text: "Julio,Agosto,?", answer: "septiembre" },
{ text: "Agosto,Septiembre,?", answer: "octubre" },
{ text: "Septiembre,Octubre,?", answer: "noviembre" },
{ text: "Octubre,Noviembre,?", answer: "diciembre" },
{ text: "Noviembre,Diciembre,?", answer: "enero" },

{ text: "Enero,Abril,Julio,?", answer: "octubre" },
{ text: "Febrero,Mayo,Agosto,?", answer: "noviembre" },
{ text: "Marzo,Junio,Septiembre,?", answer: "diciembre" },

// Letras
{ text: "A,B,C,?", answer: "D" },
{ text: "C,D,E,?", answer: "F" },
{ text: "M,N,O,?", answer: "P" },
{ text: "X,Y,?", answer: "Z" },

{ text: "A,C,E,?", answer: "G" },
{ text: "B,D,F,?", answer: "H" },
{ text: "C,E,G,?", answer: "I" },
{ text: "D,F,H,?", answer: "J" },

{ text: "Z,Y,X,?", answer: "W" },
{ text: "W,V,U,?", answer: "T" },
{ text: "M,L,K,?", answer: "J" },

// Vocales
{ text: "A,E,I,?", answer: "O" },
{ text: "E,I,O,?", answer: "U" },
{ text: "A,E,I,O,?", answer: "U" },
{ text: "U,O,I,?", answer: "E" },

// Números escritos
{ text: "Uno,Dos,Tres,?", answer: "Cuatro" },
{ text: "Cinco,Seis,Siete,?", answer: "Ocho" },
{ text: "Ocho,Nueve,Diez,?", answer: "Once" },


// Puntos cardinales
{ text: "Norte,Este,Sur,?", answer: "Oeste" },
{ text: "Norte,Oeste,Sur,?", answer: "Este" },
{ text: "Norte,Sur,?", answer: "Norte" },
{ text: "Este,Oeste,?", answer: "Este" },

// Estaciones
{ text: "Primavera,Verano,?", answer: "Otoño" },
{ text: "Verano,Otoño,?", answer: "Invierno" },
{ text: "Otoño,Invierno,?", answer: "Primavera" },
{ text: "Invierno,Primavera,?", answer: "Verano" },

// Tamaños
{ text: "Pequeño,Mediano,?", answer: "Grande" },
{ text: "Chico,Mediano,?", answer: "Grande" },

// Edades
{ text: "Bebé,Niño,?", answer: "Adolescente" },
{ text: "Niño,Adolescente,?", answer: "Adulto" },
{ text: "Adolescente,Adulto,?", answer: "Anciano" },

// Comidas del día
{ text: "Desayuno,Almuerzo,?", answer: "Cena" },


// Notas musicales
{ text: "Do,Re,Mi,?", answer: "Fa" },
{ text: "Re,Mi,Fa,?", answer: "Sol" },
{ text: "Mi,Fa,Sol,?", answer: "La" },
{ text: "Fa,Sol,La,?", answer: "Si" },
{ text: "Sol,La,Si,?", answer: "Do" },

// Números romanos
{ text: "I,V,X,?", answer: "L" },
{ text: "V,X,L,?", answer: "C" },
{ text: "X,L,C,?", answer: "D" },
{ text: "L,C,D,?", answer: "M" }
];