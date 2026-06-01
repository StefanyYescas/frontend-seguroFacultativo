import sepLogo2 from "../../assets/Sep2.png"
import logoITV from "../../assets/logo-itv.png"

import "./HeaderPortal.css"

function HeaderPortal() {
    return (
        <header className="headerportal">

            <div className="headerportal__left">
                <img src={sepLogo2} alt="SEP" className="headerportal__logo-sep" />
            </div>

            <div className="headerportal__center">
                <p className="headerportal__titulo-sistema">SISTEMA DE TRÁMITE DE SEGURO FACULTATIVO</p>
                <p className="headerportal__titulo-instituto">INSTITUTO TECNOLÓGICO DE VERACRUZ</p>
                <p className="headerportal__titulo-portal">PORTAL DE ALUMNOS</p>
            </div>

            <div className="headerportal__right">
                <img src={logoITV} alt="ITV" className="headerportal__logo-itv" />
            </div>

        </header>
    )
}

export default HeaderPortal
