import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'


import AuthLayout from './layout/AuthLayout'
import Login from './views/auth/Login'
import Registrar from './views/auth/Registrar'
import ConfirmarCuenta from './views/auth/ConfirmarCuenta'
import OlvidePassword from './views/auth/OlvidePassword'
import NuevoPassword from './views/auth/NuevoPassword'
import RutaProtegida from './layout/RutaProtegida'
import AdministrarPacientes from './views/admin/AdministrarPacientes'
import EditarPerfil from './views/admin/EditarPerfil'
import CambiarPassword from './views/admin/CambiarPassword'

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>

            {/* rutas para autenticacion */}
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='confirmarcuenta/:token' element={<ConfirmarCuenta />} />

              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevoPassword />} />
            </Route>

            {/* rutas de administración */}

            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path='perfil' element={<EditarPerfil />} />
              <Route path='cambiar-password' element={<CambiarPassword />} />
            </Route>



          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter >
  )
}

export default App
