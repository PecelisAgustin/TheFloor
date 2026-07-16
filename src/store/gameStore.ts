import { create } from "zustand";
import { persist } from "zustand/middleware";
import { categoryQuestions } from "../DATA/categoriesAgrupment";

import type { Player } from "../types/player";
import type { Tile } from "../types/tile";
import { generateId } from "../utils/generateId";

interface Question {
  image?: string;
  text?: string;
  answer: string;
}

interface GameStore {
  totalPlayers: number;
  timePerPlayer: number;
  players: Player[];
  tiles: Tile[];
  gameWinner: Player | null;
  pendingPlayers: Player[];

  setTotalPlayers: (total: number) => void;
  setTimePerPlayer: (time: number) => void;

  addPlayer: (name: string) => boolean;
  removePlayer: (id: string) => void;
  resetPlayers: () => void;

  setPlayerCategory: (playerId: string, category?: string) => void;

  initializeTiles: () => void;

  attackingPlayer: Player | null;
  setAttackingPlayer: (attacking: Player) => void;
  defendingPlayer: Player | null;
  setDefendingPlayer: (defending: Player) => void;
  setCurrentCategory: () => void;

  killPlayer: (name: string) => void;

  usedQuestion: Question[];

  popPendingPlayer: () => Player | null;

  resetDuel: () => void;
  resetGame: () => void;

  conquerTerritory: (winner: Player, loser: Player) => void;

  vueltas: number;
  vueltasActuales: number;
  ronda: number;
  setCantidadVueltas: (vueltas: number) => void;
  actualPlayer: number;
  nextRound: () => void;
  currentCategory: string | null;
  availableCategories: string[];
  addPoints: (playerId: string, points: number) => void;

   roomCode: string | null;
 
    setRoomCode: (code: string | null) => void;

