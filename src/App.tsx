import styles from './App.module.css'
import { Header } from './components/Header'
import { ListTasks } from './components/ListTasks'

import './global.css'

function App() {
  return (
    <div>
      <Header />

      <main className={styles.wrapper}>
          <ListTasks />
      </main>

    </div>
  )
}

export default App
