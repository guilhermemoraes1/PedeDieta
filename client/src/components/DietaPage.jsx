import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DietaPage = () => {
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:5000/is-authenticated', {
      credentials: 'include' // necessário para enviar os cookies da sessão Flask
    })
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          navigate('/guestPage')  // redireciona se o usuário não estiver logado
        } else {
          setIsAuth(true)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error("Erro ao verificar autenticação:", err)
        navigate('/guestPage')
      })
  }, [navigate])

  if (loading) return <p>Verificando autenticação...</p>

  return (
    <div className="container">
      <h2>Área de pedidos de Dieta</h2>
      <p>Bem-vindo(a), você está autenticado!</p>
    </div>
  )
}

export default DietaPage