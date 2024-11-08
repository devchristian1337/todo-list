import { GB, IT, FR, ES, DE } from 'country-flag-icons/react/3x2'
import type { FlagComponent } from 'country-flag-icons/react/3x2'

type Translations = {
  [key: string]: {
    addTodo: string;
    addPlaceholder: string;
    deleteAll: string;
    confirmDelete: string;
    confirmDeleteMessage: string;
    cancel: string;
    delete: string;
    deleteAllConfirm: string;
    deleteAllMessage: string;
    deleteAllButton: string;
    madeBy: string;
    FlagIcon: FlagComponent;
    todoAdded: string;
    todoDeleted: string;
    allTodosDeleted: string;
    theme: string;
    lightMode: string;
    darkMode: string;
    language: string;
  };
};

export const translations: Translations = {
  en: {
    addTodo: "Add",
    addPlaceholder: "Add a new todo",
    deleteAll: "Delete all",
    confirmDelete: "Confirm deletion",
    confirmDeleteMessage: "Are you sure you want to delete",
    cancel: "Cancel",
    delete: "Delete",
    deleteAllConfirm: "Confirm deletion",
    deleteAllMessage: "Are you sure you want to delete all todos? This action cannot be undone.",
    deleteAllButton: "Delete all",
    madeBy: "Made by",
    FlagIcon: GB,
    todoAdded: "Todo added successfully!",
    todoDeleted: '"{todo}" has been deleted',
    allTodosDeleted: "All todos have been deleted",
    theme: "Theme",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    language: "Language",
  },
  it: {
    addTodo: "Aggiungi",
    addPlaceholder: "Aggiungi un nuovo todo",
    deleteAll: "Elimina tutto",
    confirmDelete: "Conferma eliminazione",
    confirmDeleteMessage: "Sei sicuro di voler eliminare",
    cancel: "Annulla",
    delete: "Elimina",
    deleteAllConfirm: "Conferma eliminazione",
    deleteAllMessage: "Sei sicuro di voler eliminare tutti i todo? Questa azione non può essere annullata.",
    deleteAllButton: "Elimina tutto",
    madeBy: "Creato da",
    FlagIcon: IT,
    todoAdded: "Todo aggiunto con successo!",
    todoDeleted: '"{todo}" è stato eliminato',
    allTodosDeleted: "Tutti i todo sono stati eliminati",
    theme: "Tema",
    lightMode: "Tema Chiaro",
    darkMode: "Tema Scuro",
    language: "Lingua",
  },
  fr: {
    addTodo: "Ajouter",
    addPlaceholder: "Ajouter une nouvelle tâche",
    deleteAll: "Tout supprimer",
    confirmDelete: "Confirmer la suppression",
    confirmDeleteMessage: "Êtes-vous sûr de vouloir supprimer",
    cancel: "Annuler",
    delete: "Supprimer",
    deleteAllConfirm: "Confirmer la suppression",
    deleteAllMessage: "Êtes-vous sûr de vouloir supprimer toutes les tâches ? Cette action ne peut pas être annulée.",
    deleteAllButton: "Tout supprimer",
    madeBy: "Créé par",
    FlagIcon: FR,
    todoAdded: "Tâche ajoutée avec succès!",
    todoDeleted: '"{todo}" a été supprimé',
    allTodosDeleted: "Toutes les tâches ont été supprimées",
    theme: "Thème",
    lightMode: "Mode Clair",
    darkMode: "Mode Sombre",
    language: "Langue",
  },
  es: {
    addTodo: "Añadir",
    addPlaceholder: "Añadir una nueva tarea",
    deleteAll: "Eliminar todo",
    confirmDelete: "Confirmar eliminación",
    confirmDeleteMessage: "¿Estás seguro de que quieres eliminar",
    cancel: "Cancelar",
    delete: "Eliminar",
    deleteAllConfirm: "Confirmar eliminación",
    deleteAllMessage: "¿Estás seguro de que quieres eliminar todas las tareas? Esta acción no se puede deshacer.",
    deleteAllButton: "Eliminar todo",
    madeBy: "Hecho por",
    FlagIcon: ES,
    todoAdded: "¡Tarea añadida con éxito!",
    todoDeleted: '"{todo}" ha sido eliminado',
    allTodosDeleted: "Todas las tareas han sido eliminadas",
    theme: "Tema",
    lightMode: "Modo Claro",
    darkMode: "Modo Oscuro",
    language: "Idioma",
  },
  de: {
    addTodo: "Hinzufügen",
    addPlaceholder: "Neue Aufgabe hinzufügen",
    deleteAll: "Alle löschen",
    confirmDelete: "Löschen bestätigen",
    confirmDeleteMessage: "Sind Sie sicher, dass Sie löschen möchten",
    cancel: "Abbrechen",
    delete: "Löschen",
    deleteAllConfirm: "Löschen bestätigen",
    deleteAllMessage: "Sind Sie sicher, dass Sie alle Aufgaben löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.",
    deleteAllButton: "Alle löschen",
    madeBy: "Erstellt von",
    FlagIcon: DE,
    todoAdded: "Aufgabe erfolgreich hinzugefügt!",
    todoDeleted: '"{todo}" wurde gelöscht',
    allTodosDeleted: "Alle Aufgaben wurden gelöscht",
    theme: "Thema",
    lightMode: "Hellmodus",
    darkMode: "Dunkelmodus",
    language: "Sprache",
  },
};

type Language = {
  code: string;
  name: string;
  FlagIcon: FlagComponent;
};

export const languages: Language[] = [
  { code: 'en', name: 'English', FlagIcon: GB },
  { code: 'it', name: 'Italiano', FlagIcon: IT },
  { code: 'fr', name: 'Français', FlagIcon: FR },
  { code: 'es', name: 'Español', FlagIcon: ES },
  { code: 'de', name: 'Deutsch', FlagIcon: DE },
]; 