import { actores } from "../categories/actores";
import { flags } from "../categories/banderas";
import { cantantes } from "../categories/cantantes";
import { capitals } from "../categories/capitales";
import { comidas } from "../categories/comidas";
import { deportistas } from "../categories/deportistas";
import { escudosFutbol } from "../categories/Equipos futbol";
import { frasesConocidas } from "../categories/frases";
import { englishWords } from "../categories/ingles";
import { logos } from "../categories/logos";
import { mathQuestions } from "../categories/matematica";
import { movieQuestions } from "../categories/peliculas";
import { tablaPeriodica } from "../categories/tablaPeriodica";
import { portugueseWords } from "../categories/portugues";
import { animatedMovieQuestions } from "../categories/peliculasAnimadas";
import { cientificosInventores } from "../categories/cientificosInventores";
import { librosPorEmojis } from "../categories/librosEmojis";
import { personajesHistoricos } from "../categories/politicos";
import { series } from "../categories/series";
import { canciones80s } from "../categories/canciones80s";
import { canciones90s } from "../categories/canciones90s";
import { canciones2000s } from "../categories/canciones2000s";
import { canciones2010s } from "../categories/canciones2010sadelante";

export interface CategoryQuestion {
    text?: string;
    answer: string;
    image?: string;
    possibleAnswers?: string[];
    trackId?: number;
}

export type CategoryGroup = [
    string,
    CategoryQuestion[]
];

export const categoryQuestions: CategoryGroup[] = [
    ["Capitales", capitals],
    ["Ingles", englishWords],
    ["Matematica", mathQuestions],
    ["Banderas", flags],
    ["Logos marcas", logos],
    ["Tabla periodica", tablaPeriodica],
    ["Equipos futbol", escudosFutbol],
    ["Refranes/Frases", frasesConocidas],
    ["Peliculas", movieQuestions],
    ["Peliculas animadas", animatedMovieQuestions],
    ["Deportistas", deportistas],
    ["Cantantes", cantantes],
    ["Actores/Directores", actores],
    ["Comidas", comidas],
    ["Portugues", portugueseWords],
    ["Cientificos/Inventores", cientificosInventores],
    ["Libros por emojis", librosPorEmojis],
    ["Politicos", personajesHistoricos],
    ["Series", series],
    ["Musica 80s o antes", canciones80s],
    ["Musica 90s", canciones90s],
    ["Musica 2000s", canciones2000s],
    ["Musica 2010s adelante", canciones2010s]
];