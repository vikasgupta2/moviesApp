import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Account from './components/Account'
import Home from './components/Home'
import Search from './components/Search'
import PageNotFound from './components/PageNotFound'
import MovieItemDetails from './components/MovieItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Popular from './components/Popular'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
    <Route path="/not-found" component={PageNotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
