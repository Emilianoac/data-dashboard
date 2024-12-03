import history_aguas_a from "./history_aguas_a.json";
import history_andina_b from "./history_andina_b.json";
import history_bci from "./history_bci.json";
import history_bsantander from "./history_bsantander.json";
import history_cap from "./history_cap.json";
import history_ipsa from "./history_ipsa.json";

type HistoryAPI = "AGUAS-A" | "ANDINA-B" | "BCI" | "BSANTANDER" | "CAP" | "IPSA";

const history = {
  "AGUAS-A": history_aguas_a,
  "ANDINA-B": history_andina_b,
  "BCI": history_bci,
  "BSANTANDER": history_bsantander,
  "CAP": history_cap,
  "IPSA": history_ipsa,
}


async function getConstituentHistoryAPI({fail = false, index = "IPSA"} = {}) {
  if (!index) return;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject(new Error("Eror al obtener el historial"));
      } else {
        resolve(history[index as HistoryAPI]);
      }
    }, 200)
  })
}

export default getConstituentHistoryAPI;
