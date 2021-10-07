import { IFoodPlate } from "../Food/Food";

export interface IModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    handleAddFood: (food: Omit<IFoodPlate, "id" | "available">) => void;
}

export interface IModalEditProps extends Omit<IModalProps, "handleAddFood"> {
    handleUpdateFood: (food: Omit<IFoodPlate, "id" | "available">) => void;
    editingFood: IFoodPlate;
}

export interface IEditFoodData {
    name: string;
    image: string;
    price: string;
    description: string;
}

export interface ICreateFoodData {
    name: string;
    image: string;
    price: string;
    description: string;
}
