import successImg from "../../../images/infoToolSucess.png";
import failImg from "../../../images/infoToolFail.png";

export default function InfoTooltip({ isSuccess }) {
  return (
    <div className="info-content">
      <img
        src={isSuccess ? successImg : failImg}
        alt="Resultado"
        className="info-image"
      />
      <p className="info-text">
        {isSuccess
          ? "¡Correcto! Ya estás registrado."
          : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
      </p>
    </div>
  );
}
