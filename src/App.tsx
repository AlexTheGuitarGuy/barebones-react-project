import React, { useEffect } from 'react'
import './App.css'
import { SubgroupTable } from './components/Tables/SubgroupTable'
/*import {BasicTable} from "./components/Tables/BasicTable";
import { ImageTable } from './components/Tables/ImageTable';
import { CustomActionTable } from './components/Tables/CustomActionTable';
import { GroupTable } from './components/Tables/GroupTable';
import { ExportTable } from './components/Tables/ExportTable';*/
import { useAppDispatch } from './hooks/reduxHooks'
import { fetchAttributes } from './redux/attributes-reducer/attributes-reducer'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAttributes())
  }, [dispatch])

  return (
    <div>
      <SubgroupTable />
    </div>
  )
}

export default App
