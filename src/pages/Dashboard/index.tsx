import React, { useEffect, useState } from "react";
import Food from "../../components/Food";
import Header from "../../components/Header";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { IFoodPlate } from "../../models/Food/Food";
import api from "../../services/api";
import { FoodsContainer } from "./styles";

const Dashboard: React.FC = () => {
    const [foods, setFoods] = useState<IFoodPlate[]>([]);
    const [editingFood, setEditingFood] = useState<IFoodPlate>({
        id: 0,
        name: "",
        image: "",
        price: "",
        description: "",
        available: false,
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        async function loadFoods(): Promise<void> {
            api.get("/foods").then((response) => {
                setFoods(response.data);
            });
        }

        loadFoods();
    }, []);

    async function handleAddFood(
        food: Omit<IFoodPlate, "id" | "available">
    ): Promise<void> {
        try {
            const newFood = Object.assign(food, { available: true });
            await api.post("/foods", newFood).then((response) => {
                setFoods([...foods, response.data]);
            });
        } catch (err) {
            console.log(err);
        }
    }

    async function handleUpdateFood(
        food: Omit<IFoodPlate, "id" | "available">
    ): Promise<void> {
        const updateFood = Object.assign(editingFood, {
            ...food,
        });
        const response = await api.put(`/foods/${editingFood.id}`, updateFood);
        setFoods(
            foods.map((item) =>
                item.id === editingFood.id ? { ...response.data } : item
            )
        );
    }

    async function handleDeleteFood(id: number): Promise<void> {
        await api.delete(`/foods/${id}`);
        setFoods(foods.filter((food) => food.id !== id));
    }

    function toggleModal(): void {
        setModalOpen(!modalOpen);
    }

    function toggleEditModal(): void {
        setEditModalOpen(!editModalOpen);
    }

    function handleEditFood(food: IFoodPlate): void {
        setEditModalOpen(true);
        setEditingFood(food);
    }

    return (
        <>
            <Header openModal={toggleModal} />
            <ModalAddFood
                isOpen={modalOpen}
                setIsOpen={toggleModal}
                handleAddFood={handleAddFood}
            />
            <ModalEditFood
                isOpen={editModalOpen}
                setIsOpen={toggleEditModal}
                editingFood={editingFood}
                handleUpdateFood={handleUpdateFood}
            />

            <FoodsContainer data-testid="foods-list">
                {foods &&
                    foods.map((food) => (
                        <Food
                            key={food.id}
                            food={food}
                            handleDelete={handleDeleteFood}
                            handleEditFood={handleEditFood}
                        />
                    ))}
            </FoodsContainer>
        </>
    );
};

export default Dashboard;
