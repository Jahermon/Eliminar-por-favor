import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import imagenCripto from './img/imagen-criptos.png'
import Formulario from './Components/Formulario'
import Spinner from './Components/Spinner'
import Resultado from './Components/Resultado'

const Contenedor = styled.div `
  max-width: 56.25rem;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 62rem) {
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Imagen = styled.img `
  max-width: 25rem;
  width: 80%;
  margin:6.25rem auto 0 auto;
  display: block;
`

const Heading = styled.h1 `
  font-family: 'lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 5rem;
  margin-bottom: 3.125rem;
  font-size: 2.125rem;

  &::after {
    content:'';
    width: 6.25rem;
    height: 0.375rem;
    background-color: #66A2FE;
    display: block;
    margin: 0.625rem auto 0 auto;
  }

`
function App() {

  const [ monedas, setMonedas] = useState({})
  const [ cotizacion, setCotizacion] = useState({})
  const [ cargando, setCargando] = useState(false)

  useEffect(()=>{
    //preguntamos si monedas tiene contenido
    if(Object.keys(monedas).length > 0){
      setCargando(true)
      setCotizacion({})

      const cotizarCripto = async () => {

        const {moneda, criptomoneda} = monedas

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        //De manera dinamica con los [] va ir buscando el valor que co
        setCotizacion(resultado.DISPLAY[criptomoneda][moneda])

        setCargando(false)
      }

      cotizarCripto()
    }
      
  },[monedas])
  
  return (

    <Contenedor>

      <Imagen
        src={imagenCripto}
        alt="Imagenes Criptomonedas"
      />

      <div>
        
        <Heading>Consulta las Criptos mas relevantes del momento</Heading>

        <Formulario
          setMonedas={setMonedas}
        />
          
        {cargando && <Spinner />}

        {cotizacion.PRICE && <Resultado cotizacion={cotizacion}/> }

      </div>
      
    </Contenedor>
  )
}

export default App
