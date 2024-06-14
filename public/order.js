import React, { useState } from 'react'

const Pedidos = () => {
  const [aviso, setAviso] = useState(null)

  const handleClick = () => {
    setAviso('Pedido realizado')
  }

  return (
    <div>
      <h1>Pedidos</h1>
      <button onClick={handleClick}>Hacer el pedido</button>
      {aviso && <p>{aviso}</p>}
    </div>
  )
}

export default Pedidos