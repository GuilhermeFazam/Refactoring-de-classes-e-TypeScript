export interface IFoodPlate {
    id: number;
    name: string;
    image: string;
    price: string;
    description: string;
    available: boolean;
}

export interface IFoodProps {
    food: IFoodPlate;
    handleDelete: (id: number) => {};
    handleEditFood: (food: IFoodPlate) => void;
}
