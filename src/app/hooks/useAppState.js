import { v4 as uuid } from "uuid";
import { LS_UUID } from "@/app/shared/Constants";
import useLocalStorage from "./useLocalStorage";

function useAppState() {
  const [userId, setUserId] = useLocalStorage(LS_UUID, uuid());

  return {
    userId,
    setUserId,
  };
}

export default useAppState;
