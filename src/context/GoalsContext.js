import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Para generar IDs únicos

// Instalar uuid si no lo tienes: npm install uuid

// 1. Crea el contexto
const GoalsContext = createContext(null);

// 2. Crea el proveedor del contexto
export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState(() => {
    // Cargar metas desde localStorage al iniciar
    const storedGoals = localStorage.getItem('goals');
    return storedGoals ? JSON.parse(storedGoals) : [];
  });

  // Guardar metas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  // Función para agregar una nueva meta
  const addGoal = (name, targetAmount, dueDate) => {
    const newGoal = {
      id: uuidv4(), // Genera un ID único
      name,
      targetAmount: parseFloat(targetAmount), // Asegurarse de que sea número
      currentAmount: 0, // Inicia en 0
      dueDate,
      status: 'Active',
      emoji: '🎯' // Puedes añadir lógica para elegir emojis según el nombre
    };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    return true; // Simula éxito
  };

  // Función para actualizar una meta existente (ej. añadir progreso)
  const updateGoal = (id, updatedData) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, ...updatedData } : goal
      )
    );
  };

  // Función para eliminar una meta
  const deleteGoal = (id) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  };

  const goalsContextValue = {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
  };

  return (
    <GoalsContext.Provider value={goalsContextValue}>
      {children}
    </GoalsContext.Provider>
  );
};

// 3. Hook personalizado para consumir el contexto fácilmente
export const useGoals = () => {
  return useContext(GoalsContext);
};