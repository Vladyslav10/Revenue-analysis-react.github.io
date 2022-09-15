import { LIST_ROUTE, ITEM_ROUTE } from "./utils/consts";
import List from './components/pages/list/List.jsx';
import ItemPage from './components/pages/item/ItemPage.jsx';

export const routes = [
    {
        path: LIST_ROUTE,
        Component: List
    },
    {
        path: ITEM_ROUTE + '/:id',
        Component: ItemPage
    },
]