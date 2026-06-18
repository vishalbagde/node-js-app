import "../_libs/react.mjs";
import { s as supabase } from "./client-SJLpyyNw.mjs";
async function signOut() {
  await supabase.auth.signOut();
  window.location.href = "/auth";
}
export {
  signOut as s
};
