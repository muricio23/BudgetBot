import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Asegúrate de tener 'uuid' instalado

// 1. Crea el contexto
const TransactionsContext = createContext(null);

// 2. Crea el proveedor del contexto
export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    // Cargar transacciones desde localStorage al iniciar
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });

  // Guardar transacciones en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Función para agregar una nueva transacción
  const addTransaction = (description, amount, type, category, date) => {
    const newTransaction = {
      id: uuidv4(),
      description,
      amount: parseFloat(amount), // Asegurarse de que sea número
      type, // 'Income' o 'Expense'
      category,
      date: date || new Date().toISOString().split('T')[0], // Usa la fecha proporcionada o la actual
    };
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    return true; // Simula éxito
  };

  // Puedes añadir funciones para updateTransaction y deleteTransaction si las necesitas
  const updateTransaction = (id, updatedData) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updatedData } : transaction
      )
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction.id !== id));
  };


  const transactionsContextValue = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return (
    <TransactionsContext.Provider value={transactionsContextValue}>
      {children}
    </TransactionsContext.Provider>
  );
};

// 3. Hook personalizado para consumir el contexto fácilmente
export const useTransactions = () => {
  return useContext(TransactionsContext);
};