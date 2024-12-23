import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          add_company: "Add Company",
          no_companies: "No companies registered.",
          name: "Name",
          company_type: "Company Type",
          constitution_date: "Constitution Date",
          favorite: "Favorite",
          actions: "Actions",
          edit_company: "Edit Company",
          select_type: "Select a type",
          comments: "Comments",
          update: "Update",
          save: "Save",
          edit: "Edit",
          delete: "Delete",
          yes: "Yes",
          no: "No",
          error_fetching: "Error fetching companies. Please try again.",
          error_saving: "Error saving the company. Please try again.",
          error_deleting: "Error deleting the company. Please try again.",
          all_fields_required: "All fields are required.",
          end_user:"End User",
          distributor:"Distributor",
          wholesaler:"Wholesaler",
          are_you_sure_delete:"Are you sure you want to delete?",
          confirm_delete: "Confirm delete",
          cancel: "Cancel",
          confirm: "Confirm"
        },
      },
      es: {
        translation: {
          welcome: "Bienvenido",
          add_company: "Agregar Empresa",
          no_companies: "No hay empresas registradas.",
          name: "Nombre",
          company_type: "Tipo de Empresa",
          constitution_date: "Fecha de Constitución",
          favorite: "Favorita",
          actions: "Acciones",
          edit_company: "Editar Empresa",
          select_type: "Selecciona un tipo",
          comments: "Comentarios",
          update: "Actualizar",
          save: "Guardar",
          edit: "Editar",
          delete: "Eliminar",
          yes: "Sí",
          no: "No",
          error_fetching: "Error al obtener empresas. Intente nuevamente.",
          error_saving: "Error al guardar la empresa. Intente nuevamente.",
          error_deleting: "Error al eliminar la empresa. Intente nuevamente.",
          all_fields_required: "Todos los campos son obligatorios.",
          end_user: "Usuario Final",
          distributor: "Distribuidor",
          wholesaler:"Mayorista",
          are_you_sure_delete: "¿Seguro que quieres eliminar?",
          confirm_delete: "Confirmar",
          cancel: "Cancelar",
          confirm: "Confirmar"
        },
      },
    },
    lng: "es",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n