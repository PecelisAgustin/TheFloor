import type { CategoryQuestion } from "../DATA/categoriesAgrupment";

export const equivalencias: CategoryQuestion[] = [
  // Tiempo
  { text: "1 minuto → segundos", answer: "60" },
  { text: "2 minutos → segundos", answer: "120" },
  { text: "5 minutos → segundos", answer: "300" },
  { text: "10 minutos → segundos", answer: "600" },
  { text: "15 minutos → segundos", answer: "900" },
  { text: "30 minutos → segundos", answer: "1800" },

  { text: "1 hora → minutos", answer: "60" },
  { text: "2 horas → minutos", answer: "120" },
  { text: "3 horas → minutos", answer: "180" },
  { text: "6 horas → minutos", answer: "360" },
  { text: "12 horas → minutos", answer: "720" },
  { text: "24 horas → minutos", answer: "1440" },

  { text: "1 hora → segundos", answer: "3600" },
  { text: "2 horas → segundos", answer: "7200" },
  { text: "12 horas → segundos", answer: "43200" },
  { text: "24 horas → segundos", answer: "86400" },

  { text: "1 día → horas", answer: "24" },
  { text: "2 días → horas", answer: "48" },
  { text: "3 días → horas", answer: "72" },
  { text: "7 días → horas", answer: "168" },
  { text: "14 días → horas", answer: "336" },
  { text: "30 días → horas", answer: "720" },

  { text: "1 semana → días", answer: "7" },
  { text: "2 semanas → días", answer: "14" },
  { text: "4 semanas → días", answer: "28" },
  { text: "1 año → meses", answer: "12" },
  { text: "1 década → años", answer: "10" },
  { text: "1 siglo → años", answer: "100" },
  { text: "1 milenio → años", answer: "1000" },

  // Longitud
  { text: "1 km → metros", answer: "1000" },
  { text: "2 km → metros", answer: "2000" },
  { text: "5 km → metros", answer: "5000" },
  { text: "10 km → metros", answer: "10000" },
  { text: "50 km → metros", answer: "50000" },
  { text: "100 km → metros", answer: "100000" },

  { text: "1 metro → centímetros", answer: "100" },
  { text: "2 metros → centímetros", answer: "200" },
  { text: "5 metros → centímetros", answer: "500" },
  { text: "10 metros → centímetros", answer: "1000" },

  { text: "1 metro → milímetros", answer: "1000" },
  { text: "2 metros → milímetros", answer: "2000" },
  { text: "5 metros → milímetros", answer: "5000" },

  { text: "1 cm → mm", answer: "10" },
  { text: "5 cm → mm", answer: "50" },
  { text: "10 cm → mm", answer: "100" },

  // Masa
  { text: "1 kg → gramos", answer: "1000" },
  { text: "2 kg → gramos", answer: "2000" },
  { text: "5 kg → gramos", answer: "5000" },
  { text: "10 kg → gramos", answer: "10000" },
  { text: "50 kg → gramos", answer: "50000" },
  { text: "100 kg → gramos", answer: "100000" },

  { text: "1 tonelada → kg", answer: "1000" },
  { text: "2 toneladas → kg", answer: "2000" },
  { text: "5 toneladas → kg", answer: "5000" },

  // Volumen
  { text: "1 litro → ml", answer: "1000" },
  { text: "2 litros → ml", answer: "2000" },
  { text: "5 litros → ml", answer: "5000" },
  { text: "10 litros → ml", answer: "10000" },

  { text: "1/2 litro → ml", answer: "500" },
  { text: "1/4 litro → ml", answer: "250" },
  { text: "3/4 litro → ml", answer: "750" },

  // Memoria
  { text: "1 KB → bytes", answer: "1024" },
  { text: "1 MB → KB", answer: "1024" },
  { text: "1 GB → MB", answer: "1024" },
  { text: "1 TB → GB", answer: "1024" },

  // Moneda
  { text: "1 dólar → centavos", answer: "100" },
  { text: "1 euro → centavos", answer: "100" },
  { text: "1 peso → centavos", answer: "100" },

  // Docenas
  { text: "1 docena → unidades", answer: "12" },
  { text: "2 docenas → unidades", answer: "24" },
  { text: "3 docenas → unidades", answer: "36" },
  { text: "6 docenas → unidades", answer: "72" },
  { text: "12 docenas → unidades", answer: "144" },

  // Temperatura
  { text: "0 °C → K(aprox)", answer: "273.15" },
  { text: "100 °C → K(aprox)", answer: "373.15" },

  // Distancias imperiales
  { text: "1 pulgada → cm(aprox)", answer: "2.54" },
  { text: "1 pie → cm(aprox)", answer: "30.48" },
  { text: "1 yarda → metros(aprox)", answer: "0.9144" },
  { text: "1 milla → km(aprox)", answer: "1.609" },

  // Extras
  { text: "1 semestre → meses", answer: "6" },
  { text: "1 trimestre → meses", answer: "3" },
  { text: "1 lustro → años", answer: "5" },
  { text: "1 quincena → días", answer: "15" },
  { text: "1 bimestre → meses", answer: "2" },
  { text: "1 década → meses", answer: "120" },
  { text: "1 siglo → décadas", answer: "10" },
  { text: "1 año → semanas (aprox.)", answer: "52" },
    // Tiempo
  { text: "45 minutos → segundos", answer: "2700" },
  { text: "90 minutos → horas", answer: "1.5" },
  { text: "120 minutos → horas", answer: "2" },
  { text: "180 minutos → horas", answer: "3" },
  { text: "240 minutos → horas", answer: "4" },
  { text: "48 horas → días", answer: "2" },
  { text: "72 horas → días", answer: "3" },
  { text: "96 horas → días", answer: "4" },
  { text: "168 horas → semanas", answer: "1" },
  { text: "365 días → años", answer: "1" },
  { text: "730 días → años", answer: "2" },
  { text: "24 meses → años", answer: "2" },
  { text: "36 meses → años", answer: "3" },
  { text: "60 meses → años", answer: "5" },
  { text: "120 meses → años", answer: "10" },

  // Longitud
  { text: "250 cm → metros", answer: "2.5" },
  { text: "500 cm → metros", answer: "5" },
  { text: "750 cm → metros", answer: "7.5" },
  { text: "1000 cm → metros", answer: "10" },
  { text: "2500 metros → km", answer: "2.5" },
  { text: "5000 metros → km", answer: "5" },
  { text: "7500 metros → km", answer: "7.5" },
  { text: "10000 metros → km", answer: "10" },
  { text: "100 mm → cm", answer: "10" },
  { text: "250 mm → cm", answer: "25" },
  { text: "500 mm → cm", answer: "50" },
  { text: "1000 mm → metros", answer: "1" },

  // Masa
  { text: "250 gramos → kg", answer: "0.25" },
  { text: "500 gramos → kg", answer: "0.5" },
  { text: "750 gramos → kg", answer: "0.75" },
  { text: "1500 gramos → kg", answer: "1.5" },
  { text: "2500 gramos → kg", answer: "2.5" },
  { text: "5000 gramos → kg", answer: "5" },
  { text: "10000 gramos → kg", answer: "10" },
  { text: "500 kg → toneladas", answer: "0.5" },
  { text: "1500 kg → toneladas", answer: "1.5" },

  // Volumen
  { text: "250 ml → litros", answer: "0.25" },
  { text: "500 ml → litros", answer: "0.5" },
  { text: "750 ml → litros", answer: "0.75" },
  { text: "1500 ml → litros", answer: "1.5" },
  { text: "2000 ml → litros", answer: "2" },
  { text: "2500 ml → litros", answer: "2.5" },
  { text: "5000 ml → litros", answer: "5" },
  { text: "10000 ml → litros", answer: "10" },

  // Memoria
  { text: "2 KB → bytes", answer: "2048" },
  { text: "4 KB → bytes", answer: "4096" },
  { text: "8 KB → bytes", answer: "8192" },
  { text: "16 KB → bytes", answer: "16384" },
  { text: "2 MB → KB", answer: "2048" },
  { text: "4 MB → KB", answer: "4096" },
  { text: "8 MB → KB", answer: "8192" },
  { text: "2 GB → MB", answer: "2048" },
  { text: "4 GB → MB", answer: "4096" },
  { text: "8 GB → MB", answer: "8192" },
  { text: "1 byte → bits", answer: "8" },
  { text: "2 bytes → bits", answer: "16" },
  { text: "4 bytes → bits", answer: "32" },
  { text: "8 bytes → bits", answer: "64" },


  // Cocina
  { text: "1 taza → cucharadas", answer: "16" },
  { text: "1 cucharada → cucharaditas", answer: "3" },
  { text: "2 cucharadas → cucharaditas", answer: "6" },
  { text: "4 cucharadas → ml", answer: "60" },
  { text: "8 cucharadas → ml", answer: "120" },

  // Velocidad
  { text: "18 km/h → m/s(aprox)", answer: "5" },
  { text: "54 km/h → m/s(aprox)", answer: "15" },
  { text: "90 km/h → m/s(aprox)", answer: "25" },
  { text: "144 km/h → m/s(aprox)", answer: "40" },

  // Temperatura
  { text: "27 °C → K(aprox)", answer: "300.15" },
  { text: "-273.15 °C → K", answer: "0" },

  // Imperiales
  { text: "12 pulgadas → pie", answer: "1" },
  { text: "3 pies → yarda", answer: "1" },
  { text: "1760 yardas → milla", answer: "1" },

  // Superficie
  { text: "1 m² → cm²", answer: "10000" },
  { text: "2 m² → cm²", answer: "20000" },
  { text: "10 m² → cm²", answer: "100000" },
  { text: "1 hectárea → m²", answer: "10000" },
  { text: "2 hectáreas → m²", answer: "20000" },

  // Extras
  { text: "1 año bisiesto → días", answer: "366" },
  { text: "2 lustros → años", answer: "10" },
  { text: "3 trimestres → meses", answer: "9" },
  { text: "4 trimestres → año", answer: "1" },
  { text: "6 bimestres → año", answer: "1" },
  { text: "52 semanas → días", answer: "364" },
  { text: "1000 gramos → mg", answer: "1000000" },
  { text: "1 gramo → mg", answer: "1000" },
  { text: "500 mg → gramos", answer: "0.5" },
  { text: "2500 mg → gramos", answer: "2.5" }
];