import {loadTable} from './components/table/orders'
import {fillFormBySearchParams} from './components/form/form'
import {loadChainIdSelect, loadChainLogo} from './configs/chains/chainConfigs'
import formEvents from './components/form/formEvents'
import {tableEvents} from './components/table/table'

// Event Listeners
const chainIdSelect = document.querySelector('#chainId')
formEvents(chainIdSelect)
tableEvents()

// Fillers
loadChainIdSelect(chainIdSelect)
fillFormBySearchParams()
loadTable()
if (location.search) {
   loadChainLogo(chainIdSelect.value)
}
