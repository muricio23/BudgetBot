import React, { useState, useEffect } from 'react';
import { useTransactions } from '../context/TransactionsContext'; // Importa el contexto de transacciones
import './Reports.css'; // Estilos para la página de reportes

function Reports() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();

  // Estados para el formulario de agregar transacción
  const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState('Expense'); // 'Expense' o 'Income'
  const [newCategory, setNewCategory] = useState('');
  const [newDate, setNewDate] = useState('');
  const [addFormError, setAddFormError] = useState('');

  // Estados para los filtros
  const [filterType, setFilterType] = useState('All'); // 'All', 'Income', 'Expense'
  const [filterCategory, setFilterCategory] = useState('All'); // 'All' o una categoría específica
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  // Transacciones filtradas (estado derivado)
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Generar lista única de categorías para el filtro
  const categories = [...new Set(transactions.map(t => t.category))].sort();

  useEffect(() => {
    let tempTransactions = [...transactions];

    // Aplicar filtro por tipo
    if (filterType !== 'All') {
      tempTransactions = tempTransactions.filter(t => t.type === filterType);
    }

    // Aplicar filtro por categoría
    if (filterCategory !== 'All') {
      tempTransactions = tempTransactions.filter(t => t.category === filterCategory);
    }

    // Aplicar filtro por fecha
    if (filterStartDate) {
      tempTransactions = tempTransactions.filter(t => new Date(t.date) >= new Date(filterStartDate));
    }
    if (filterEndDate) {
      tempTransactions = tempTransactions.filter(t => new Date(t.date) <= new Date(filterEndDate));
    }

    // Ordenar transacciones por fecha descendente
    tempTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredTransactions(tempTransactions);
  }, [transactions, filterType, filterCategory, filterStartDate, filterEndDate]);

  // Calcular totales
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;


  // Handler para agregar transacción
  const handleAddTransactionSubmit = (e) => {
    e.preventDefault();
    setAddFormError('');

    if (!newDescription || !newAmount || !newType || !newCategory || !newDate) {
      setAddFormError('Todos los campos son obligatorios.');
      return;
    }
    if (isNaN(parseFloat(newAmount)) || parseFloat(newAmount) <= 0) {
      setAddFormError('El monto debe ser un número positivo.');
      return;
    }

    addTransaction(newDescription, newAmount, newType, newCategory, newDate);
    // Limpiar formulario y cerrar
    setNewDescription('');
    setNewAmount('');
    setNewType('Expense');
    setNewCategory('');
    setNewDate('');
    setShowAddTransactionForm(false);
  };

  return (
    <div className="reports-page">
      <h2>Reportes y Transacciones</h2>

      <div className="summary-cards">
        <div className="summary-card income">
          <h3>Ingresos Totales</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </div>
        <div className="summary-card expense">
          <h3>Gastos Totales</h3>
          <p>${totalExpense.toFixed(2)}</p>
        </div>
        <div className="summary-card balance">
          <h3>Balance Neto</h3>
          <p>${netBalance.toFixed(2)}</p>
        </div>
      </div>

      <div className="reports-section">
        <div className="filter-form-container">
          <h3>Filtrar Transacciones</h3>
          <div className="filter-group">
            <label htmlFor="filterType">Tipo:</label>
            <select id="filterType" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="All">Todos</option>
              <option value="Income">Ingreso</option>
              <option value="Expense">Gasto</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filterCategory">Categoría:</label>
            <select id="filterCategory" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="All">Todas</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filterStartDate">Desde:</label>
            <input
              type="date"
              id="filterStartDate"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="filterEndDate">Hasta:</label>
            <input
              type="date"
              id="filterEndDate"
              value={filterEndDate}
              onChange={(e) => setFilterEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="transaction-list-section">
          <div className="transaction-list-header">
            <h3>Lista de Transacciones</h3>
            <button className="add-transaction-button" onClick={() => setShowAddTransactionForm(true)}>+ Añadir Transacción</button>
          </div>

          {showAddTransactionForm && (
            <div className="modal-overlay">
              <div className="add-transaction-form-container">
                <h3>Añadir Nueva Transacción</h3>
                <form onSubmit={handleAddTransactionSubmit}>
                  <div className="form-group">
                    <label htmlFor="description">Descripción:</label>
                    <input type="text" id="description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="amount">Monto:</label>
                    <input type="number" id="amount" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} step="0.01" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Tipo:</label>
                    <select id="type" value={newType} onChange={(e) => setNewType(e.target.value)} required>
                      <option value="Expense">Gasto</option>
                      <option value="Income">Ingreso</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Categoría:</label>
                    <input type="text" id="category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Fecha:</label>
                    <input type="date" id="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} required />
                  </div>
                  {addFormError && <p className="error-message">{addFormError}</p>}
                  <div className="form-actions">
                    <button type="submit" className="submit-button">Guardar Transacción</button>
                    <button type="button" className="cancel-button" onClick={() => setShowAddTransactionForm(false)}>Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {filteredTransactions.length === 0 ? (
            <p className="no-transactions-message">No hay transacciones para mostrar con los filtros actuales.</p>
          ) : (
            <div className="transactions-table">
              <table>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    <th>Monto</th>
                    <th>Tipo</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map(t => (
                    <tr key={t.id} className={t.type === 'Income' ? 'income-row' : 'expense-row'}>
                      <td>{t.date}</td>
                      <td>{t.description}</td>
                      <td className={t.type === 'Income' ? 'income-amount' : 'expense-amount'}>
                        {t.type === 'Income' ? '+' : '-'}${t.amount.toFixed(2)}
                      </td>
                      <td>{t.type === 'Income' ? 'Ingreso' : 'Gasto'}</td>
                      <td>{t.category}</td>
                      <td>
                        <button className="delete-transaction-button" onClick={() => deleteTransaction(t.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;