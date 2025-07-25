import infoSucess from "../../../images/infoToolFail.png"

export default function InfoTooltipFail() {
return(
  <div className="info-content">
  <img src={infoSucess} alt="Imagen de confirmacion" className="info-image" />
  <p className="info-text">Uy, algo salió mal. Por favor, inténtalo de nuevo.</p>
  </div>
)
}