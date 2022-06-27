import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import useSelectMonedas from "../hooks/useSelectMonedas"
import {monedas} from '../data/monedas'


const InputSubmit = styled.input `
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 0.625rem;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.250rem;
    border-radius: 0.3125rem;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }

`
const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])
    
    //hook del select.
    //Extraemos moneda, que es el valor del state del hook, se extrae en el mismo orden al exportar, por eso podemos renombrar como queramos
    const [ moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
    //hook de la conulta de la api
    const [ criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos)
    

    useEffect(()=>{

        const consultarAPI = async () => {
            const url ="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"

            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map(cripto => {

                const objeto ={
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })
            
            setCriptos(arrayCriptos)
        }
        consultarAPI()

    }, [])


    const handleSubmit = e => {
        e.preventDefault()

        if([moneda, criptomoneda].includes('')){
            return ( Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Selecione Moneda y criptomoneda'
                
              }) )
        }

        setMonedas({
            moneda,
            criptomoneda
        })
    }

  return (
    <form onSubmit={handleSubmit} action="">

        <SelectMonedas/>
        <SelectCriptomoneda/>
        

        <InputSubmit type="submit" value="Cotizar" />
       
    </form>
  )
}

export default Formulario