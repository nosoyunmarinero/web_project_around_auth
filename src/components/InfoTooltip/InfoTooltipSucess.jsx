import infoSucess from "../../../images/infoToolSucess.png"

export default function InfoTooltipSucess() {
return(
  <div className="info-content">
  <img src={infoSucess} alt="Imagen de confirmacion" className="info-image" />
  <p className="info-text">¡Correcto! Ya estás registrado.</p>
  </div>
)
}