import { RequestHandler } from "express";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const makePrompt = async (genres: string, likes: string, dislikes: string) => {
  let { text } = await generateText({
    model: google("gemini-1.5-flash"),
    prompt: `Recomiéndame 7 películas y 10 series, basadas en la siguiente información: Me gustan los géneros: ${genres};  me gustan las peliculas o series como: ${likes};  no me gustan las peliculas o series como: ${dislikes}. Formatealo como una lista que tenga, separando cada contenido con comas: <película o serie>,<breve descrpción>,[género],<tipo:pelicula o serie>,[plataformas donde ver].`,
  });

  return text;
}

export const createSuggestion: RequestHandler = async (req, res) => {
  const { genres, likes, dislikes } = req.body;

  try {
    

    // let text =
    //   "## Películas:\n\n1. **Avengers: Endgame**, La batalla final contra Thanos, [Acción, Aventura, Superhéroes], Película, [Disney+]\n2. **Thor: Ragnarok**, Thor se enfrenta a Hela, la diosa de la muerte, [Acción, Aventura, Comedia, Superhéroes], Película, [Disney+]\n3. **Guardians of the Galaxy**, Un grupo de inadaptados se une para salvar la galaxia, [Acción, Aventura, Comedia, Superhéroes], Película, [Disney+]\n4. **The Goonies**, Un grupo de niños busca un tesoro pirata, [Aventura, Comedia], Película, [HBO Max]\n5. **Jumanji: Welcome to the Jungle**, Un grupo de adolescentes se ve transportado a un videojuego, [Aventura, Comedia], Película, [Netflix]\n6. **Back to the Future**, Un adolescente viaja al pasado en un DeLorean, [Aventura, Comedia], Película, [Netflix]\n7. **The Princess Bride**, Una historia de amor y aventuras en un mundo de fantasía, [Aventura, Comedia, Romance], Película, [HBO Max]\n\n## Series:\n\n1. **The Witcher**, Un cazador de monstruos viaja por un mundo de fantasía, [Acción, Aventura, Fantasía], Serie, [Netflix]\n2. **The Umbrella Academy**, Un grupo de hermanos con superpoderes se reúne para salvar el mundo, [Acción, Aventura, Comedia, Superhéroes], Serie, [Netflix]\n3. **Locke & Key**, Tres hermanos descubren llaves mágicas en su nueva casa, [Aventura, Fantasía, Terror], Serie, [Netflix]\n4. **Shadow and Bone**, Una joven descubre que tiene el poder de convocar la luz, [Aventura, Fantasía], Serie, [Netflix]\n5. **The Expanse**, Una historia de ciencia ficción ambientada en un futuro donde la humanidad ha colonizado el sistema solar, [Acción, Aventura, Ciencia Ficción], Serie, [Amazon Prime Video]\n6. **The Mandalorian**, Un cazarrecompensas solitario viaja por la galaxia, [Acción, Aventura, Ciencia Ficción], Serie, [Disney+]\n7. **Star Trek: The Next Generation**, La tripulación de la nave espacial Enterprise explora el espacio, [Ciencia Ficción, Aventura], Serie, [Paramount+]\n8. **Firefly**, Un grupo de fugitivos viaja por la galaxia en una nave espacial, [Ciencia Ficción, Aventura, Comedia], Serie, [Hulu]\n9. **Doctor Who**, Un viajero en el tiempo que viaja por el espacio y el tiempo, [Ciencia Ficción, Aventura], Serie, [HBO Max]\n10. **Supernatural**, Dos hermanos cazan demonios y otras criaturas sobrenaturales, [Terror, Aventura, Fantasía], Serie, [Netflix] \n";

    let text = await makePrompt(genres, likes, dislikes);
    text = text.replaceAll("*", "");
    const series = text.substring(text.indexOf("## Series:"), text.length);

    for (let i = 1; i <= 7; i++) {

      const [_, str] = text.split(`${i}. `);

      let [title, description, ...rest] = str.split(", ");
      let rest2 = rest.join(", ");

      const endI = rest2.indexOf("]");
      let genres = rest2.substring(rest2.indexOf("[") + 1, endI);
      rest2 = rest2.substring(endI + 3);

      let type = rest2.substring(0, rest2.indexOf(","));
      rest2 = rest2.substring(rest2.indexOf("[") + 1);

      let platforms = rest2.substring(0, rest2.indexOf("]"));
      rest2 = rest2.substring(rest2.indexOf("]\n") + 3);

      console.log({ i, title, description, genres, type, platforms });
    }

    for (let i = 1; i <= 10; i++) {

      const [_, str] = series.split(`${i}. `);

      let [title, description, ...rest] = str.split(", ");
      let rest2 = rest.join(", ");

      const endI = rest2.indexOf("]");
      let genres = rest2.substring(rest2.indexOf("[") + 1, endI);
      rest2 = rest2.substring(endI + 3);

      let type = rest2.substring(0, rest2.indexOf(","));
      rest2 = rest2.substring(rest2.indexOf("[") + 1);

      let platforms = rest2.substring(0, rest2.indexOf("]"));
      rest2 = rest2.substring(rest2.indexOf("]\n") + 3);

      console.log({ i, title, description, genres, type, platforms });
    }

    res.json({ movies: text, series });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al intentar realizar el prompt" });
    return;
  }
};
