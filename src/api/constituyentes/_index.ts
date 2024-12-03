import constituens from "./constituens_list.json";
import type { Constituent } from "@/types/constituent";

function getAllConstituentsAPI(fail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject(new Error("Failed to fetch"));
      } else {
        resolve(constituens);
      }
    }, 200)
  })
}

function searchConstituentAPI(search: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = constituens.data.constituents.filter((constituent: Constituent) => {
        return constituent.shortName.toLowerCase().includes(search.toLowerCase());
      });

      resolve(result);
    }, 200)
  })
}

export {getAllConstituentsAPI, searchConstituentAPI};
