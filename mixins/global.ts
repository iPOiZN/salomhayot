import { useToast } from "primevue/usetoast";
const toast = useToast();

type TSeverity= "success" | "info" | "warn" | "error" | undefined

export default function showToast(type:TSeverity, summary:string, detail:string='', life=3000) {
    toast.add({ severity: type, summary: summary, detail: detail, life: life });
}
