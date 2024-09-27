import { UseNavigateResult } from "@tanstack/react-router";

let navigate: UseNavigateResult<string> | undefined = undefined;

export function setNavigate(n: UseNavigateResult<string>) {
  navigate = n;
}



