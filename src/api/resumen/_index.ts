import aguas_a from "./aguas_a.json";
import andina_b from "./andina_b.json";
import bci from "./bci.json"
import bsantander from "./bsantander.json";
import cap from "./cap.json";
import ipsa from "./ipsa.json";


const resumen = {
  "AGUAS-A": aguas_a,
  "ANDINA-B": andina_b,
  "BCI": bci,
  "BSANTANDER": bsantander,
  "CAP": cap,
  "IPSA": ipsa,
}

async function getResumenAPI({error = false, index}: {error?: boolean, index: string}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject({status: 500, message: "Error en la conexión"});
      } else {
        resolve(resumen[index as keyof typeof resumen]);
      }
    }, 200);
  });
}

export default getResumenAPI;
