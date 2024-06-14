import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Card = () => {
  const [color, setColor] = useState('black')
  const [aviso, setAviso] = useState(null)

  const handleClick = () => {
    setColor('red')
    setAviso('Ver el pedido o seguir viendo para pedir')
  }

  return (
    <div>
      <button style={{ backgroundColor: color }} onClick={handleClick}>
        Carrito
      </button>
      {aviso && <p>{aviso}</p>}
      <Link to="/pedidos">Ir a pedidos</Link>
    </div>
  )
}

export default Card