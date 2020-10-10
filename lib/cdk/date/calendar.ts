import { inject } from "vue";
import { langToken } from "../global";
import { format } from "fecha";

export default function () {
  const lang = inject(langToken)!;
  console.log(lang.value, format(new Date(), "YYYY MMMM dddd"));
}
