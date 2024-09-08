import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";

interface WaterStore {
    waterDrinkStamps: string[];
    addWaterIntake: (timeStamp: string) => void;
    resetWaterIntake: () => void;
}

export const useWaterStore = create<WaterStore>()(
    persist(
        (set, get) => ({
            waterDrinkStamps: [],
            addWaterIntake: (timeStamp) => {
                const waterDrinkStamps = [...get().waterDrinkStamps, timeStamp]
                set({ waterDrinkStamps })
            },
            resetWaterIntake: () => {
                set({ waterDrinkStamps: [] })
            }
        }),
        {
            name: 'water-storage',
            storage: createJSONStorage(() => mmkvStorage)
        }
    )
)