    selectedCategories: string[];
    toggleCategory: (category: string) => void;
    setSelectedCategories: (categories: string[]) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({

      setRoomCode: (code) => set({ roomCode: code }),
      roomCode: null,

      selectedCategories: categoryQuestions.map((c) => c[0]),

      toggleCategory: (category) =>
        set((state) => {
          const isSelected = state.selectedCategories.includes(category);

          const selectedCategories = isSelected
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category];

          return { selectedCategories };
        }),

      setSelectedCategories: (categories) =>
        set({ selectedCategories: categories }),

      initializeCategories: () => {
        const pool = [...categoryQuestions.map((c) => c[0])];

        const randomIndex = Math.floor(Math.random() * pool.length);
        const currentCategory = pool[randomIndex];

        pool.splice(randomIndex, 1);

        set({
          currentCategory,
          availableCategories: pool,
        });
      },
      currentCategory: null,
      availableCategories: categoryQuestions.map((c) => c[0]),
      actualPlayer: 0,
      setCurrentCategory: () => {
        const state = get();
        const pool = [...state.availableCategories];

        const randomIndex = Math.floor(Math.random() * pool.length);

        const currentCategory = pool[randomIndex];

        pool.splice(randomIndex, 1);

        set({
            currentCategory,
            availableCategories: pool,
          });


      },
      nextRound() {
        const state = get();
        let pool = [...state.availableCategories];

        if (pool.length === 0) {
          pool =
            state.selectedCategories.length > 0
              ? [...state.selectedCategories]
              : categoryQuestions.map((c) => c[0]);
        }

        const randomIndex = Math.floor(Math.random() * pool.length);

        const currentCategory = pool[randomIndex];

        pool.splice(randomIndex, 1);

        if (state.actualPlayer === state.players.length - 1) {
          set({
            actualPlayer: 0,
            ronda: state.ronda + 1,
            vueltasActuales: state.vueltasActuales + 1,
            currentCategory,
            availableCategories: pool,
          });
        } else {
          set({
            actualPlayer: state.actualPlayer + 1,
            ronda: state.ronda + 1,
            currentCategory,
            availableCategories: pool,
          });
        }
      },
      vueltasActuales: 0,
      vueltas: 0,
      ronda: 0,
      setCantidadVueltas(vueltas) {
        set({ vueltas: vueltas });
      },
      gameWinner: null,
      pendingPlayers: [],

      popPendingPlayer: () => {
        const state = get();

        // Si el pool está vacío, recargar con todos los jugadores vivos
        const pool =
          state.pendingPlayers.length > 0
            ? state.pendingPlayers
            : [...state.players];

        if (pool.length === 0) return null;

        const index = Math.floor(Math.random() * pool.length);
        const chosen = pool[index];
        const remaining = pool.filter((_, i) => i !== index);

        set({ pendingPlayers: remaining });
        return chosen;
      },

      killPlayer: (name) =>
        set((state) => {
          const updatedPlayers = state.players.filter(
            (player) => player.name !== name,
          );

          const gameWinner =
            updatedPlayers.length === 1 ? updatedPlayers[0] : null;

          // Sacarlo del pool pendiente si estaba
          const updatedPending = state.pendingPlayers.filter(
            (p) => p.name !== name,
          );

          return {
            players: updatedPlayers,
            pendingPlayers: updatedPending,
            gameWinner,
          };
        }),

      conquerTerritory: (winner, loser) =>
        set((state) => {
          const attackerWon = state.attackingPlayer?.id === winner.id;

          const updatedTiles = state.tiles.map((tile) => {
            if (tile.ownerName === loser.name) {
              return { ...tile, ownerName: winner.name };
            }
            return tile;
          });

          let updatedPlayers = state.players;

          if (!attackerWon) {
            updatedPlayers = state.players.map((player) =>
              player.id === winner.id
                ? { ...player, category: loser.category }
                : player,
            );
          }

          return {
            tiles: updatedTiles,
            players: updatedPlayers,
          };
        }),

      totalPlayers: 4,
      timePerPlayer: 45,
      usedQuestion: [],

      resetDuel: () =>
        set({
          attackingPlayer: null,
          defendingPlayer: null,
          usedQuestion: [],
        }),

      resetGame: () =>
        set((state) => ({
          players: [],
          tiles: [],
          attackingPlayer: null,
          defendingPlayer: null,
          currentCategory: null,
          usedQuestion: [],
          gameWinner: null,
          pendingPlayers: [],

          vueltas: 1,
          vueltasActuales: 1,
          ronda: 1,
          actualPlayer: 0,
          availableCategories:
            state.selectedCategories.length > 0
              ? [...state.selectedCategories]
              : categoryQuestions.map((c) => c[0]),
        })),

      attackingPlayer: null,
      defendingPlayer: null,

      players: [],
      tiles: [],

      initializeTiles: () =>
        set((state) => ({
          tiles: state.players.map((player, index) => ({
            id: index,
            ownerName: player.name,
            originalOwnerName: player.name,
            category: player.category,
          })),
          gameWinner: null,
          pendingPlayers: [],
          availableCategories:
            state.selectedCategories.length > 0
              ? [...state.selectedCategories]
              : categoryQuestions.map((c) => c[0]),
        })),

      setAttackingPlayer: (attacking) => set({ attackingPlayer: attacking }),
      setDefendingPlayer: (defending) => set({ defendingPlayer: defending }),
      

      setTotalPlayers: (totalPlayers) =>
        set((state) => ({
          totalPlayers,
          players: state.players.slice(0, totalPlayers),
        })),

      setTimePerPlayer: (timePerPlayer) => set({ timePerPlayer }),

      addPlayer: (name) => {
        const trimmedName = name.trim();

        const alreadyExists = get().players.some(
          (player) =>
            player.name.trim().toLowerCase() ===
            trimmedName.toLowerCase(),
        );

        if (alreadyExists) return false;

        set((state) => ({
          players: [
            ...state.players,
            { id: generateId(), name: trimmedName, points: 0 },
          ],
        }));

        return true;
      },

      removePlayer: (id) =>
        set((state) => ({
          players: state.players.filter((player) => player.id !== id),
        })),

      resetPlayers: () => set({ players: [] }),

      addPoints: (playerId, points) =>
        set((state) => ({
          players: state.players.map((player) =>
            player.id === playerId
              ? { ...player, points: (player.points ?? 0) + points }
              : player
          ),
        })),

      setPlayerCategory: (playerId, category) =>
        set((state) => ({
          players: state.players.map((player) =>
            player.id === playerId ? { ...player, category } : player,
          ),
        })),
    }),
    {
      name: "the-floor-storage",
    },
  ),
);
