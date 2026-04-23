const CommentsSection = () => {
    return ( 
        <div>
            <div>
                <h1>Comentarios</h1>
                <div>
                    <p>Comentario 1</p>
                    <p>Comentario 2</p>
                    <p>Comentario 3</p>
                </div>
            </div>
            <div>
                <h2>Formulario de Comentarios</h2>
                <input type="Tu nombre" />
                <input type="Correo Electronico" />
                <p>Como puntuarias tu experiencia en general</p>
                calificacion de 1 al 5 con estrellas.
                <textarea placeholder="Escribe tu comentario aqui"></textarea>
                <button>Enviar Comentario</button>
                alerta! se compartira tu nombre de perfil, no commpartir informacion que comprometa.
            </div>
            
        </div>
     );
}
 
export default CommentsSection;