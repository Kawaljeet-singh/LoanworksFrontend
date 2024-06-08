import { defineStore } from "pinia";
import { reactive } from "vue";

export type TypeOfMotorVehicles =
  | "Passenger Vehicle"
  | "Motor Cycle"
  | "Caravan"
  | "Heavy Commercial"
  | "Light Commercial";

export type TypeOfWaterVehicle =
  | "Boat"
  | "Marine Motor"
  | "Personal Water Craft"
  | "Marine Trailer";
type VehicleDetails = {
  categoryOfVehicle: "Motor Vehicle" | "Water Craft" | "";
  purpose: "Purchase" | "Refinance" | "";
  typeOfVehicle: TypeOfMotorVehicles | TypeOfWaterVehicle | "";
  engineType: "Outboard" | "Inboard" | "";
};

const useVehicleStore = defineStore("vehicleStore", () => {
  const vehicleDetails: VehicleDetails = reactive({
    categoryOfVehicle: "",
    purpose: "",
    typeOfVehicle: "",
    engineType: "",
  });
  function setByName<K extends keyof VehicleDetails>(
    name: K,
    value: VehicleDetails[K]
  ) {
    vehicleDetails[name] = value;
  }
  return {
    setByName,
    vehicleDetails,
  };
});

export default useVehicleStore;
