import styled from "@emotion/styled"

const DivResultado = styled.div `
margin-top: 2rem;
    color: #FFF;
    font-family: 'Lato',sans-serif;
    display:flex;
    align-items: center;
    gap: 3rem;

`

const Imagen = styled.img `
    display: block;
    width: 120px;
`
const Texto = styled.p `
    font-size: 18px;
    span {
        font-weight: 700;
    }
`
const Precio = styled.p `
    font-size: 24px;
    span {
        font-weight: 700;
    }
`

const Resultado = ({cotizacion}) => {
    const {PRICE, HIGHDAY, LOWDAY , CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = cotizacion

  return (
    <DivResultado >
        <Imagen
            src={`https://cryptocompare.com/${IMAGEURL}`}
            alt="imagen de cripto" 
        />
        <div>
            <Precio>El precio es de: <span>{PRICE}</span></Precio>
            <Texto>El precio más alto del día: <span>{HIGHDAY}</span></Texto>
            <Texto>El precio más bajo del día: <span>{LOWDAY}</span></Texto>
            <Texto>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
            <Texto>Última actualicación: <span>{LASTUPDATE}</span></Texto>
        </div>
       
    </DivResultado>
  )
}

export default Resultado