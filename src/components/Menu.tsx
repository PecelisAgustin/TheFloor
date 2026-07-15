import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryQuestions } from "../DATA/categoriesAgrupment";
import { useGameStore } from "../store/gameStore";

export function Menu() {
    const navigate = useNavigate();
    const [showCategoriesModal, setShowCategoriesModal] = useState(false);

    const selectedCategories = useGameStore((s) => s.selectedCategories);
    const toggleCategory = useGameStore((s) => s.toggleCategory);
    const setSelectedCategories = useGameStore((s) => s.setSelectedCategories);

    const allCategoryNames = categoryQuestions.map(([name]) => name);

    function selectAll() {
        setSelectedCategories(allCategoryNames);
    }

    function selectNone() {
        setSelectedCategories([]);
    }

    return (
        <main className="game-mode-menu">
            <h1 className="game-mode-menu__title">
                Seleccioná un modo de juego
            </h1>

            <div className="game-mode-menu__grid">
                <button
                    className="game-mode-menu__card"
                    onClick={() => navigate("/menu-the-floor")}
                >
                    <h2>The Floor</h2>
                    <p>Modo por categorías con tablero.</p>
                </button>

                <button
                    className="game-mode-menu__card"
                    onClick={() => navigate("/menu-papa-caliente")}
                >
                    <h2>Papa Caliente</h2>
                    <p>Modo de preguntas rápidas.</p>
                </button>
            </div>

            <button
                className="categories-btn"
                onClick={() => setShowCategoriesModal(true)}
            >
                🗂️ Categorías ({selectedCategories.length}/{allCategoryNames.length})
            </button>

            {showCategoriesModal && (
                <div className="categories-overlay">
                    <button
                        className="categories-close-btn"
                        onClick={() => setShowCategoriesModal(false)}
                    >
                        ✕
                    </button>

                    <div className="categories-header">
                        <h2>Categorías del juego</h2>
                        <p className="categories-count">
                            {selectedCategories.length} de {allCategoryNames.length} seleccionadas
                        </p>
                    </div>

                    <div className="categories-actions">
                        <button
                            className="secondary-btn"
                            onClick={selectAll}
                        >
                            Seleccionar todas
                        </button>

                        <button
                            className="secondary-btn"
                            onClick={selectNone}
                        >
                            Ninguna
                        </button>
                    </div>

                    <div className="categories-list">
                        {allCategoryNames.map((name) => {
                            const checked = selectedCategories.includes(name);

                            return (
                                <label
                                    key={name}
                                    className={`category-checkbox ${checked ? "is-checked" : ""}`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleCategory(name)}
                                    />
                                    {name}
                                </label>
                            );
                        })}
                    </div>

                    <div className="categories-footer">
                        {selectedCategories.length === 0 && (
                            <p className="categories-warning">
                                Elegí al menos una categoría para poder jugar.
                            </p>
                        )}

                        <button
                            className="start-btn"
                            onClick={() => setShowCategoriesModal(false)}
                        >
                            Listo
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
