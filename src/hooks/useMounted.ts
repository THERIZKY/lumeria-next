import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Hook to detect whether the component has mounted (client-side).
 * Uses useSyncExternalStore to avoid lint warnings about setState in effects.
 */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
