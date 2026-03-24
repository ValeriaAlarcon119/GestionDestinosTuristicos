import { createContext, useContext, useState, type PropsWithChildren } from 'react'

type Language = 'es' | 'en'

const translations = {
  en: {
    sidebar: {
      destinations: 'Destinations',
      otherModules: 'Other modules',
      bookings: 'Bookings (coming soon)',
      customers: 'Customers (coming soon)',
      reports: 'Reports (coming soon)',
    },
    topbar: {
      title: 'Destinations module',
      user: 'Administrator',
    },
    destinations: {
      title: 'Destinations',
      subtitle: 'Manage HotelBediaX destinations with search, filters, and pagination.',
      newButton: '+ New destination',
      searchPlaceholder: 'Name, country or city...',
      search: 'Search',
      table: {
        name: 'Name',
        country: 'Country',
        city: 'City',
        price: 'Price / night',
        rating: 'Rating',
        status: 'Status',
        actions: 'Actions',
        active: 'Active',
        inactive: 'Inactive',
        empty: 'No destinations found for current filters.',
        edit: 'Edit',
        delete: 'Delete',
      },
      pagination: {
        page: 'Page',
        of: 'of',
        total: 'destinations',
        previous: 'Previous',
        next: 'Next',
      },
    },
    form: {
      createTitle: 'New destination',
      editTitle: 'Edit destination',
      name: 'Destination Name',
      country: 'Country',
      city: 'City',
      price: 'Price per night',
      rating: 'Rating (0–5)',
      status: 'Status',
      active: 'Active',
      description: 'Description',
      cancel: 'Cancel',
      save: 'Save changes',
      create: 'Create destination',
      requiredError: 'Name, Country and City are required.',
      saveError: 'Could not save the destination.',
      deleteConfirm: 'Are you sure you want to delete "{name}"?',
      deleteError: 'Could not delete the destination.',
      loading: 'Loading...',
    },
  },
  es: {
    sidebar: {
      destinations: 'Destinos',
      otherModules: 'Otros módulos',
      bookings: 'Reservas (próximamente)',
      customers: 'Clientes (próximamente)',
      reports: 'Reportes (próximamente)',
    },
    topbar: {
      title: 'Módulo de Destinos',
      user: 'Administrador',
    },
    destinations: {
      title: 'Destinos',
      subtitle: 'Gestione los destinos de HotelBediaX con búsqueda, filtros y paginación.',
      newButton: '+ Nuevo destino',
      searchPlaceholder: 'Nombre, país o ciudad...',
      search: 'Buscar',
      table: {
        name: 'Nombre',
        country: 'País',
        city: 'Ciudad',
        price: 'Precio / noche',
        rating: 'Valoración',
        status: 'Estado',
        actions: 'Acciones',
        active: 'Activo',
        inactive: 'Inactivo',
        empty: 'No se encontraron destinos con los filtros actuales.',
        edit: 'Editar',
        delete: 'Eliminar',
      },
      pagination: {
        page: 'Página',
        of: 'de',
        total: 'destinos',
        previous: 'Anterior',
        next: 'Siguiente',
      },
    },
    form: {
      createTitle: 'Nuevo destino',
      editTitle: 'Editar destino',
      name: 'Nombre de Destino',
      country: 'País',
      city: 'Ciudad',
      price: 'Precio por noche',
      rating: 'Valoración (0–5)',
      status: 'Estado',
      active: 'Activo',
      description: 'Descripción',
      cancel: 'Cancelar',
      save: 'Guardar cambios',
      create: 'Crear destino',
      requiredError: 'Nombre, País y Ciudad son obligatorios.',
      saveError: 'No se pudo guardar el destino.',
      deleteConfirm: '¿Seguro que quieres eliminar "{name}"?',
      deleteError: 'No se pudo eliminar el destino.',
      loading: 'Cargando...',
    },
  },
}

type TranslationKeys = typeof translations.en

interface LanguageContextProps {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationKeys
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<Language>('es') // Default to ES

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
