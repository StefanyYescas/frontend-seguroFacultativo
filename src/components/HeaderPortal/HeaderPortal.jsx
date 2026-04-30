import sepLogo2 from "../../assets/Sep2.png"

import "./HeaderPortal.css"

function HeaderPortal() {
    return (
        <header className="headerportal">

            {/* Logos a la izquierda */}
            <div className="headerportal__logos">
                <img src={sepLogo2} alt="SEP" className="headerportal__logo-sep" />

            </div>

            {/* Títulos centrados */}
            <div className="headerportal__titulos">
                <p className="headerportal__titulo-sistema">SISTEMA INTEGRAL DE INFORMACIÓN</p>
                <p className="headerportal__titulo-instituto">INSTITUTO TECNOLÓGICO DE VERACRUZ</p>
                <p className="headerportal__titulo-portal">PORTAL DE ALUMNOS</p>
            </div>

        </header>
    )
}

export default HeaderPortal