/**
 * Fichero con todos los mensajes a ser mostrados por la interfaz
 */

// Titulo de aplicacion
export const APP_NAME = "Gestor de Caballos";

// Navbar
export const NAVBAR_HOME = "Hogar";
export const NAVBAR_CABALLOS = "Caballos";
export const NAVBAR_LOGOUT = "Salir del Sistema";

// Pagina de login
export const MENU_INGRESAR_TITLE = "INGRESAR";
export const MENU_INGRESAR_INFO =
    "Rellena tus credenciales para ingresar al sistema";
export const MENU_INGRESAR_USERNAME = "Nombre de Usuario";
export const MENU_INGRESAR_PASSWORD = "Contraseña";
export const MENU_INGRESAR_LOGIN = "Ingresar";
export const MENU_INGRESAR_INVALID_CREDENTIALS =
    "El nombre de usuario o contraseña son invalidos, por favor verifiquelos e intente nuevamente";

// Menu de caballos
export const MENU_CABALLOS_TITLE = "Lista de Caballos";
export const MENU_CABALLOS_REGISTER_NEW = "Registrar Caballo";
export const MENU_CABALLOS_DEL_LOADING = "Eliminando Caballo...";

// Caballo por id
export const DETAIL_CABALLO_ID = "Número de Identificación";
export const DETAIL_CABALLO_FUR_COLOR = "Color de Pelo";
export const DETAIL_CABALLO_NAME = "Nombre";
export const DETAIL_CABALLO_SEX = "Sexo";
export const DETAIL_CABALLO_SEX_M = "Macho";
export const DETAIL_CABALLO_SEX_F = "Hembra";
export const DETAIL_CABALLO_HEIGHT = "Altura en Metros";
export const DETAIL_CABALLO_BIRTHDATE = "Fecha de Nacimiento";
export const DETAIL_CABALLO_OWNER = "Dueño";
export const DETAIL_CABALLO_SPACE = "Espacio Asignado";
export const DETAIL_CABALLO_EXTRA_CARES = "Cuidados Extra";

// Listado de caballos
export const LISTA_CABALLOS_NAME = "Nombre";
export const LISTA_CABALLOS_SEX = "Sexo";
export const LISTA_CABALLOS_HEIGHT = "Altura";
export const LISTA_CABALLOS_ID = "Identificacion";
export const LISTA_CABALLOS_FUR_COLOR = "Color de Pelo";
export const LISTA_CABALLOS_BIRTHDATE = "Fecha de Nacimiento";
export const LISTA_CABALLOS_DELETE = "Eliminar Caballo";
export const LISTA_CABALLOS_EDIT = "Editar Caballo";
export const LISTA_CABALLOS_NO_MORE =
    "Has llegado al final de la lista de caballos";
export const LISTA_CABALLOS_LOAD_MORE = "Cargar Mas";

// Formulario de cuidados extra
export const FORM_EXTRA_CARES_TITLE = "Cuidados Extra";
export const FORM_EXTRA_CARES_CLOSE = "Cerrar";
export const FORM_EXTRA_CARES_DESCRIPTION_HINT =
    "Un caballo puede tener hasta 5 cuidados extra y el cuidado puede tener hasta 255 caracteres, recuerda presionar el símbolo '+' para guardarlo";
export const FORM_EXTRA_CARES_ADD_CARE = "Agregar Cuidado Extra";
export const FORM_EXTRA_CARES_REMOVE_CARE = "Remover Cuidado Extra";

// Formulario de nuevos caballos
export const FORM_NEW_CABALLO_TITLE = "Nuevo Caballo";
export const FORM_NEW_CABALLO_ID = "Número de Identificación";
export const FORM_NEW_CABALLO_ID_HELPER =
    "La identificacion debe tener de 1 a 80 caracteres";
export const FORM_NEW_CABALLO_FUR_COLOR = "Color de Pelo";
export const FORM_NEW_CABALLO_FUR_COLOR_HELPER =
    "El color de pelo puede tener de 1 a 80 caracteres";
export const FORM_NEW_CABALLO_NAME = "Nombre";
export const FORM_NEW_CABALLO_NAME_HELPER =
    "El nombre debe tener de 1 a 80 caracteres";
export const FORM_NEW_CABALLO_SEX = "Sexo";
export const FORM_NEW_CABALLO_SEX_M = "Macho";
export const FORM_NEW_CABALLO_SEX_F = "Hembra";
export const FORM_NEW_CABALLO_HEIGHT = "Altura en Metros";
export const FORM_NEW_CABALLO_HEIGHT_HELPER =
    "La altura debe ser un numero de 0.1 a 3";
export const FORM_NEW_CABALLO_BIRTHDATE = "Fecha de Nacimiento";
export const FORM_NEW_CABALLO_OWNER = "Dueño";
export const FORM_NEW_CABALLO_SPACE = "Espacio";
export const FORM_NEW_CABALLO_NO_MORE_SPACES =
    "Todos los espacios están ocupados, no pueden registrarse mas caballos";
export const FORM_NEW_CABALLO_EXTRA_CARE = "Cuidados Extra";
export const FORM_NEW_CABALLO_CARE = "Cuidado";
export const FORM_NEW_CABALLO_SHOW_CARE = "Agregar Cuidados";
export const FORM_NEW_CABALLO_REGISTER = "Registrar";
export const FORM_NEW_CABALLO_CANCEL = "Cancelar";

// Formulario de edicion de caballos
export const FORM_EDIT_CABALLO_TITLE = "Editar Caballo";
export const FORM_EDIT_CABALLO_ID = "Número de Identificación";
export const FORM_EDIT_CABALLO_ID_HELPER =
    "La identificacion debe tener de 1 a 80 caracteres";
export const FORM_EDIT_CABALLO_FUR_COLOR = "Color de Pelo";
export const FORM_EDIT_CABALLO_FUR_COLOR_HELPER =
    "El color de pelo puede tener de 1 a 80 caracteres";
export const FORM_EDIT_CABALLO_NAME = "Nombre";
export const FORM_EDIT_CABALLO_NAME_HELPER =
    "El nombre debe tener de 1 a 80 caracteres";
export const FORM_EDIT_CABALLO_SEX = "Sexo";
export const FORM_EDIT_CABALLO_SEX_M = "Macho";
export const FORM_EDIT_CABALLO_SEX_F = "Hembra";
export const FORM_EDIT_CABALLO_HEIGHT = "Altura en Metros";
export const FORM_EDIT_CABALLO_HEIGHT_HELPER =
    "La altura debe ser un numero de 0.1 a 3";
export const FORM_EDIT_CABALLO_BIRTHDATE = "Fecha de Nacimiento";
export const FORM_EDIT_CABALLO_OWNER = "Dueño";
export const FORM_EDIT_CABALLO_SPACE = "Espacio";
export const FORM_EDIT_CABALLO_NO_MORE_SPACES =
    "Todos los espacios están ocupados, no pueden registrarse mas caballos";
export const FORM_EDIT_CABALLO_EXTRA_CARE = "Cuidados Extra";
export const FORM_EDIT_CABALLO_CARE = "Cuidado";
export const FORM_EDIT_CABALLO_REGISTER = "Guardar";
export const FORM_EDIT_CABALLO_CANCEL = "Cancelar";
export const FORM_EDIT_CABALLO_SHOW_CARE = "Editar Cuidados";
export const FORM_EDIT_CABALLO_CARE_LOADING = "Modificando cuidados...";
