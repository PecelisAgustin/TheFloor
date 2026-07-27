import { actores } from "../categories/actores";
import { flags } from "../categories/banderas";
import { cantantes } from "../categories/cantantes";
import { capitals } from "../categories/capitales";
import { comidas } from "../categories/comidas";
import { deportistas } from "../categories/deportistas";
import { escudosFutbol } from "../categories/Equiposfutbol";
import { frasesConocidas } from "../categories/frases";
import { englishWords } from "../categories/ingles";
import { logos } from "../categories/logos";
import { mathQuestions } from "../categories/matematica";
import { peliculas1920a1969 } from "../categories/peliculas1920a1969"; 
import { peliculas1970a1990 } from "../categories/peliculas1970a1990";
import { peliculas1990a2009 } from "../categories/peliculas1990a2009";
import { peliculas2010aActualidad } from "../categories/peliculas2010aActualidad";
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
import { canciones2010s } from "../categories/canciones2010s";
import { futbolistasActuales } from "../categories/futbolistasActuales";
import { futbolistasRetirados } from "../categories/futbolistasRetirados";
import { mitologia } from "../categories/mitologia";
import { equivalencias } from "../categories/equivalencias";
import { geometria } from "../categories/geometria";
import { numerosRomanos } from "../categories/romanos";
import { sucesiones } from "../categories/sucesiones";
import { cuerpo } from "../categories/cuerpo";
import { canciones2020s } from "../categories/canciones2020s";
import { cancionesPeliculas } from "../categories/cancionesPeliculas";
import { ecuaciones } from "../categories/ecuaciones";

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
    ["Banderas", flags],
    
    ["Equipos futbol", escudosFutbol],
    ["Futbolistas actuales", futbolistasActuales],
    ["Futbolistas retirados", futbolistasRetirados],
    ["Deportistas(no fut)", deportistas],

    ["Refranes/Frases", frasesConocidas],
    ["Ingles", englishWords],
    ["Portugues", portugueseWords],

    ["Cuerpo", cuerpo],
    ["Comidas", comidas],
    ["Tabla periodica", tablaPeriodica],
    ["Cientificos/Inventores", cientificosInventores],
    ["Politicos", personajesHistoricos],
    ["Mitologia", mitologia],

    ["Series", series],
    ["Libros por emojis", librosPorEmojis],
    ["Actores/Directores", actores],
    ["Peliculas 1920-1969", peliculas1920a1969],
    ["Peliculas 1970-1990", peliculas1970a1990],
    ["Peliculas 1991-2009", peliculas1990a2009],
    ["Peliculas 2010-2026", peliculas2010aActualidad],
    ["Peliculas animadas", animatedMovieQuestions],
    ["Canciones peliculas", cancionesPeliculas],
    ["Musica 80s o antes", canciones80s],
    ["Musica 90s", canciones90s],
    ["Musica 2000s", canciones2000s],
    ["Musica 2010s", canciones2010s],
    ["Musica 2020s", canciones2020s],
    ["Cantantes", cantantes],

    ["Logos marcas", logos],

    ["Cuentas", mathQuestions],
    ["Equivalencias", equivalencias],
    ["Geometria", geometria],
    ["Ecuaciones", ecuaciones],
    ["Numeros romanos", numerosRomanos],
    ["Sucesiones", sucesiones],
    
    
];