import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export function mostrarMensaje(mensaje, icono){
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: mensaje,
        icon: icono
    })
}

export function confirmar(){
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí puedes realizar la acción que deseas ejecutar cuando el usuario confirma
          Swal.fire(
            'Eliminado',
            'El registro ha sido eliminado',
            'success'
          );
        }
      });
}

export const validarURL = (url) => {
  // Expresión regular para verificar el formato del enlace de YouTube
  const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
  return youtubeUrlRegex.test(url);
};